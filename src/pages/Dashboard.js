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
      <span style={{ color: theme.neon, fontSize: 20 }}>✦</span>
      Loading Profiles...
    </div>
  );

  const card = cards[current];

  return (
    <div style={{
      width: '100%',
      minHeight: 'calc(100vh - 60px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: card ? 'flex-start' : 'center',
      padding: 'clamp(32px,5vw,52px) 16px',
      boxSizing: 'border-box',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <h2 style={{ ...styles.pageTitle, justifyContent: 'center', marginBottom: 6 }}>
          <span style={{ color: theme.neon }}>✦</span> Discover
        </h2>
        <p style={{ ...styles.pageSubtitle, marginBottom: 0 }}>
          anonymous profiles · no names · genuine connections
        </p>
      </div>

      {matchNotif && (
        <div style={{ ...styles.matchBanner, maxWidth: 400, marginBottom: 20 }}>⚡ It's a Match!</div>
      )}

      {card ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div style={{
            ...styles.profileCard,
            ...(action === 'liked' ? styles.cardLiked : {}),
            ...(action === 'passed' ? styles.cardPassed : {}),
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(77,159,255,0.6), transparent)' }} />
            <div style={styles.profileAvatar}>{card.alias?.[0] || '?'}</div>
            <div style={styles.profileAlias}>{card.alias}</div>
            <div style={styles.profileMeta}>
              Age {card.age}&nbsp;·&nbsp;
              {isOnline(card.last_seen)
                ? <span style={{ color: theme.success }}>● Online</span>
                : <span style={{ color: theme.textDim }}>● Offline</span>}
            </div>
            {card.bio && <p style={styles.profileBio}>"{card.bio}"</p>}
            <div style={styles.interestRow}>
              {(card.interests || []).map(i => <span key={i} style={styles.interestTag}>{i}</span>)}
            </div>
            <div style={styles.actionRow}>
              <button style={styles.passBtn} onClick={handlePass} disabled={!!action}>✕ Pass</button>
              <button style={styles.likeBtn} onClick={handleLike} disabled={!!action}>♥ Like</button>
            </div>
          </div>
          <div style={styles.cardCounter}>{current + 1} of {cards.length}</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16 }}>
          <div style={{ fontSize: 48, color: theme.neon, lineHeight: 1 }}>✦</div>
          <h3 style={{ fontFamily: "'Space Mono',monospace", color: theme.text, fontSize: 'clamp(13px,2vw,17px)', letterSpacing: 3, textTransform: 'uppercase', margin: 0 }}>
            You've Seen Everyone
          </h3>
          <p style={{ color: theme.textMuted, fontSize: 13, maxWidth: 240, lineHeight: 1.7, margin: 0 }}>
            New profiles appear daily — check back soon
          </p>
          <button style={{ ...styles.primaryBtn, width: 'auto', padding: '12px 36px', margin: 0 }}
            onClick={() => { setCurrent(0); loadProfiles(); }}>
            Refresh Profiles
          </button>
        </div>
      )}
    </div>
  );
}
