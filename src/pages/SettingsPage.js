import { useState, useEffect } from 'react';
import { signOut, updateProfile, deleteAccount } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import { styles, theme } from './styles';

export default function SettingsPage() {
  const { profile } = useAuth();
  const [showOnline, setShowOnline] = useState(true);
  const [ageMin, setAgeMin] = useState(18);
  const [ageMax, setAgeMax] = useState(25);
  const [loggingOut, setLoggingOut] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [notifPerm, setNotifPerm] = useState('default');

  useEffect(() => {
    if ('Notification' in window) setNotifPerm(Notification.permission);
  }, []);

  // This MUST be called directly from a button onClick — no async wrapper above it
  function handleEnableNotifications() {
    if (!('Notification' in window)) {
      alert('Your browser does not support notifications.');
      return;
    }
    if (Notification.permission === 'granted') {
      alert('Notifications are already enabled! To disable, go to your browser site settings.');
      return;
    }
    if (Notification.permission === 'denied') {
      alert('Notifications are blocked. Please go to your browser site settings → this site → allow notifications.');
      return;
    }
    // 'default' — safe to request. Must be called directly in onClick, not in a timeout/async wrapper
    Notification.requestPermission().then(perm => {
      setNotifPerm(perm);
      if (perm === 'granted') {
        // Fire a test notification so user sees it worked
        new Notification('CampusAnon Notifications Enabled ✓', {
          body: "You'll now get notified when you receive new messages.",
          icon: '/favicon.ico',
        });
      }
    });
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

  const notifLabel = {
    granted: '✓ Enabled',
    denied:  '✕ Blocked in browser',
    default: 'Click to enable',
  }[notifPerm] || 'Click to enable';

  const notifDesc = {
    granted: "You'll be notified when new messages arrive while the tab is in the background.",
    denied:  'Notifications are blocked. Go to browser site settings → this site → allow notifications.',
    default: "Get a browser pop-up when you receive new messages while the tab is hidden.",
  }[notifPerm] || '';

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

        {/* Notifications — plain button, triggers browser prompt directly */}
        <div style={{ ...styles.settingRow, alignItems: 'flex-start', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={styles.settingLabel}>Message Notifications</div>
            <div style={{ ...styles.settingDesc, marginTop: 4 }}>{notifDesc}</div>
          </div>
          <button
            onClick={handleEnableNotifications}
            style={{
              flexShrink: 0,
              padding: '8px 16px',
              borderRadius: 8,
              border: `1px solid ${notifPerm === 'granted' ? 'rgba(77,255,180,0.3)' : notifPerm === 'denied' ? 'rgba(255,107,138,0.3)' : 'rgba(77,159,255,0.3)'}`,
              background: notifPerm === 'granted' ? 'rgba(77,255,180,0.08)' : notifPerm === 'denied' ? 'rgba(255,107,138,0.08)' : 'rgba(77,159,255,0.08)',
              color: notifPerm === 'granted' ? theme.success : notifPerm === 'denied' ? theme.error : theme.neon,
              fontSize: 12, fontWeight: 700, cursor: 'pointer',
              fontFamily: "'Roboto Condensed',sans-serif", letterSpacing: 1,
            }}>
            {notifLabel}
          </button>
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
            ...btnBase, background: 'rgba(77,159,255,0.08)',
            border: '1px solid rgba(77,159,255,0.25)', color: theme.neon, marginBottom: 10,
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
            <span>✕</span>
            {deleting ? 'Deleting everything...' : confirmDelete ? '⚠ Tap again — permanent' : 'Delete Account'}
          </button>

          {confirmDelete && !deleting && (
            <div style={{ marginTop: 10, fontSize: 12, color: theme.error, textAlign: 'center' }}>
              Permanently deletes your profile, matches &amp; all messages.
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
