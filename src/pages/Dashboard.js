import { useEffect, useState } from 'react';
import { getDiscoverProfiles, likeProfile, passProfile, isOnline } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import { styles, theme } from './styles';

const isMobile = window.screen.width < 768;

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
      if (result.matched) { setMatchNotif(true); setTimeout(() => setMatchNotif(false), 4000); }
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
      <span>Loading Profiles...</span>
    </div>
  );

  const card = cards[current];

  return (
    <div style={styles.pageWrap}>
      <h2 style={styles.pageTitle}><span style={{ color: theme.neon }}>✦</span> Discover</h2>
      <p style={styles.pageSubtitle}>anonymous profiles · no names · genuine connections</p>
      {matchNotif && <div style={styles.matchBanner}>⚡ It's a Match!</div>}

      {card ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8 }}>
          <div style={{
            ...styles.profileCard,
            ...(action === 'liked' ? styles.cardLiked : {}),
            ...(action === 'passed' ? styles.cardPassed : {}),
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(232,135,42,0.5), transparent)' }} />
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
          <div style={styles.cardCounter}>{current + 1} of {cards.length} profiles</div>
        </div>
      ) : (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          minHeight: 'calc(100vh - 320px)', textAlign: 'center', gap: 16,
        }}>
          <div style={{ fontSize: 52, color: theme.neon }}>✦</div>
          <h3 style={{ fontFamily: "'Space Mono',monospace", color: theme.text, fontSize: 18, letterSpacing: 3, textTransform: 'uppercase' }}>
            You've Seen Everyone
          </h3>
          <p style={{ color: theme.textMuted, fontSize: 14, maxWidth: 260, lineHeight: 1.7 }}>
            New profiles appear daily — check back soon
          </p>
          <button style={{ ...styles.primaryBtn, width: 'auto', padding: '13px 40px', marginTop: 8 }}
            onClick={() => { setCurrent(0); loadProfiles(); }}>
            Refresh Profiles
          </button>
        </div>
      )}
    </div>
  );
}
