import { useEffect, useState } from 'react';
import { getDiscoverProfiles, likeProfile, passProfile, isOnline } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import { styles, theme } from './styles';

function useIsMobile() {
  const [v, setV] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setV(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return v;
}

export default function Dashboard() {
  const { profile } = useAuth();
  const isMobile = useIsMobile();
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

  const pageStyle = {
    padding: isMobile ? '24px 16px' : '44px 52px',
    maxWidth: 980,
  };

  const cardStyle = {
    ...styles.profileCard,
    width: isMobile ? '100%' : 380,
    maxWidth: isMobile ? 400 : 380,
    padding: isMobile ? '32px 24px' : '44px 40px',
    animation: isMobile ? 'none' : 'float 5s ease-in-out infinite',
    ...(action === 'liked' ? styles.cardLiked : {}),
    ...(action === 'passed' ? styles.cardPassed : {}),
  };

  return (
    <div style={pageStyle}>
      <h2 style={{ ...styles.pageTitle, fontSize: isMobile ? 22 : 32 }}>
        <span style={{ color: theme.neon }}>✦</span> Discover
      </h2>
      <p style={{ ...styles.pageSubtitle, fontSize: isMobile ? 13 : 14 }}>
        anonymous profiles · no names · genuine connections
      </p>

      {matchNotif && <div style={styles.matchBanner}>⚡ It's a Match!</div>}

      {card ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: isMobile ? 4 : 12 }}>
          <div style={cardStyle}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: theme.gradient, boxShadow: '0 0 20px rgba(255,45,120,0.5)' }} />
            <div style={{ ...styles.profileAvatar, width: isMobile ? 76 : 96, height: isMobile ? 76 : 96, fontSize: isMobile ? 30 : 40 }}>
              {card.alias?.[0] || '?'}
            </div>
            <div style={{ ...styles.profileAlias, fontSize: isMobile ? 18 : 22 }}>{card.alias}</div>
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
              <button style={{ ...styles.passBtn, padding: isMobile ? '11px 28px' : '13px 36px' }} onClick={handlePass} disabled={!!action}>✕ Pass</button>
              <button style={{ ...styles.likeBtn, padding: isMobile ? '11px 28px' : '13px 36px' }} onClick={handleLike} disabled={!!action}>♥ Like</button>
            </div>
          </div>
          <div style={styles.cardCounter}>{current + 1} of {cards.length} profiles</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', gap: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 52, color: theme.neon }}>✦</div>
          <h3 style={{ fontFamily: "'Space Mono',monospace", color: theme.text, fontSize: isMobile ? 16 : 18, letterSpacing: 2, textTransform: 'uppercase' }}>
            You've Seen Everyone
          </h3>
          <p style={{ color: theme.textMuted, fontSize: 14, maxWidth: 260, lineHeight: 1.6 }}>
            New profiles appear daily — check back soon
          </p>
          <button style={{ ...styles.primaryBtn, width: 'auto', padding: '13px 40px', marginTop: 8, display: 'inline-block' }}
            onClick={() => { setCurrent(0); loadProfiles(); }}>
            Refresh Profiles
          </button>
        </div>
      )}
    </div>
  );
}
