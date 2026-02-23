import { useEffect, useState } from 'react';
import { getDiscoverProfiles, likeProfile, passProfile, isOnline } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import { styles, theme } from './styles';

export default function Dashboard() {
  const { profile } = useAuth();
  const [cards, setCards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [action, setAction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [matchNotif, setMatchNotif] = useState(false);

  useEffect(() => { if (profile) loadProfiles(); }, [profile]);

  async function loadProfiles() {
    setLoading(true);
    try { setCards(await getDiscoverProfiles(profile)); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  async function handleLike() {
    const card = cards[current]; if (!card) return;
    setAction('liked');
    try {
      const result = await likeProfile(profile.id, card.id);
      if (result?.matched) { setMatchNotif(true); setTimeout(() => setMatchNotif(false), 4000); }
    } catch (e) { console.error(e); }
    setTimeout(() => { setCurrent(c => c + 1); setAction(null); }, 500);
  }

  async function handlePass() {
    const card = cards[current]; if (!card) return;
    setAction('passed');
    try { await passProfile(profile.id, card.id); } catch (e) { console.error(e); }
    setTimeout(() => { setCurrent(c => c + 1); setAction(null); }, 500);
  }

  if (loading) return (
    <div style={styles.loadingWrap}>
      <span style={{ color: theme.neon }}>▋</span> loading profiles...
    </div>
  );

  const card = cards[current];

  return (
    <div style={styles.pageWrap}>
      {/* Header */}
      <h2 style={styles.pageTitle}>
        <span style={{ color: theme.neon }}>$</span> discover
      </h2>
      <p style={styles.pageSubtitle}>// anonymous profiles · no names · genuine connections</p>

      {matchNotif && <div style={styles.matchBanner}>⚡ IT'S A MATCH!</div>}

      {card ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{
            ...styles.profileCard,
            ...(action === 'liked' ? styles.cardLiked : {}),
            ...(action === 'passed' ? styles.cardPassed : {}),
          }}>
            {/* top green line */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.6), transparent)' }} />

            <div style={styles.profileAvatar}>{card.alias?.[0] || '?'}</div>
            <div style={styles.profileAlias}>{card.alias}</div>
            <div style={styles.profileMeta}>
              age_{card.age} &nbsp;·&nbsp;
              {isOnline(card.last_seen)
                ? <span style={{ color: theme.success }}>online</span>
                : <span style={{ color: theme.textDim }}>offline</span>}
            </div>
            {card.bio && <p style={styles.profileBio}>// {card.bio}</p>}
            <div style={styles.interestRow}>
              {(card.interests || []).map(i => <span key={i} style={styles.interestTag}>#{i}</span>)}
            </div>
            <div style={styles.actionRow}>
              <button style={styles.passBtn} onClick={handlePass} disabled={!!action}>✕ pass</button>
              <button style={styles.likeBtn} onClick={handleLike} disabled={!!action}>♥ like</button>
            </div>
          </div>
          <div style={styles.cardCounter}>{current + 1} / {cards.length}</div>
        </div>
      ) : (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', minHeight: 'calc(100vh - 320px)',
          textAlign: 'center', gap: 16,
        }}>
          <div style={{ fontSize: 36, color: theme.neon, fontFamily: "'Space Mono',monospace" }}>[ ]</div>
          <div style={{ color: theme.neon, fontFamily: "'Space Mono',monospace", fontSize: 14, letterSpacing: 3 }}>
            queue_empty
          </div>
          <p style={{ color: theme.textMuted, fontSize: 12, maxWidth: 260, lineHeight: 1.8, fontFamily: "'Space Mono',monospace" }}>
            // new profiles appear daily<br/>-- check back soon
          </p>
          <button style={{ ...styles.primaryBtn, width: 'auto', padding: '12px 36px', marginTop: 8 }}
            onClick={() => { setCurrent(0); loadProfiles(); }}>
            refresh()
          </button>
        </div>
      )}
    </div>
  );
}
