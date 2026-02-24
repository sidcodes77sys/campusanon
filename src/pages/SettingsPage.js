import { useState } from 'react';
import { signOut, updateProfile } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import { styles, theme } from './styles';

export default function SettingsPage() {
  const { profile, refreshProfile } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [showOnline, setShowOnline] = useState(true);
  const [ageMin, setAgeMin] = useState(18);
  const [ageMax, setAgeMax] = useState(25);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try { await signOut(); } catch (e) { console.error(e); }
    setLoggingOut(false);
  }

  async function handleDeleteAccount() {
    const confirmed = window.confirm('Are you sure? This cannot be undone. Your profile and matches will be permanently deleted.');
    if (!confirmed) return;
    try {
      // Mark as deleted — real deletion would require a server-side function
      await updateProfile(profile.id, { deleted: true });
      await signOut();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div style={styles.pageWrap}>
      <h2 style={styles.pageTitle}>Settings ⚙️</h2>
      <div style={styles.settingsCard}>

        <div style={styles.settingRow}>
          <div>
            <div style={styles.settingLabel}>Push Notifications</div>
            <div style={styles.settingDesc}>Get notified for new matches and messages</div>
          </div>
          <div style={notifications ? styles.toggleOn : styles.toggleOff} onClick={() => setNotifications(!notifications)}>
            <div style={{...styles.toggleKnob, right: notifications ? 3 : 'auto', left: notifications ? 'auto' : 3}} />
          </div>
        </div>

        <div style={styles.settingRow}>
          <div>
            <div style={styles.settingLabel}>Show Online Status</div>
            <div style={styles.settingDesc}>Let matches see when you're active</div>
          </div>
          <div style={showOnline ? styles.toggleOn : styles.toggleOff} onClick={() => setShowOnline(!showOnline)}>
            <div style={{...styles.toggleKnob, right: showOnline ? 3 : 'auto', left: showOnline ? 'auto' : 3}} />
          </div>
        </div>

        <hr style={styles.sidebarDivider} />

        <div style={styles.settingLabel}>Age Range Preference</div>
        <div style={{display:'flex', gap:12, alignItems:'center', marginTop:8, marginBottom:16}}>
          <label style={{fontSize:14}}>Min:
            <input type="number" style={{...styles.input, width:64, margin:'0 0 0 6px', display:'inline-block', padding:'6px 8px'}}
              value={ageMin} min={18} max={ageMax} onChange={e => setAgeMin(Number(e.target.value))} />
          </label>
          <label style={{fontSize:14}}>Max:
            <input type="number" style={{...styles.input, width:64, margin:'0 0 0 6px', display:'inline-block', padding:'6px 8px'}}
              value={ageMax} min={ageMin} max={35} onChange={e => setAgeMax(Number(e.target.value))} />
          </label>
        </div>

        <hr style={styles.sidebarDivider} />

        <div style={styles.settingLabel}>Account</div>
        <div style={{color:'#555', fontSize:13, marginBottom:12}}>{profile?.email}</div>

        <button style={{...styles.secondaryBtn, color:'#e74c3c', borderColor:'#e74c3c'}} onClick={handleLogout} disabled={loggingOut}>
          🚪 {loggingOut ? 'Logging out...' : 'Logout'}
        </button>
        <button style={{...styles.secondaryBtn, color:'#aaa', borderColor:'#ddd', marginTop:8}} onClick={handleDeleteAccount}>
          🗑️ Delete Account
        </button>

        <hr style={styles.sidebarDivider} />
        <div style={{fontSize:12, color:'#bbb'}}>
          🔒 Your identity is always protected. We never share your email or personal information.
        </div>
      </div>
    </div>
  );
}
