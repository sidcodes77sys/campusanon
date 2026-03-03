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
    background: 'rgba(255,255,255,0.03)',
    color: theme.textMuted,
    cursor: 'default',
  };

  const saveBtnStyle = saved
    ? { ...styles.primaryBtn, background: '#30d158' }
    : styles.primaryBtn;

  return (
    <div style={styles.pageWrap}>
      <h2 style={styles.pageTitle}>Profile</h2>
      <p style={styles.pageSubtitle}>Edit your bio and interests</p>

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
          <label style={styles.label}>Email (verified)</label>
          <input style={disabledInput} value={profile?.email || ''} disabled />
        </div>

        <div style={styles.profileSection}>
          <label style={styles.label}>Gender</label>
          <input style={disabledInput} value={profile?.gender || ''} disabled />
        </div>

        <div style={styles.profileSection}>
          <label style={styles.label}>Looking for</label>
          <input style={disabledInput} value={profile?.looking_for || ''} disabled />
        </div>

        <div style={styles.profileSection}>
          <label style={styles.label}>Bio (optional)</label>
          <textarea
            style={{ ...styles.input, height: 80, resize: 'vertical' }}
            value={bio}
            onChange={e => setBio(e.target.value)}
            maxLength={200}
            placeholder="A bit about you (no personal info)..."
          />
          <small style={{ color: theme.textMuted, fontSize: 11 }}>{bio.length}/200</small>
        </div>

        <div style={styles.profileSection}>
          <label style={styles.label}>Interests (max 6)</label>
          <div style={{ ...styles.interestRow, justifyContent: 'flex-start', marginBottom: 10 }}>
            {interests.map((int, i) => (
              <span key={i} className="tag-pop" style={{ ...styles.interestTag, cursor: 'pointer' }} onClick={() => removeInterest(i)}>
                #{int} ✕
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              style={{ ...styles.input, margin: 0, flex: 1 }}
              placeholder="Add interest (press Enter)"
              value={newInterest}
              onChange={e => setNewInterest(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addInterest())}
            />
        <button style={{ ...styles.primaryBtn, width: 'auto', margin: 0, padding: '12px 20px' }} onClick={addInterest} type="button">Add</button>
          </div>
          <small style={{ color: theme.textMuted, fontSize: 11, marginTop: 6, display: 'block' }}>{interests.length}/6</small>
        </div>

        {error && <div style={styles.error}>{error}</div>}
        <button className="shimmer-btn" style={saveBtnStyle} onClick={save} disabled={saving}>
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save'}
        </button>
      </div>
    </div>
  );
}
