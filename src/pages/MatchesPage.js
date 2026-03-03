import { useEffect, useState } from 'react';
import { getMatches, isOnline } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import { styles, theme } from './styles';

export default function MatchesPage({ setCurrentPage, setActiveChatPartner }) {
  const { profile } = useAuth();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile) loadMatches();
  }, [profile]);

  async function loadMatches() {
    setLoading(true);
    try {
      const data = await getMatches(profile.id);
      setMatches(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return (
    <div style={styles.loadingWrap}>
      <span style={{ color: theme.neon, fontSize: 24, animation: 'breathe 2s ease-in-out infinite' }}>💞</span>
      Loading matches...
    </div>
  );

  return (
    <div style={styles.pageWrap}>
      <h2 style={styles.pageTitle}>My Matches <span style={{ WebkitTextFillColor: 'initial' }}>💞</span></h2>
      <p style={styles.pageSubtitle}>These people liked you back. Start a conversation!</p>
      {matches.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>🌱</div>
          <p style={{ fontWeight: 600, color: theme.text, fontSize: 16, margin: 0 }}>No matches yet</p>
          <p style={{ color: theme.textMuted, fontSize: 13, maxWidth: 220, margin: 0 }}>Keep swiping — your match is out there!</p>
        </div>
      ) : (
        <div style={styles.matchGrid}>
          {matches.map((m, idx) => (
            <div key={m.id} className="stagger-enter tilt-card" style={{
              ...styles.matchCard,
              animationDelay: `${idx * 0.06}s`,
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)' }} />
              <div style={isOnline(m.last_seen) ? styles.matchAvatarOnline : styles.matchAvatar}>{m.alias?.[0]}</div>
              <div style={styles.matchAlias}>{m.alias}</div>
              <div style={styles.matchMeta}>
                Age {m.age} · {isOnline(m.last_seen)
                  ? <span style={{ color: theme.success }}>🟢 Online</span>
                  : <span style={{ color: theme.textDim }}>⚫ Offline</span>}
              </div>
              {m.bio && <p style={{ fontSize: 12, color: theme.textMuted, margin: '6px 0', lineHeight: 1.6 }}>{m.bio}</p>}
              <div style={styles.interestRow}>
                {(m.interests || []).map(i => <span key={i} style={styles.interestTagSm}>{i}</span>)}
              </div>
              <button className="shimmer-btn" style={styles.primaryBtn} onClick={() => {
                setActiveChatPartner(m);
                setCurrentPage('chat');
              }}>
                💬 Message
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
