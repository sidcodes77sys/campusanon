// CampusAnon v4 — Deep Space · Roboto Condensed throughout

export const theme = {
  bg: 'transparent',
  bgCard: 'rgba(8,8,22,0.78)',
  bgSurface: 'rgba(12,12,30,0.82)',
  bgHover: 'rgba(20,20,48,0.9)',
  border: 'rgba(255,255,255,0.07)',
  neon: '#ff2d78',
  neonDim: 'rgba(255,45,120,0.12)',
  neonGlow: '0 0 30px rgba(255,45,120,0.5), 0 0 60px rgba(255,45,120,0.15)',
  neonGlowSm: '0 0 14px rgba(255,45,120,0.35)',
  cyan: '#00f0ff',
  cyanDim: 'rgba(0,240,255,0.1)',
  text: '#f0f0ff',
  textMuted: 'rgba(200,200,255,0.45)',
  textDim: 'rgba(150,150,200,0.22)',
  success: '#00ff88',
  error: '#ff4466',
  gradient: 'linear-gradient(135deg, #ff2d78 0%, #bf5fff 100%)',
};

export const glass = {
  background: 'rgba(8,8,22,0.78)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.07)',
};

// Roboto Condensed everywhere
const RC = "'Roboto Condensed', 'Arial Narrow', sans-serif";
const mono = "'Space Mono', monospace";

