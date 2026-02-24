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
      setError('failed to save. try again.');
    } finally {
      setSaving(false);
    }
  }

  const disabledInput = {
    ...styles.input,
    background: 'rgba(0,255,136,0.03)',
    color: theme.textMuted,
    cursor: 'default',
  };

  return (
    <div style={styles.pageWrap}>
      <h2 style={styles.pageTitle}><span style={{ color: theme.neon }}>$</span> my_profile</h2>
      <p style={styles.pageSubtitle}>// edit your bio and interests</p>

      <div style={{ ...styles.profileEditCard, maxWidth: 500 }}>
        {/* Avatar + alias */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
          <div style={styles.profileEditAvatar}>{profile?.alias?.[0]}</div>
          <div>
            <div style={styles.profileEditAlias}>{profile?.alias}</div>
            <div style={styles.profileEditNote}>alias is randomly generated for privacy</div>
          </div>
        </div>

        <div style={styles.profileSection}>
          <label style={styles.label}>email (verified ✓)</label>
          <input style={disabledInput} value={profile?.email || ''} disabled />
        </div>

        <div style={styles.profileSection}>
          <label style={styles.label}>gender</label>
          <input style={disabledInput} value={profile?.gender || ''} disabled />
        </div>

        <div style={styles.profileSection}>
          <label style={styles.label}>looking_for</label>
          <input style={disabledInput} value={profile?.looking_for || ''} disabled />
        </div>

        <div style={styles.profileSection}>
          <label style={styles.label}>bio (optional)</label>
          <textarea
            style={{ ...styles.input, height: 80, resize: 'vertical', fontFamily: "'Space Mono',monospace" }}
            value={bio}
            onChange={e => setBio(e.target.value)}
            maxLength={200}
            placeholder="// a bit about you (no personal info!)..."
          />
          <small style={{ color: theme.textMuted, fontSize: 10, fontFamily: "'Space Mono',monospace" }}>{bio.length}/200</small>
        </div>

        <div style={styles.profileSection}>
          <label style={styles.label}>interests (max 6)</label>
          <div style={{ ...styles.interestRow, justifyContent: 'flex-start', marginBottom: 10 }}>
            {interests.map((int, i) => (
              <span key={i} style={{ ...styles.interestTag, cursor: 'pointer' }} onClick={() => removeInterest(i)}>
                #{int} ✕
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              style={{ ...styles.input, margin: 0, flex: 1 }}
              placeholder="add_interest... (press Enter)"
              value={newInterest}
              onChange={e => setNewInterest(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addInterest())}
            />
            <button style={{ ...styles.primaryBtn, width: 'auto', margin: 0, padding: '12px 20px' }} onClick={addInterest} type="button">add</button>
          </div>
          <small style={{ color: theme.textMuted, fontSize: 10, fontFamily: "'Space Mono',monospace", marginTop: 6, display: 'block' }}>{interests.length}/6</small>
        </div>

        {error && <div style={styles.error}>{error}</div>}
        <button style={styles.primaryBtn} onClick={save} disabled={saving}>
          {saving ? 'saving...' : saved ? '✓ saved!' : 'save_profile()'}
        </button>
      </div>
    </div>
  );
}
