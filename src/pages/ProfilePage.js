import { useState } from 'react';
import { updateProfile } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import { styles, theme } from './styles';

export default function ProfilePage() {
  const { profile, refreshProfile } = useAuth();
  const [bio, setBio] = useState(profile?.bio || '');
  const [interests, setInterests] = useState(profile?.interests || []);
  const [newInterest, setNewInterest] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  function addInterest() {
    const trimmed = newInterest.trim();
    if (trimmed && interests.length < 6 && !interests.includes(trimmed)) {
      setInterests([...interests, trimmed]);
      setNewInterest('');
    }
  }

  function removeInterest(idx) {
    setInterests(interests.filter((_, i) => i !== idx));
  }

  async function save() {
    setSaving(true); setError(''); setSaved(false);
    try {
      await updateProfile(profile.id, { bio, interests });
      refreshProfile();
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      setError('Failed to save. Try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={styles.page}>
      <h2 style={styles.pageTitle}>My Profile 👤</h2>
      <div style={styles.profileEditCard}>
        <div style={styles.profileEditAvatar}>{profile?.alias?.[0]}</div>
        <div style={styles.profileEditAlias}>{profile?.alias}</div>
        <div style={styles.profileEditNote}>Your alias is randomly generated for privacy.</div>

        <div style={styles.profileSection}>
          <label style={styles.label}>Email (verified ✅)</label>
          <input style={{...styles.input, background:'#f5f5f5', color:'#888'}} value={profile?.email || ''} disabled />
        </div>

        <div style={styles.profileSection}>
          <label style={styles.label}>Gender</label>
          <input style={{...styles.input, background:'#f5f5f5', color:'#888'}} value={profile?.gender || ''} disabled />
        </div>

        <div style={styles.profileSection}>
          <label style={styles.label}>Looking for</label>
          <input style={{...styles.input, background:'#f5f5f5', color:'#888'}} value={profile?.looking_for || ''} disabled />
        </div>

        <div style={styles.profileSection}>
          <label style={styles.label}>Bio (optional)</label>
          <textarea
            style={{...styles.input, height:80, resize:'vertical'}}
            value={bio}
            onChange={e => setBio(e.target.value)}
            maxLength={200}
            placeholder="A bit about you (no personal info!)..."
          />
          <small style={{color:'#aaa'}}>{bio.length}/200</small>
        </div>

        <div style={styles.profileSection}>
          <label style={styles.label}>Interests (max 6)</label>
          <div style={styles.interestRow}>
            {interests.map((int, i) => (
              <span key={i} style={{...styles.interestTag, cursor:'pointer'}} onClick={() => removeInterest(i)}>
                {int} ✕
              </span>
            ))}
          </div>
          <div style={{display:'flex', gap:8, marginTop:8}}>
            <input
              style={{...styles.input, margin:0, flex:1}}
              placeholder="Add interest... (press Enter)"
              value={newInterest}
              onChange={e => setNewInterest(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addInterest())}
            />
            <button style={styles.secondaryBtn} onClick={addInterest} type="button">Add</button>
          </div>
          <small style={{color:'#aaa'}}>{interests.length}/6 interests</small>
        </div>

        {error && <div style={styles.error}>{error}</div>}
        <button style={styles.primaryBtn} onClick={save} disabled={saving}>
          {saving ? 'Saving...' : saved ? '✅ Saved!' : 'Save Profile'}
        </button>
      </div>
    </div>
  );
}
