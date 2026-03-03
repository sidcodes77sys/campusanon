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
      <span style={{ color: theme.neon, fontSize: 24, animation: 'breathe 2s ease-in-out infinite' }}>✦</span>
      Loading Profiles...
    </div>
  );

  const card = cards[current];
  const progress = cards.length > 0 ? ((current) / cards.length) * 100 : 0;

  return (
    <div style={styles.pageWrap}>
      <h2 style={styles.pageTitle}><span style={{ color: theme.neon, WebkitTextFillColor: 'initial' }}>✦</span> Discover</h2>
      <p style={styles.pageSubtitle}>anonymous profiles · no names · genuine connections</p>

      {matchNotif && (
        <div style={styles.matchBanner}>
          <span style={{ marginRight: 8 }}>✦</span>
          It's a Match!
          <span style={{ marginLeft: 8 }}>✦</span>
        </div>
      )}

      {card ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div className="tilt-card" style={{
            ...styles.profileCard,
            ...(action === 'liked' ? styles.cardLiked : {}),
            ...(action === 'passed' ? styles.cardPassed : {}),
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.7), rgba(6,182,212,0.5), transparent)' }} />

            {/* Swipe indicator overlay */}
            {action === 'liked' && (
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 10, pointerEvents: 'none', borderRadius: 28,
                background: 'rgba(52,211,153,0.12)',
                border: '3px solid rgba(52,211,153,0.6)',
              }}>
                <span style={{ fontSize: 36, fontWeight: 900, color: '#34d399', letterSpacing: 4, transform: 'rotate(-15deg)', textShadow: '0 0 30px rgba(52,211,153,0.8)' }}>LIKED</span>
              </div>
            )}
            {action === 'passed' && (
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 10, pointerEvents: 'none', borderRadius: 28,
                background: 'rgba(251,113,133,0.1)',
                border: '3px solid rgba(251,113,133,0.5)',
              }}>
                <span style={{ fontSize: 36, fontWeight: 900, color: '#fb7185', letterSpacing: 4, transform: 'rotate(15deg)', textShadow: '0 0 30px rgba(251,113,133,0.8)' }}>PASSED</span>
              </div>
            )}

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
              <button className="like-glow" style={styles.likeBtn} onClick={handleLike} disabled={!!action}>♥ Like</button>
            </div>
          </div>

          {/* Deck progress bar */}
          <div style={styles.deckProgress}>
            <div style={{ ...styles.deckProgressBar, width: `${progress}%` }} />
          </div>
          <div style={styles.cardCounter}>{current + 1} of {cards.length}</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16, paddingTop: 60 }}>
          <div style={{ fontSize: 52, color: theme.neon, lineHeight: 1, animation: 'float 3s ease-in-out infinite' }}>✦</div>
          <h3 style={{ fontFamily: "'Space Mono',monospace", color: theme.text, fontSize: 17, letterSpacing: 3, textTransform: 'uppercase', margin: 0 }}>
            You've Seen Everyone
          </h3>
          <p style={{ color: theme.textMuted, fontSize: 13, maxWidth: 240, lineHeight: 1.7, margin: 0 }}>
            New profiles appear daily — check back soon
          </p>
          <button className="shimmer-btn" style={{ ...styles.primaryBtn, width: 'auto', padding: '12px 36px', margin: 0 }}
            onClick={() => { setCurrent(0); loadProfiles(); }}>
            Refresh Profiles
          </button>
        </div>
      )}
    </div>
  );
}
