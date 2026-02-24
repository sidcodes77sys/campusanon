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

  if (loading) return <div style={styles.loadingWrap}>Loading matches...</div>;

  return (
    <div style={styles.pageWrap}>
      <h2 style={styles.pageTitle}>My Matches 💞</h2>
      <p style={styles.pageSubtitle}>These people liked you back. Start a conversation!</p>
      {matches.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={{fontSize:48}}>🌱</div>
          <p>No matches yet. Keep swiping!</p>
        </div>
      ) : (
        <div style={styles.matchGrid}>
          {matches.map(m => (
            <div key={m.id} style={styles.matchCard}>
              <div style={styles.matchAvatar}>{m.alias?.[0]}</div>
              <div style={styles.matchAlias}>{m.alias}</div>
              <div style={styles.matchMeta}>
                Age {m.age} · {isOnline(m.last_seen) ? '🟢 Online' : '⚫ Offline'}
              </div>
              {m.bio && <p style={{fontSize:12, color:'#777', margin:'6px 0'}}>{m.bio}</p>}
              <div style={styles.interestRow}>
                {(m.interests || []).map(i => <span key={i} style={styles.interestTagSm}>{i}</span>)}
              </div>
              <button style={styles.primaryBtn} onClick={() => {
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
