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

  // ── Full-page centered layout for discover ──────────────────────────────
  return (
    <div style={{
      minHeight: 'calc(100vh - 120px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 'clamp(32px,5vw,52px) clamp(16px,5vw,32px)',
    }}>

      {/* Header — centered */}
      <div style={{ textAlign: 'center', marginBottom: 32, width: '100%' }}>
        <h2 style={{
          ...styles.pageTitle,
          justifyContent: 'center',
          fontSize: 'clamp(22px,4vw,30px)',
          marginBottom: 8,
        }}>
          <span style={{ color: theme.neon }}>✦</span> Discover
        </h2>
        <p style={{ ...styles.pageSubtitle, marginBottom: 0, textAlign: 'center' }}>
          anonymous profiles · no names · genuine connections
        </p>
      </div>

      {matchNotif && (
        <div style={{ ...styles.matchBanner, width: '100%', maxWidth: 400, marginBottom: 24 }}>
          ⚡ It's a Match!
        </div>
      )}

      {card ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: '100%' }}>
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
        /* Empty state — perfectly centered */
        <div style={{
          flex: 1,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', gap: 16,
          minHeight: 360,
          width: '100%',
        }}>
          <div style={{ fontSize: 52, color: theme.neon, lineHeight: 1 }}>✦</div>
          <h3 style={{
            fontFamily: "'Space Mono',monospace",
            color: theme.text, fontSize: 'clamp(14px,3vw,18px)',
            letterSpacing: 3, textTransform: 'uppercase', margin: 0,
          }}>
            You've Seen Everyone
          </h3>
          <p style={{
            color: theme.textMuted, fontSize: 14,
            maxWidth: 260, lineHeight: 1.7, margin: 0,
          }}>
            New profiles appear daily — check back soon
          </p>
          <button
            style={{ ...styles.primaryBtn, width: 'auto', padding: '13px 40px', margin: 0 }}
            onClick={() => { setCurrent(0); loadProfiles(); }}>
            Refresh Profiles
          </button>
        </div>
      )}
    </div>
  );
}
