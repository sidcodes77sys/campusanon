import { useState, useEffect } from 'react';
import { signOut, updateProfile, deleteAccount } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import { styles, theme } from './styles';

export default function SettingsPage() {
  const { profile } = useAuth();
  const [notifications, setNotifications] = useState(false);
  const [showOnline, setShowOnline] = useState(true);
  const [ageMin, setAgeMin] = useState(18);
  const [ageMax, setAgeMax] = useState(25);
  const [loggingOut, setLoggingOut] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [notifStatus, setNotifStatus] = useState(''); // 'granted'|'denied'|'unsupported'

  // Check notification permission on load
  useEffect(() => {
    if (!('Notification' in window)) {
      setNotifStatus('unsupported');
    } else {
      setNotifStatus(Notification.permission);
      setNotifications(Notification.permission === 'granted');
    }
  }, []);

  async function handleNotifToggle() {
    if (!('Notification' in window)) return;
    if (Notification.permission === 'granted') {
      // Can't revoke programmatically — tell user
      setNotifications(false);
      setNotifStatus('user must revoke in browser settings');
      return;
    }
    const perm = await Notification.requestPermission();
    setNotifStatus(perm);
    setNotifications(perm === 'granted');
  }

  async function handleLogout() {
    setLoggingOut(true);
    try { await signOut(); } catch (e) { console.error(e); }
    setLoggingOut(false);
  }

  async function handleDeleteAccount() {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    setDeleting(true);
    try {
      await deleteAccount(profile.id);
    } catch (e) {
      console.error(e);
      alert('Failed to delete account. Please try again.');
      setDeleting(false);
      setConfirmDelete(false);
    }
  }

  const btnBase = {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    width: '100%', padding: '13px', borderRadius: 12, cursor: 'pointer',
    fontSize: 14, fontWeight: 700,
    fontFamily: "'Roboto Condensed',sans-serif",
    letterSpacing: 2, textTransform: 'uppercase',
    transition: 'all 0.2s', border: 'none',
  };

  return (
    <div style={styles.pageWrap}>
      <h2 style={styles.pageTitle}><span style={{ color: theme.neon }}>✦</span> Settings</h2>
      <p style={styles.pageSubtitle}>manage your preferences and account</p>
      <div style={{ ...styles.settingsCard, maxWidth: 500 }}>

        {/* Notifications */}
        <div style={styles.settingRow}>
          <div style={{ flex: 1 }}>
            <div style={styles.settingLabel}>Push Notifications</div>
            <div style={styles.settingDesc}>
              {notifStatus === 'unsupported' && 'Not supported in this browser'}
              {notifStatus === 'granted' && 'Enabled — you\'ll be notified of new messages'}
              {notifStatus === 'denied' && 'Blocked — enable in your browser site settings'}
              {notifStatus === 'default' && 'Click to enable browser notifications'}
              {notifStatus === '' && 'Get notified for new matches and messages'}
            </div>
          </div>
          <div
            style={notifications ? styles.toggleOn : styles.toggleOff}
            onClick={notifStatus !== 'unsupported' ? handleNotifToggle : undefined}>
            <div style={{ ...styles.toggleKnob, right: notifications ? 3 : 'auto', left: notifications ? 'auto' : 3 }} />
          </div>
        </div>

        {/* Show online */}
        <div style={styles.settingRow}>
          <div>
            <div style={styles.settingLabel}>Show Online Status</div>
            <div style={styles.settingDesc}>Let matches see when you're active</div>
          </div>
          <div style={showOnline ? styles.toggleOn : styles.toggleOff} onClick={() => setShowOnline(!showOnline)}>
            <div style={{ ...styles.toggleKnob, right: showOnline ? 3 : 'auto', left: showOnline ? 'auto' : 3 }} />
          </div>
        </div>

        {/* Age range */}
        <div style={{ padding: '18px 0', borderBottom: `1px solid rgba(77,159,255,0.07)` }}>
          <div style={styles.settingLabel}>Age Range Preference</div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: theme.textMuted, fontSize: 13 }}>Min</span>
              <input type="number" style={{ ...styles.input, width: 72, margin: 0, padding: '8px 12px' }}
                value={ageMin} min={18} max={ageMax} onChange={e => setAgeMin(Number(e.target.value))} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: theme.textMuted, fontSize: 13 }}>Max</span>
              <input type="number" style={{ ...styles.input, width: 72, margin: 0, padding: '8px 12px' }}
                value={ageMax} min={ageMin} max={35} onChange={e => setAgeMax(Number(e.target.value))} />
            </div>
          </div>
        </div>

        {/* Account */}
        <div style={{ padding: '20px 0 8px' }}>
          <div style={styles.settingLabel}>Account</div>
          <div style={{ color: theme.textMuted, fontSize: 13, marginBottom: 20, fontFamily: "'Space Mono',monospace" }}>
            {profile?.email}
          </div>

          <button onClick={handleLogout} disabled={loggingOut} style={{
            ...btnBase,
            background: 'rgba(77,159,255,0.08)',
            border: '1px solid rgba(77,159,255,0.25)',
            color: theme.neon, marginBottom: 10,
          }}>
            <span style={{ fontSize: 16 }}>→</span>
            {loggingOut ? 'Logging out...' : 'Logout'}
          </button>

          <button onClick={handleDeleteAccount} disabled={deleting} style={{
            ...btnBase,
            background: confirmDelete ? 'rgba(255,107,138,0.12)' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${confirmDelete ? 'rgba(255,107,138,0.4)' : 'rgba(255,255,255,0.08)'}`,
            color: confirmDelete ? theme.error : theme.textMuted,
          }}>
            <span style={{ fontSize: 16 }}>✕</span>
            {deleting ? 'Deleting...' : confirmDelete ? '⚠ Tap again — this is permanent' : 'Delete Account'}
          </button>

          {confirmDelete && !deleting && (
            <div style={{ marginTop: 10, fontSize: 12, color: theme.error, textAlign: 'center', fontFamily: "'Roboto Condensed',sans-serif" }}>
              This permanently deletes your profile, matches & messages.
            </div>
          )}
        </div>

        <div style={{
          marginTop: 16, padding: '14px 16px',
          background: 'rgba(77,159,255,0.05)', border: '1px solid rgba(77,159,255,0.1)',
          borderRadius: 10, fontSize: 12, color: theme.textMuted, lineHeight: 1.6,
        }}>
          🔒 Your identity is always protected. We never share your email or personal information.
        </div>
      </div>
    </div>
  );
}
