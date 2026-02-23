// CampusAnon — Option 4: Neon Green Terminal

export const theme = {
  bg: 'transparent',
  neon: '#00ff88',
  neonDim: 'rgba(0,255,136,0.08)',
  neonBorder: 'rgba(0,255,136,0.2)',
  text: '#e0ffe8',
  textMuted: 'rgba(200,255,220,0.4)',
  textDim: 'rgba(200,255,220,0.15)',
  success: '#00ff88',
  error: '#ff4d6a',
  gradient: 'linear-gradient(135deg, #00ff88 0%, #00cc66 100%)',
};

const mono = "'Space Mono', monospace";
const RC = "'Roboto Condensed', sans-serif";

export const styles = {
  appWrap: {
    display: 'flex', flexDirection: 'column', minHeight: '100vh',
    fontFamily: mono, color: theme.text, background: 'transparent',
  },
  body: { display: 'flex', flex: 1 },
  main: { flex: 1, overflow: 'auto' },
  loadingWrap: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    height: '80vh', fontSize: 13, color: theme.neon,
    fontFamily: mono, letterSpacing: 3, gap: 10,
  },

  // ── Header ────────────────────────────────────────────────────────────────
  header: {
    display: 'flex', alignItems: 'center', padding: '0 32px', height: 56,
    background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    position: 'sticky', top: 0, zIndex: 100,
    borderBottom: '1px solid rgba(0,255,136,0.15)',
  },
  headerLogo: {
    fontSize: 16, fontWeight: 700, cursor: 'pointer', marginRight: 'auto',
    fontFamily: mono, color: theme.neon, letterSpacing: 2,
    display: 'flex', alignItems: 'center', gap: 8,
  },
  headerNav: { display: 'flex', gap: 4 },
  navBtn: {
    background: 'none', border: 'none', borderRadius: 4, padding: '6px 14px',
    cursor: 'pointer', fontSize: 11, color: theme.textMuted,
    fontFamily: mono, letterSpacing: 1, transition: 'all 0.15s',
  },
  navBtnActive: {
    color: theme.neon, background: theme.neonDim,
    border: '1px solid rgba(0,255,136,0.2)',
  },
  headerRight: { display: 'flex', alignItems: 'center', gap: 12, marginLeft: 20 },
  aliasTag: {
    background: theme.neonDim, border: '1px solid rgba(0,255,136,0.25)',
    padding: '4px 12px', borderRadius: 4, fontSize: 11,
    color: theme.neon, fontFamily: mono, letterSpacing: 1,
  },
  logoutBtn: {
    background: 'none', border: '1px solid rgba(0,255,136,0.2)',
    borderRadius: 4, padding: '5px 12px', cursor: 'pointer',
    fontSize: 11, color: theme.textMuted, fontFamily: mono, letterSpacing: 1,
  },

  // ── Sidebar ───────────────────────────────────────────────────────────────
  sidebar: {
    width: 210, background: 'rgba(0,8,4,0.85)',
    borderRight: '1px solid rgba(0,255,136,0.1)',
    padding: '20px 10px', display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0,
  },
  sidebarUser: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '8px 10px 18px',
  },
  sidebarAvatar: {
    width: 42, height: 42, borderRadius: 4,
    background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.3)',
    color: theme.neon,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 17, fontWeight: 700, fontFamily: mono, flexShrink: 0,
  },
  sidebarAlias: { fontWeight: 700, fontSize: 12, color: theme.neon, fontFamily: mono, letterSpacing: 1 },
  sidebarGender: { color: theme.textMuted, fontSize: 11, marginTop: 3, fontFamily: mono },
  sidebarDivider: { border: 'none', borderTop: '1px solid rgba(0,255,136,0.08)', margin: '8px 0' },
  sidebarItem: {
    display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
    borderRadius: 4, border: 'none', background: 'none', cursor: 'pointer',
    fontSize: 11, textAlign: 'left', color: theme.textMuted, width: '100%',
    fontFamily: mono, letterSpacing: 1, transition: 'all 0.15s',
  },
  sidebarItemActive: {
    background: theme.neonDim, color: theme.neon,
    boxShadow: `inset 2px 0 0 ${theme.neon}`,
  },
  sidebarStats: { display: 'flex', gap: 6, marginTop: 10 },
  statBox: {
    flex: 1, textAlign: 'center',
    background: 'rgba(0,255,136,0.04)',
    border: '1px solid rgba(0,255,136,0.1)',
    borderRadius: 4, padding: '10px 4px',
    display: 'flex', flexDirection: 'column', gap: 4,
    fontSize: 10, color: theme.textMuted, fontFamily: mono, letterSpacing: 1,
  },

  // ── Auth ──────────────────────────────────────────────────────────────────
  authWrap: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flex: 1, padding: 24, minHeight: '85vh',
  },
  authCard: {
    background: 'rgba(0,255,136,0.03)',
    border: '1px solid rgba(0,255,136,0.2)',
    borderRadius: 8, padding: 'clamp(32px, 6vw, 48px) clamp(24px, 6vw, 44px)',
    width: '100%', maxWidth: 420,
    boxShadow: '0 0 60px rgba(0,255,136,0.07)',
    position: 'relative', overflow: 'hidden',
  },
  authCardTopLine: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 1,
    background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.6), transparent)',
  },
  authTitle: {
    fontSize: 22, fontWeight: 700, textAlign: 'center', marginBottom: 8,
    fontFamily: mono, color: theme.neon, letterSpacing: 3,
  },
  authSubtitle: {
    color: theme.textMuted, textAlign: 'center', marginBottom: 32,
    fontSize: 11, lineHeight: 1.8, fontFamily: mono,
  },
  infoBox: {
    background: 'rgba(0,255,136,0.05)', border: '1px solid rgba(0,255,136,0.2)',
    borderRadius: 4, padding: '12px 16px', marginBottom: 16,
    fontSize: 12, color: theme.neon, lineHeight: 1.6, fontFamily: mono,
  },
  input: {
    display: 'block', width: '100%', padding: '12px 16px', marginBottom: 12,
    border: '1px solid rgba(0,255,136,0.2)', borderRadius: 4, fontSize: 13,
    boxSizing: 'border-box', fontFamily: mono,
    background: 'rgba(0,255,136,0.04)', color: theme.text,
    outline: 'none', transition: 'all 0.15s',
  },
  label: {
    display: 'block', fontWeight: 700, fontSize: 10, marginBottom: 6,
    color: theme.textMuted, letterSpacing: 2, fontFamily: mono,
  },
  genderRow: { display: 'flex', gap: 6, marginBottom: 16 },
  genderBtn: {
    flex: 1, padding: '10px 4px', border: '1px solid rgba(0,255,136,0.15)',
    borderRadius: 4, background: 'rgba(0,255,136,0.03)', cursor: 'pointer',
    fontSize: 11, fontFamily: mono, color: theme.textMuted, transition: 'all 0.15s',
    letterSpacing: 0.5,
  },
  genderBtnActive: {
    background: theme.neonDim, color: theme.neon,
    border: '1px solid rgba(0,255,136,0.35)',
  },
  primaryBtn: {
    display: 'block', width: '100%', padding: '13px',
    background: theme.gradient, color: '#000', border: 'none',
    borderRadius: 4, cursor: 'pointer', fontSize: 13, fontWeight: 700,
    marginTop: 10, textAlign: 'center', fontFamily: mono,
    letterSpacing: 2, boxShadow: '0 0 24px rgba(0,255,136,0.2)',
    transition: 'all 0.15s',
  },
  authSwitch: { textAlign: 'center', marginTop: 20, fontSize: 11, color: theme.textMuted, fontFamily: mono },
  authLink: { color: theme.neon, fontWeight: 700, cursor: 'pointer' },
  error: { color: theme.error, fontSize: 11, marginBottom: 10, fontFamily: mono },

  // ── Pages ─────────────────────────────────────────────────────────────────
  pageWrap: {
    padding: 'clamp(24px,5vw,48px) clamp(16px,5vw,48px)',
    maxWidth: 720, margin: '0 auto', width: '100%',
  },
  pageTitle: {
    fontSize: 24, fontWeight: 700, marginBottom: 6, fontFamily: mono,
    color: theme.neon, letterSpacing: 3,
    display: 'flex', alignItems: 'center', gap: 10,
  },
  pageSubtitle: { color: theme.textMuted, marginBottom: 32, fontSize: 12, fontFamily: mono, letterSpacing: 1 },
  matchBanner: {
    background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.3)',
    color: theme.neon, padding: '14px 20px', borderRadius: 4, marginBottom: 24,
    textAlign: 'center', fontWeight: 700, fontSize: 13,
    fontFamily: mono, letterSpacing: 2,
  },

  // ── Discover ──────────────────────────────────────────────────────────────
  profileCard: {
    background: 'rgba(0,255,136,0.04)',
    border: '1px solid rgba(0,255,136,0.2)',
    borderRadius: 8, padding: '40px 36px', width: '100%', maxWidth: 380,
    textAlign: 'center', position: 'relative', overflow: 'hidden',
    boxShadow: '0 0 40px rgba(0,255,136,0.08)',
    transition: 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.45s ease',
  },
  profileAvatar: {
    width: 88, height: 88, borderRadius: 4,
    background: 'rgba(0,255,136,0.08)', border: '2px solid rgba(0,255,136,0.3)',
    color: theme.neon,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 36, fontWeight: 700, margin: '0 auto 16px', fontFamily: mono,
    boxShadow: '0 0 24px rgba(0,255,136,0.15)',
  },
  profileAlias: { fontSize: 20, fontWeight: 700, marginBottom: 6, fontFamily: mono, color: theme.neon, letterSpacing: 2 },
  profileMeta: { color: theme.textMuted, fontSize: 12, marginBottom: 12, fontFamily: mono },
  profileBio: {
    color: 'rgba(200,255,220,0.5)', fontSize: 12, fontStyle: 'italic',
    marginBottom: 18, lineHeight: 1.7, fontFamily: mono,
    borderLeft: '2px solid rgba(0,255,136,0.3)', paddingLeft: 12, textAlign: 'left',
  },
  cardLiked:  { transform: 'translateX(130px) rotate(15deg)', opacity: 0 },
  cardPassed: { transform: 'translateX(-130px) rotate(-15deg)', opacity: 0 },
  interestRow: { display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginBottom: 24 },
  interestTag: {
    background: 'rgba(0,255,136,0.06)', border: '1px solid rgba(0,255,136,0.15)',
    borderRadius: 4, padding: '4px 12px', fontSize: 10,
    color: theme.textMuted, fontFamily: mono, letterSpacing: 1,
  },
  actionRow: { display: 'flex', gap: 12, justifyContent: 'center' },
  passBtn: {
    padding: '12px 32px', background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(0,255,136,0.15)', color: theme.textMuted,
    borderRadius: 4, cursor: 'pointer', fontSize: 12, fontWeight: 700,
    fontFamily: mono, letterSpacing: 1, transition: 'all 0.15s',
  },
  likeBtn: {
    padding: '12px 32px', background: theme.gradient, color: '#000',
    border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12,
    fontWeight: 700, fontFamily: mono, letterSpacing: 1,
    boxShadow: '0 0 20px rgba(0,255,136,0.25)', transition: 'all 0.15s',
  },
  cardCounter: { marginTop: 18, color: theme.textDim, fontSize: 10, fontFamily: mono, letterSpacing: 2 },

  // ── Matches ───────────────────────────────────────────────────────────────
  matchGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 },
  matchCard: {
    background: 'rgba(0,255,136,0.04)', border: '1px solid rgba(0,255,136,0.15)',
    borderRadius: 8, padding: 20, textAlign: 'center', transition: 'all 0.15s',
    position: 'relative', overflow: 'hidden',
  },
  matchAvatar: {
    width: 56, height: 56, borderRadius: 4,
    background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.3)',
    color: theme.neon,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 22, fontWeight: 700, margin: '0 auto 10px', fontFamily: mono,
  },
  matchAlias: { fontWeight: 700, fontSize: 13, marginBottom: 4, fontFamily: mono, color: theme.neon, letterSpacing: 1 },
  matchMeta: { color: theme.textMuted, fontSize: 11, marginBottom: 12, fontFamily: mono },

  // ── Chat ──────────────────────────────────────────────────────────────────
  chatLayout: { display: 'flex', height: 'calc(100vh - 56px)' },
  chatList: {
    width: 240, background: 'rgba(0,8,4,0.9)',
    borderRight: '1px solid rgba(0,255,136,0.1)',
    overflowY: 'auto', flexShrink: 0,
  },
  chatListTitle: {
    padding: '18px 18px 12px', fontWeight: 700, fontSize: 10, letterSpacing: 3,
    color: theme.textMuted, fontFamily: mono,
    borderBottom: '1px solid rgba(0,255,136,0.08)',
  },
  chatListItem: {
    display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px',
    cursor: 'pointer', borderBottom: '1px solid rgba(0,255,136,0.05)',
    position: 'relative', transition: 'background 0.15s',
  },
  chatListItemActive: { background: theme.neonDim, boxShadow: `inset 2px 0 0 ${theme.neon}` },
  chatListAvatar: {
    width: 36, height: 36, borderRadius: 4,
    background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.2)',
    color: theme.neon,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 14, fontWeight: 700, flexShrink: 0, fontFamily: mono,
  },
  chatListName: { fontWeight: 700, fontSize: 12, color: theme.neon, fontFamily: mono, letterSpacing: 1 },
  chatListPreview: { color: theme.textMuted, fontSize: 10, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 2, fontFamily: mono },
  onlineDot: { width: 6, height: 6, borderRadius: '50%', background: theme.success, position: 'absolute', right: 14, top: 16 },
  chatWindow: { flex: 1, display: 'flex', flexDirection: 'column' },
  chatHeader: {
    display: 'flex', alignItems: 'center', gap: 12, padding: '12px 22px',
    background: 'rgba(0,8,4,0.9)',
    borderBottom: '1px solid rgba(0,255,136,0.08)',
    flexShrink: 0, position: 'sticky', top: 0, zIndex: 10,
  },
  chatHeaderAvatar: {
    width: 34, height: 34, borderRadius: 4,
    background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.25)',
    color: theme.neon,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 13, fontWeight: 700, fontFamily: mono, flexShrink: 0,
  },
  chatHeaderName: { fontWeight: 700, fontSize: 13, fontFamily: mono, color: theme.neon, letterSpacing: 1 },
  chatHeaderStatus: { fontSize: 10, color: theme.textMuted, marginTop: 2, fontFamily: mono },
  messagesArea: {
    flex: 1, overflowY: 'auto', padding: '20px',
    display: 'flex', flexDirection: 'column', gap: 10,
  },
  msgWrapMe:   { display: 'flex', flexDirection: 'column', alignItems: 'flex-end' },
  msgWrapThem: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
  msgBubbleMe: {
    background: 'rgba(0,255,136,0.12)', border: '1px solid rgba(0,255,136,0.25)',
    color: theme.neon,
    borderRadius: '8px 8px 2px 8px', padding: '10px 18px',
    maxWidth: 320, fontSize: 13, lineHeight: 1.6, fontFamily: mono,
    boxShadow: '0 0 12px rgba(0,255,136,0.1)',
  },
  msgBubbleThem: {
    background: 'rgba(0,255,136,0.04)', border: '1px solid rgba(0,255,136,0.12)',
    borderRadius: '8px 8px 8px 2px', padding: '10px 18px',
    maxWidth: 320, fontSize: 13, color: theme.text, lineHeight: 1.6, fontFamily: mono,
  },
  msgTime: { fontSize: 9, color: theme.textDim, marginTop: 3, fontFamily: mono, letterSpacing: 0.5 },
  chatInputRow: {
    display: 'flex', gap: 10, padding: '12px 18px',
    background: 'rgba(0,8,4,0.9)',
    borderTop: '1px solid rgba(0,255,136,0.08)', flexShrink: 0,
  },
  chatInput: {
    flex: 1, padding: '10px 18px',
    border: '1px solid rgba(0,255,136,0.2)', borderRadius: 4,
    fontSize: 13, fontFamily: mono,
    background: 'rgba(0,255,136,0.04)', color: theme.text,
    outline: 'none',
  },
  sendBtn: {
    padding: '10px 20px', background: theme.gradient, color: '#000', border: 'none',
    borderRadius: 4, cursor: 'pointer', fontWeight: 700, fontFamily: mono,
    fontSize: 12, letterSpacing: 1, boxShadow: '0 0 16px rgba(0,255,136,0.2)', flexShrink: 0,
  },

  // ── Profile & Settings ────────────────────────────────────────────────────
  profileEditCard: {
    background: 'rgba(0,255,136,0.04)', border: '1px solid rgba(0,255,136,0.15)',
    borderRadius: 8, padding: 'clamp(24px,5vw,40px)', width: '100%',
  },
  profileEditAvatar: {
    width: 80, height: 80, borderRadius: 4,
    background: 'rgba(0,255,136,0.08)', border: '2px solid rgba(0,255,136,0.3)',
    color: theme.neon,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 32, fontWeight: 700, marginBottom: 14, fontFamily: mono,
    boxShadow: '0 0 20px rgba(0,255,136,0.15)',
  },
  profileEditAlias: { fontSize: 20, fontWeight: 700, marginBottom: 4, fontFamily: mono, color: theme.neon, letterSpacing: 2 },
  profileEditNote: { color: theme.textMuted, fontSize: 11, marginBottom: 24, lineHeight: 1.6, fontFamily: mono },
  profileSection: { marginBottom: 18 },
  settingsCard: {
    background: 'rgba(0,255,136,0.04)', border: '1px solid rgba(0,255,136,0.15)',
    borderRadius: 8, padding: 'clamp(24px,5vw,40px)', width: '100%',
    display: 'flex', flexDirection: 'column',
  },
  settingRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '16px 0', borderBottom: '1px solid rgba(0,255,136,0.07)',
  },
  settingLabel: { fontWeight: 700, fontSize: 13, marginBottom: 3, color: theme.text, fontFamily: mono },
  settingDesc: { color: theme.textMuted, fontSize: 11, lineHeight: 1.5, fontFamily: mono },
  toggleOn: {
    width: 44, height: 24, borderRadius: 12, background: theme.gradient,
    cursor: 'pointer', position: 'relative', flexShrink: 0,
    boxShadow: '0 0 12px rgba(0,255,136,0.3)',
  },
  toggleOff: {
    width: 44, height: 24, borderRadius: 12,
    background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.15)',
    cursor: 'pointer', position: 'relative', flexShrink: 0,
  },
  toggleKnob: {
    width: 18, height: 18, borderRadius: '50%', background: '#fff',
    position: 'absolute', top: 3, boxShadow: '0 2px 6px rgba(0,0,0,0.4)', transition: 'left 0.2s',
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    background: 'rgba(0,8,4,0.9)',
    borderTop: '1px solid rgba(0,255,136,0.08)',
    padding: '12px 32px', fontSize: 10, color: theme.textMuted,
    display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6,
    fontFamily: mono, letterSpacing: 1,
  },
  footerLink: { color: theme.textMuted, textDecoration: 'none' },
};