export const styles = {
  appWrap: {
    display: 'flex', flexDirection: 'column', minHeight: '100vh',
    fontFamily: RC, color: theme.text, background: 'transparent',
  },
  body: { display: 'flex', flex: 1 },
  main: { flex: 1, overflow: 'auto' },
  loadingWrap: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    height: '80vh', fontSize: 16, color: theme.textMuted,
    fontFamily: RC, letterSpacing: 3, gap: 10, textTransform: 'uppercase',
  },

  // ── Header ────────────────────────────────────────────────────────────────
  header: {
    display: 'flex', alignItems: 'center', padding: '0 36px', height: 62,
    ...glass, position: 'sticky', top: 0, zIndex: 100,
    borderTop: 'none', borderLeft: 'none', borderRight: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  headerLogo: {
    fontSize: 20, fontWeight: 800, cursor: 'pointer', marginRight: 'auto',
    fontFamily: RC, color: theme.text, letterSpacing: 3, textTransform: 'uppercase',
    display: 'flex', alignItems: 'center', gap: 10,
  },
  headerNav: { display: 'flex', gap: 4 },
  navBtn: {
    background: 'none', border: 'none', borderRadius: 8, padding: '7px 18px',
    cursor: 'pointer', fontSize: 14, color: theme.textMuted,
    fontFamily: RC, fontWeight: 600, letterSpacing: 1.5,
    textTransform: 'uppercase', transition: 'all 0.2s',
  },
  navBtnActive: {
    color: theme.neon, background: theme.neonDim,
    boxShadow: `inset 0 0 0 1px rgba(255,45,120,0.2)`,
  },
  headerRight: { display: 'flex', alignItems: 'center', gap: 14, marginLeft: 28 },
  aliasTag: {
    background: theme.neonDim, boxShadow: `inset 0 0 0 1px rgba(255,45,120,0.25), ${theme.neonGlowSm}`,
    padding: '5px 16px', borderRadius: 20, fontSize: 11,
    color: theme.neon, fontFamily: mono, letterSpacing: 2,
  },
  logoutBtn: {
    background: 'none', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8, padding: '6px 16px', cursor: 'pointer',
    fontSize: 13, color: theme.textMuted, fontFamily: RC,
    fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase',
  },

  // ── Sidebar ───────────────────────────────────────────────────────────────
  sidebar: {
    width: 236, ...glass, borderTop: 'none', borderBottom: 'none', borderLeft: 'none',
    borderRight: '1px solid rgba(255,255,255,0.05)',
    padding: '28px 14px', display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0,
  },
  sidebarUser: {
    display: 'flex', alignItems: 'center', gap: 14,
    padding: '8px 12px 22px', marginBottom: 2,
  },
  sidebarAvatar: {
    width: 48, height: 48, borderRadius: '50%',
    background: theme.gradient, color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 20, fontWeight: 800, fontFamily: RC,
    boxShadow: theme.neonGlow, flexShrink: 0,
  },
  sidebarAlias: { fontWeight: 700, fontSize: 14, color: theme.text, fontFamily: mono, letterSpacing: 0.5 },
  sidebarGender: { color: theme.textMuted, fontSize: 12, marginTop: 3, fontFamily: RC, letterSpacing: 0.5 },
  sidebarDivider: { border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '10px 0' },
  sidebarItem: {
    display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px',
    borderRadius: 10, border: 'none', background: 'none', cursor: 'pointer',
    fontSize: 14, textAlign: 'left', color: theme.textMuted, width: '100%',
    fontFamily: RC, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase',
    transition: 'all 0.18s',
  },
  sidebarItemActive: {
    background: theme.neonDim, color: theme.text,
    boxShadow: `inset 2px 0 0 ${theme.neon}`,
  },
  sidebarStats: { display: 'flex', gap: 8, marginTop: 10 },
  statBox: {
    flex: 1, textAlign: 'center', background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10,
    padding: '12px 6px', display: 'flex', flexDirection: 'column', gap: 4,
    fontSize: 11, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: 1,
  },

  // ── Auth ──────────────────────────────────────────────────────────────────
  authWrap: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flex: 1, padding: 24, minHeight: '85vh',
  },
  authCard: {
    ...glass, borderRadius: 24, padding: '50px 48px',
    width: '100%', maxWidth: 440,
    boxShadow: `0 0 0 1px rgba(255,45,120,0.08), 0 40px 100px rgba(0,0,0,0.7)`,
    animation: 'fadeUp 0.5s ease forwards', position: 'relative', overflow: 'hidden',
  },
  authCardTopLine: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
    background: theme.gradient, boxShadow: '0 0 20px rgba(255,45,120,0.5)',
  },
  authTitle: {
    fontSize: 30, fontWeight: 800, textAlign: 'center', marginBottom: 8,
    fontFamily: RC, color: theme.text, letterSpacing: 4, textTransform: 'uppercase',
  },
  authSubtitle: {
    color: theme.textMuted, textAlign: 'center', marginBottom: 34,
    fontSize: 13, lineHeight: 1.7, fontWeight: 400, letterSpacing: 0.5,
  },
  infoBox: {
    background: 'rgba(0,255,136,0.06)', border: '1px solid rgba(0,255,136,0.2)',
    borderRadius: 10, padding: '13px 16px', marginBottom: 18,
    fontSize: 13, color: theme.success, lineHeight: 1.6, fontFamily: RC, letterSpacing: 0.3,
  },
  input: {
    display: 'block', width: '100%', padding: '13px 18px', marginBottom: 14,
    border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, fontSize: 15,
    boxSizing: 'border-box', fontFamily: RC, fontWeight: 400, letterSpacing: 0.5,
    background: 'rgba(255,255,255,0.04)', color: theme.text, outline: 'none', transition: 'all 0.2s',
  },
  label: {
    display: 'block', fontWeight: 700, fontSize: 11, marginBottom: 8,
    color: theme.textMuted, letterSpacing: 2, textTransform: 'uppercase', fontFamily: RC,
  },
  genderRow: { display: 'flex', gap: 8, marginBottom: 18 },
  genderBtn: {
    flex: 1, padding: '11px 4px', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 10, background: 'rgba(255,255,255,0.03)', cursor: 'pointer',
    fontSize: 13, fontFamily: RC, color: theme.textMuted, transition: 'all 0.2s',
    fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase',
  },
  genderBtnActive: {
    background: theme.neonDim, color: theme.text,
    border: `1px solid rgba(255,45,120,0.4)`, boxShadow: theme.neonGlowSm,
  },
  primaryBtn: {
    display: 'block', width: '100%', padding: '14px',
    background: theme.gradient, color: '#fff', border: 'none',
    borderRadius: 12, cursor: 'pointer', fontSize: 15, fontWeight: 800,
    marginTop: 10, textAlign: 'center', fontFamily: RC,
    letterSpacing: 2, textTransform: 'uppercase',
    boxShadow: `${theme.neonGlowSm}, 0 4px 20px rgba(255,45,120,0.3)`,
  },
  secondaryBtn: {
    display: 'block', padding: '11px 20px', background: 'none', color: theme.textMuted,
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, cursor: 'pointer',
    fontSize: 13, marginTop: 8, fontFamily: RC, fontWeight: 600,
    letterSpacing: 1, textTransform: 'uppercase', transition: 'all 0.2s',
  },
  authSwitch: { textAlign: 'center', marginTop: 22, fontSize: 13, color: theme.textMuted, letterSpacing: 0.3 },
  authLink: { color: theme.neon, fontWeight: 700, cursor: 'pointer' },
  error: { color: theme.error, fontSize: 12, marginBottom: 10, letterSpacing: 0.3 },

  // ── Pages ─────────────────────────────────────────────────────────────────
  page: { padding: '44px 52px', maxWidth: 980 },
  pageTitle: {
    fontSize: 32, fontWeight: 800, marginBottom: 8, fontFamily: RC,
    color: theme.text, letterSpacing: 3, textTransform: 'uppercase',
    display: 'flex', alignItems: 'center', gap: 12,
  },
  pageSubtitle: {
    color: theme.textMuted, marginBottom: 38, fontSize: 14,
    fontWeight: 400, letterSpacing: 0.5,
  },
  emptyState: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    padding: '80px 20px', color: theme.textMuted, textAlign: 'center',
  },
  matchBanner: {
    background: 'rgba(255,45,120,0.08)', border: '1px solid rgba(255,45,120,0.25)',
    color: theme.neon, padding: '16px 24px', borderRadius: 14, marginBottom: 28,
    textAlign: 'center', fontWeight: 800, fontSize: 15,
    boxShadow: theme.neonGlowSm, fontFamily: RC, letterSpacing: 2, textTransform: 'uppercase',
  },

  // ── Discover ──────────────────────────────────────────────────────────────
  discoverWrap: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 12,
  },
  profileCard: {
    ...glass, borderRadius: 24, padding: '44px 40px', width: 380,
    textAlign: 'center', position: 'relative', overflow: 'hidden',
    boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)`,
    transition: 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.45s ease',
    animation: 'float 5s ease-in-out infinite',
  },
  profileAvatar: {
    width: 96, height: 96, borderRadius: '50%', background: theme.gradient, color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 40, fontWeight: 800, margin: '0 auto 18px',
    fontFamily: RC, boxShadow: theme.neonGlow,
  },
  profileAlias: {
    fontSize: 22, fontWeight: 700, marginBottom: 6, fontFamily: mono,
    color: theme.text, letterSpacing: 2,
  },
  profileMeta: { color: theme.textMuted, fontSize: 13, marginBottom: 12, fontWeight: 400, letterSpacing: 0.3 },
  profileBio: {
    color: 'rgba(200,200,255,0.6)', fontSize: 13, fontStyle: 'italic',
    marginBottom: 20, lineHeight: 1.7,
    borderLeft: '2px solid rgba(255,45,120,0.3)', paddingLeft: 14, textAlign: 'left',
  },
  cardLiked:  { transform: 'translateX(130px) rotate(15deg)', opacity: 0 },
  cardPassed: { transform: 'translateX(-130px) rotate(-15deg)', opacity: 0 },
  interestRow: { display: 'flex', flexWrap: 'wrap', gap: 7, justifyContent: 'center', marginBottom: 28 },
  interestTag: {
    background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.2)',
    borderRadius: 20, padding: '5px 14px', fontSize: 11,
    color: theme.cyan, fontFamily: RC, letterSpacing: 1.2, fontWeight: 600, textTransform: 'uppercase',
  },
  interestTagSm: {
    background: 'rgba(0,240,255,0.08)', borderRadius: 20, padding: '4px 10px',
    fontSize: 10, color: theme.cyan, fontFamily: RC, letterSpacing: 1, fontWeight: 600,
  },
  actionRow: { display: 'flex', gap: 16, justifyContent: 'center' },
  passBtn: {
    padding: '13px 36px', background: 'rgba(255,68,102,0.08)',
    border: '1px solid rgba(255,68,102,0.3)', color: '#ff4466',
    borderRadius: 50, cursor: 'pointer', fontSize: 14, fontWeight: 700,
    fontFamily: RC, letterSpacing: 1.5, textTransform: 'uppercase', transition: 'all 0.2s',
  },
  likeBtn: {
    padding: '13px 36px', background: theme.gradient, color: '#fff',
    border: 'none', borderRadius: 50, cursor: 'pointer', fontSize: 14,
    fontWeight: 700, fontFamily: RC, letterSpacing: 1.5, textTransform: 'uppercase',
    boxShadow: `${theme.neonGlowSm}, 0 4px 20px rgba(255,45,120,0.35)`,
  },
  cardCounter: {
    marginTop: 22, color: theme.textDim, fontSize: 11,
    fontFamily: RC, letterSpacing: 3, textTransform: 'uppercase',
  },

  // ── Matches ───────────────────────────────────────────────────────────────
  matchGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 },
  matchCard: {
    ...glass, borderRadius: 20, padding: 28, textAlign: 'center',
    transition: 'all 0.2s', position: 'relative', overflow: 'hidden',
    boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
  },
  matchAvatar: {
    width: 68, height: 68, borderRadius: '50%', background: theme.gradient, color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 28, fontWeight: 800, margin: '0 auto 14px',
    fontFamily: RC, boxShadow: theme.neonGlowSm,
  },
  matchAlias: { fontWeight: 700, fontSize: 16, marginBottom: 4, fontFamily: mono, color: theme.text, letterSpacing: 1 },
  matchMeta: { color: theme.textMuted, fontSize: 12, marginBottom: 14, letterSpacing: 0.3 },

  // ── Chat ──────────────────────────────────────────────────────────────────
  chatLayout: { display: 'flex', height: 'calc(100vh - 62px)' },
  chatList: {
    width: 280, ...glass, borderTop: 'none', borderBottom: 'none', borderLeft: 'none',
    borderRight: '1px solid rgba(255,255,255,0.05)', overflowY: 'auto', flexShrink: 0,
  },
  chatListTitle: {
    padding: '20px 20px 14px', fontWeight: 800, fontSize: 10, letterSpacing: 3,
    textTransform: 'uppercase', color: theme.textMuted, fontFamily: RC,
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  chatListItem: {
    display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px',
    cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.03)',
    position: 'relative', transition: 'background 0.15s',
  },
  chatListItemActive: {
    background: theme.neonDim, boxShadow: `inset 2px 0 0 ${theme.neon}`,
  },
  chatListAvatar: {
    width: 42, height: 42, borderRadius: '50%', background: theme.gradient, color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 17, fontWeight: 800, flexShrink: 0, fontFamily: RC,
  },
  chatListName: { fontWeight: 700, fontSize: 13, color: theme.text, fontFamily: mono, letterSpacing: 0.5 },
  chatListPreview: {
    color: theme.textMuted, fontSize: 11, overflow: 'hidden',
    textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 2, fontFamily: RC,
  },
  onlineDot: {
    width: 8, height: 8, borderRadius: '50%', background: theme.success,
    position: 'absolute', right: 18, top: 18, boxShadow: '0 0 8px rgba(0,255,136,0.7)',
  },
  chatWindow: { flex: 1, display: 'flex', flexDirection: 'column' },
  chatHeader: {
    display: 'flex', alignItems: 'center', gap: 14, padding: '16px 30px',
    ...glass, borderTop: 'none', borderLeft: 'none', borderRight: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.05)', flexShrink: 0,
  },
  chatHeaderAvatar: {
    width: 40, height: 40, borderRadius: '50%', background: theme.gradient, color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 16, fontWeight: 800, fontFamily: RC,
  },
  chatHeaderName: { fontWeight: 700, fontSize: 15, fontFamily: mono, color: theme.text, letterSpacing: 1 },
  chatHeaderStatus: { fontSize: 11, color: theme.textMuted, marginTop: 2, fontFamily: RC, letterSpacing: 0.5 },
  messagesArea: {
    flex: 1, overflowY: 'auto', padding: '30px',
    display: 'flex', flexDirection: 'column', gap: 12, background: 'rgba(0,0,8,0.25)',
  },
  msgWrapMe:   { display: 'flex', flexDirection: 'column', alignItems: 'flex-end' },
  msgWrapThem: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
  msgBubbleMe: {
    background: theme.gradient, color: '#fff', borderRadius: '20px 20px 4px 20px',
    padding: '12px 20px', maxWidth: 320, fontSize: 14, lineHeight: 1.6,
    boxShadow: `${theme.neonGlowSm}, 0 4px 15px rgba(255,45,120,0.2)`, fontFamily: RC, fontWeight: 400,
  },
  msgBubbleThem: {
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '20px 20px 20px 4px', padding: '12px 20px', maxWidth: 320,
    fontSize: 14, color: theme.text, lineHeight: 1.6, fontFamily: RC, fontWeight: 400,
    backdropFilter: 'blur(10px)',
  },
  msgTime: { fontSize: 10, color: theme.textDim, marginTop: 4, fontFamily: RC, letterSpacing: 0.5 },
  chatInputRow: {
    display: 'flex', gap: 12, padding: '16px 24px', ...glass,
    borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: 'none',
    borderLeft: 'none', borderRight: 'none', flexShrink: 0,
  },
  chatInput: {
    flex: 1, padding: '12px 22px', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 50, fontSize: 14, fontFamily: RC, fontWeight: 400,
    background: 'rgba(255,255,255,0.04)', color: theme.text, outline: 'none', transition: 'all 0.2s',
    letterSpacing: 0.3,
  },
  sendBtn: {
    padding: '12px 26px', background: theme.gradient, color: '#fff', border: 'none',
    borderRadius: 50, cursor: 'pointer', fontWeight: 800, fontFamily: RC,
    fontSize: 13, boxShadow: theme.neonGlowSm, letterSpacing: 1.5, textTransform: 'uppercase',
  },

  // ── Profile ───────────────────────────────────────────────────────────────
  profileEditCard: {
    ...glass, borderRadius: 20, padding: 44, maxWidth: 540,
    boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
  },
  profileEditAvatar: {
    width: 86, height: 86, borderRadius: '50%', background: theme.gradient, color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 36, fontWeight: 800, marginBottom: 16, fontFamily: RC, boxShadow: theme.neonGlow,
  },
  profileEditAlias: { fontSize: 22, fontWeight: 700, marginBottom: 4, fontFamily: mono, color: theme.text, letterSpacing: 1.5 },
  profileEditNote: { color: theme.textMuted, fontSize: 12, marginBottom: 28, lineHeight: 1.6 },
  profileSection: { marginBottom: 20 },

  // ── Settings ──────────────────────────────────────────────────────────────
  settingsCard: {
    ...glass, borderRadius: 20, padding: 44, maxWidth: 540,
    display: 'flex', flexDirection: 'column', boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
  },
  settingRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '18px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  settingLabel: { fontWeight: 700, fontSize: 14, marginBottom: 3, color: theme.text, letterSpacing: 0.5 },
  settingDesc: { color: theme.textMuted, fontSize: 12, lineHeight: 1.5 },
  toggleOn: {
    width: 46, height: 26, borderRadius: 13, background: theme.gradient,
    cursor: 'pointer', position: 'relative', flexShrink: 0, boxShadow: theme.neonGlowSm,
  },
  toggleOff: {
    width: 46, height: 26, borderRadius: 13, background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    cursor: 'pointer', position: 'relative', flexShrink: 0,
  },
  toggleKnob: {
    width: 20, height: 20, borderRadius: '50%', background: '#fff',
    position: 'absolute', top: 3, boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
    transition: 'left 0.2s, right 0.2s',
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    ...glass, borderBottom: 'none', borderLeft: 'none', borderRight: 'none',
    borderTop: '1px solid rgba(255,255,255,0.04)',
    padding: '14px 36px', fontSize: 11, color: theme.textMuted,
    display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6,
    fontFamily: RC, letterSpacing: 1, textTransform: 'uppercase',
  },
  footerLink: { color: theme.textMuted, textDecoration: 'none' },
};