// ── Mobile styles ──────────────────────────────────────────────────────────
export const mobileStyles = {
  hamburger: {
    background: 'none', border: 'none', cursor: 'pointer',
    padding: '8px', marginRight: 12, display: 'flex',
    flexDirection: 'column', gap: 5, flexShrink: 0,
  },
  hamburgerLine: {
    display: 'block', width: 22, height: 2,
    background: 'rgba(0,255,136,0.7)', borderRadius: 2,
  },
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)',
    zIndex: 199, backdropFilter: 'blur(4px)',
  },
  drawer: {
    position: 'fixed', top: 0, left: 0, bottom: 0, width: 270,
    zIndex: 200, transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
    background: 'rgba(0,8,4,0.98)',
    borderRight: '1px solid rgba(0,255,136,0.15)',
    overflowY: 'auto',
  },
  sidebarMobile: {
    padding: '20px 12px 30px', display: 'flex',
    flexDirection: 'column', gap: 2, minHeight: '100%',
  },
  sidebarClose: {
    background: 'none', border: 'none', color: theme.textMuted,
    fontSize: 18, cursor: 'pointer', alignSelf: 'flex-end',
    padding: '4px 8px', marginBottom: 14, fontFamily: mono,
  },
  bottomNav: {
    position: 'fixed', bottom: 0, left: 0, right: 0, height: 60,
    background: 'rgba(0,8,4,0.98)',
    borderTop: '1px solid rgba(0,255,136,0.12)',
    display: 'flex', alignItems: 'center',
    zIndex: 100,
  },
  bottomNavBtn: {
    background: 'none', border: 'none', cursor: 'pointer',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    padding: '8px 0', fontFamily: mono, flex: 1,
  },
};
