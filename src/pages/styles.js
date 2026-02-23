// CampusAnon — Option 3: Ember & Dark

export const theme = {
  bg: 'transparent',
  bgCard: 'rgba(232,135,42,0.06)',
  bgSurface: 'rgba(232,135,42,0.08)',
  border: 'rgba(232,135,42,0.15)',
  neon: '#e8872a',
  neonDim: 'rgba(232,135,42,0.1)',
  text: '#fff5eb',
  textMuted: 'rgba(255,245,235,0.4)',
  textDim: 'rgba(255,245,235,0.15)',
  success: '#7dba84',
  error: '#c97676',
  gradient: 'linear-gradient(135deg, #e8872a 0%, #c45f10 100%)',
};

const RC = "'Roboto Condensed', 'Arial Narrow', sans-serif";
const mono = "'Space Mono', monospace";

const centerPage = {
  maxWidth: 680,
  margin: '0 auto',
  width: '100%',
};

export const styles = {
  appWrap: {
    display: 'flex', flexDirection: 'column', minHeight: '100vh',
    fontFamily: RC, color: theme.text, background: 'transparent',
  },
  body: { display: 'flex', flex: 1 },
  main: { flex: 1, overflow: 'auto' },
  loadingWrap: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    height: '80vh', fontSize: 15, color: theme.textMuted,
    fontFamily: RC, letterSpacing: 3, gap: 10, textTransform: 'uppercase',
  },

  // ── Header ────────────────────────────────────────────────────────────────
  header: {
    display: 'flex', alignItems: 'center', padding: '0 36px', height: 62,
    background: 'rgba(12,5,0,0.75)', backdropFilter: 'blur(28px)',
    WebkitBackdropFilter: 'blur(28px)',
    position: 'sticky', top: 0, zIndex: 100,
    borderBottom: '1px solid rgba(232,135,42,0.12)',
  },
  headerLogo: {
    fontSize: 19, fontWeight: 800, cursor: 'pointer', marginRight: 'auto',
    fontFamily: RC, color: theme.text, letterSpacing: 3, textTransform: 'uppercase',
    display: 'flex', alignItems: 'center', gap: 8,
  },
  headerNav: { display: 'flex', gap: 2 },
  navBtn: {
    background: 'none', border: 'none', borderRadius: 8, padding: '7px 18px',
    cursor: 'pointer', fontSize: 13, color: theme.textMuted,
    fontFamily: RC, fontWeight: 600, letterSpacing: 1.5,
    textTransform: 'uppercase', transition: 'all 0.2s',
  },
  navBtnActive: { color: theme.neon, background: theme.neonDim },
  headerRight: { display: 'flex', alignItems: 'center', gap: 14, marginLeft: 28 },
  aliasTag: {
    background: theme.neonDim, border: '1px solid rgba(232,135,42,0.25)',
    padding: '5px 16px', borderRadius: 20, fontSize: 11,
    color: theme.neon, fontFamily: mono, letterSpacing: 2,
  },
  logoutBtn: {
    background: 'none', border: '1px solid rgba(232,135,42,0.15)',
    borderRadius: 8, padding: '6px 16px', cursor: 'pointer',
    fontSize: 12, color: theme.textMuted, fontFamily: RC,
    fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase',
  },

  // ── Sidebar ───────────────────────────────────────────────────────────────
  sidebar: {
    width: 220, background: 'rgba(12,5,0,0.6)', backdropFilter: 'blur(28px)',
    WebkitBackdropFilter: 'blur(28px)',
    borderRight: '1px solid rgba(232,135,42,0.1)',
    padding: '28px 14px', display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0,
  },
  sidebarUser: {
    display: 'flex', alignItems: 'center', gap: 14,
    padding: '8px 12px 22px',
  },
  sidebarAvatar: {
    width: 48, height: 48, borderRadius: '50%',
    background: theme.gradient, color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 20, fontWeight: 800, fontFamily: RC, flexShrink: 0,
    boxShadow: '0 4px 20px rgba(232,135,42,0.35)',
  },
  sidebarAlias: { fontWeight: 700, fontSize: 14, color: theme.text, fontFamily: mono, letterSpacing: 0.5 },
  sidebarGender: { color: theme.textMuted, fontSize: 12, marginTop: 3 },
  sidebarDivider: { border: 'none', borderTop: '1px solid rgba(232,135,42,0.1)', margin: '10px 0' },
  sidebarItem: {
    display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px',
    borderRadius: 10, border: 'none', background: 'none', cursor: 'pointer',
    fontSize: 13, textAlign: 'left', color: theme.textMuted, width: '100%',
    fontFamily: RC, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase',
    transition: 'all 0.18s',
  },
  sidebarItemActive: {
    background: theme.neonDim, color: theme.text,
    boxShadow: `inset 2px 0 0 ${theme.neon}`,
  },
  sidebarStats: { display: 'flex', gap: 8, marginTop: 10 },
  statBox: {
    flex: 1, textAlign: 'center',
    background: 'rgba(232,135,42,0.06)',
    border: '1px solid rgba(232,135,42,0.12)',
    borderRadius: 10, padding: '12px 6px',
    display: 'flex', flexDirection: 'column', gap: 4,
    fontSize: 11, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: 1,
  },

  // ── Auth ──────────────────────────────────────────────────────────────────
  authWrap: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flex: 1, padding: 24, minHeight: '85vh',
  },
  authCard: {
    background: 'rgba(232,135,42,0.07)',
    backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
    border: '1px solid rgba(232,135,42,0.18)',
    borderRadius: 24, padding: 'clamp(32px, 6vw, 50px) clamp(24px, 6vw, 48px)',
    width: '100%', maxWidth: 440,
    boxShadow: '0 40px 100px rgba(180,80,0,0.2)',
    position: 'relative', overflow: 'hidden',
  },
  authCardTopLine: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 1,
    background: 'linear-gradient(90deg, transparent, rgba(232,135,42,0.7), transparent)',
  },
  authTitle: {
    fontSize: 28, fontWeight: 800, textAlign: 'center', marginBottom: 8,
    fontFamily: RC, color: theme.text, letterSpacing: 4, textTransform: 'uppercase',
  },
  authSubtitle: {
    color: theme.textMuted, textAlign: 'center', marginBottom: 34,
    fontSize: 13, lineHeight: 1.7,
  },
  infoBox: {
    background: 'rgba(125,186,132,0.08)', border: '1px solid rgba(125,186,132,0.2)',
    borderRadius: 10, padding: '13px 16px', marginBottom: 18,
    fontSize: 13, color: theme.success, lineHeight: 1.6,
  },
  input: {
    display: 'block', width: '100%', padding: '13px 18px', marginBottom: 14,
    border: '1px solid rgba(232,135,42,0.15)', borderRadius: 12, fontSize: 14,
    boxSizing: 'border-box', fontFamily: RC,
    background: 'rgba(232,135,42,0.06)', color: theme.text,
    outline: 'none', transition: 'all 0.2s',
  },
  label: {
    display: 'block', fontWeight: 700, fontSize: 10, marginBottom: 8,
    color: theme.textMuted, letterSpacing: 2, textTransform: 'uppercase', fontFamily: RC,
  },
  genderRow: { display: 'flex', gap: 8, marginBottom: 18 },
  genderBtn: {
    flex: 1, padding: '11px 4px', border: '1px solid rgba(232,135,42,0.15)',
    borderRadius: 10, background: 'rgba(232,135,42,0.05)', cursor: 'pointer',
    fontSize: 12, fontFamily: RC, color: theme.textMuted, transition: 'all 0.2s',
    fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase',
  },
  genderBtnActive: {
    background: theme.neonDim, color: theme.neon,
    border: '1px solid rgba(232,135,42,0.35)',
  },
  primaryBtn: {
    display: 'block', width: '100%', padding: '14px',
    background: theme.gradient, color: '#fff', border: 'none',
    borderRadius: 12, cursor: 'pointer', fontSize: 14, fontWeight: 800,
    marginTop: 10, textAlign: 'center', fontFamily: RC,
    letterSpacing: 2, textTransform: 'uppercase',
    boxShadow: '0 4px 24px rgba(232,135,42,0.25)',
    transition: 'all 0.2s',
  },
  authSwitch: { textAlign: 'center', marginTop: 22, fontSize: 13, color: theme.textMuted },
  authLink: { color: theme.neon, fontWeight: 700, cursor: 'pointer' },
  error: { color: theme.error, fontSize: 12, marginBottom: 10 },

  // ── Pages — ALL CENTERED ──────────────────────────────────────────────────
  pageWrap: {
    padding: 'clamp(24px, 5vw, 52px) clamp(16px, 5vw, 52px)',
    maxWidth: 760, margin: '0 auto', width: '100%',
  },
  pageTitle: {
    fontSize: 28, fontWeight: 800, marginBottom: 8, fontFamily: RC,
    color: theme.text, letterSpacing: 3, textTransform: 'uppercase',
    display: 'flex', alignItems: 'center', gap: 12,
  },
  pageSubtitle: { color: theme.textMuted, marginBottom: 36, fontSize: 14 },
  matchBanner: {
    background: 'rgba(232,135,42,0.1)', border: '1px solid rgba(232,135,42,0.3)',
    color: theme.neon, padding: '16px 24px', borderRadius: 14, marginBottom: 28,
    textAlign: 'center', fontWeight: 800, fontSize: 14,
    fontFamily: RC, letterSpacing: 2, textTransform: 'uppercase',
  },

  // ── Discover ──────────────────────────────────────────────────────────────
  profileCard: {
    background: 'rgba(232,135,42,0.07)',
    backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
    border: '1px solid rgba(232,135,42,0.15)',
    borderRadius: 24, padding: '44px 40px', width: '100%', maxWidth: 400,
    textAlign: 'center', position: 'relative', overflow: 'hidden',
    boxShadow: '0 30px 80px rgba(180,80,0,0.2)',
    transition: 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.45s ease',
  },
  profileAvatar: {
    width: 96, height: 96, borderRadius: '50%', background: theme.gradient, color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 40, fontWeight: 800, margin: '0 auto 18px', fontFamily: RC,
    boxShadow: '0 8px 32px rgba(232,135,42,0.35)',
  },
  profileAlias: { fontSize: 22, fontWeight: 700, marginBottom: 6, fontFamily: mono, color: theme.text, letterSpacing: 2 },
  profileMeta: { color: theme.textMuted, fontSize: 13, marginBottom: 12 },
  profileBio: {
    color: 'rgba(255,245,235,0.5)', fontSize: 13, fontStyle: 'italic',
    marginBottom: 20, lineHeight: 1.7,
    borderLeft: '2px solid rgba(232,135,42,0.3)', paddingLeft: 14, textAlign: 'left',
  },
  cardLiked:  { transform: 'translateX(130px) rotate(15deg)', opacity: 0 },
  cardPassed: { transform: 'translateX(-130px) rotate(-15deg)', opacity: 0 },
  interestRow: { display: 'flex', flexWrap: 'wrap', gap: 7, justifyContent: 'center', marginBottom: 28 },
  interestTag: {
    background: 'rgba(232,135,42,0.1)', border: '1px solid rgba(232,135,42,0.2)',
    borderRadius: 20, padding: '5px 14px', fontSize: 11,
    color: theme.textMuted, fontFamily: RC, letterSpacing: 1, fontWeight: 600, textTransform: 'uppercase',
  },
  actionRow: { display: 'flex', gap: 16, justifyContent: 'center' },
  passBtn: {
    padding: '13px 36px', background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(232,135,42,0.15)', color: theme.textMuted,
    borderRadius: 50, cursor: 'pointer', fontSize: 13, fontWeight: 700,
    fontFamily: RC, letterSpacing: 1.5, textTransform: 'uppercase', transition: 'all 0.2s',
  },
  likeBtn: {
    padding: '13px 36px', background: theme.gradient, color: '#fff',
    border: 'none', borderRadius: 50, cursor: 'pointer', fontSize: 13,
    fontWeight: 800, fontFamily: RC, letterSpacing: 1.5, textTransform: 'uppercase',
    boxShadow: '0 4px 20px rgba(232,135,42,0.3)', transition: 'all 0.2s',
  },
  cardCounter: { marginTop: 22, color: theme.textDim, fontSize: 11, fontFamily: RC, letterSpacing: 3, textTransform: 'uppercase' },

  // ── Matches ───────────────────────────────────────────────────────────────
  matchGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 },
  matchCard: {
    background: 'rgba(232,135,42,0.07)', backdropFilter: 'blur(28px)',
    border: '1px solid rgba(232,135,42,0.15)',
    borderRadius: 20, padding: 24, textAlign: 'center',
    transition: 'all 0.2s', position: 'relative', overflow: 'hidden',
  },
  matchAvatar: {
    width: 64, height: 64, borderRadius: '50%', background: theme.gradient, color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 26, fontWeight: 800, margin: '0 auto 12px', fontFamily: RC,
    boxShadow: '0 4px 16px rgba(232,135,42,0.3)',
  },
  matchAlias: { fontWeight: 700, fontSize: 15, marginBottom: 4, fontFamily: mono, color: theme.text, letterSpacing: 1 },
  matchMeta: { color: theme.textMuted, fontSize: 12, marginBottom: 12 },

  // ── Chat ──────────────────────────────────────────────────────────────────
  chatLayout: { display: 'flex', height: 'calc(100vh - 62px)' },
  chatList: {
    width: 260, background: 'rgba(12,5,0,0.5)', backdropFilter: 'blur(28px)',
    borderRight: '1px solid rgba(232,135,42,0.1)',
    overflowY: 'auto', flexShrink: 0,
  },
  chatListTitle: {
    padding: '20px 20px 14px', fontWeight: 800, fontSize: 10, letterSpacing: 3,
    textTransform: 'uppercase', color: theme.textMuted, fontFamily: RC,
    borderBottom: '1px solid rgba(232,135,42,0.08)',
  },
  chatListItem: {
    display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px',
    cursor: 'pointer', borderBottom: '1px solid rgba(232,135,42,0.05)',
    position: 'relative', transition: 'background 0.15s',
  },
  chatListItemActive: { background: theme.neonDim, boxShadow: `inset 2px 0 0 ${theme.neon}` },
  chatListAvatar: {
    width: 42, height: 42, borderRadius: '50%', background: theme.gradient, color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 17, fontWeight: 800, flexShrink: 0, fontFamily: RC,
  },
  chatListName: { fontWeight: 700, fontSize: 13, color: theme.text, fontFamily: mono, letterSpacing: 0.5 },
  chatListPreview: { color: theme.textMuted, fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 2 },
  onlineDot: { width: 7, height: 7, borderRadius: '50%', background: theme.success, position: 'absolute', right: 18, top: 18 },
  chatWindow: { flex: 1, display: 'flex', flexDirection: 'column' },
  chatHeader: {
    display: 'flex', alignItems: 'center', gap: 14, padding: '14px 24px',
    background: 'rgba(12,5,0,0.6)', backdropFilter: 'blur(28px)',
    borderBottom: '1px solid rgba(232,135,42,0.08)',
    flexShrink: 0, position: 'sticky', top: 0, zIndex: 10,
  },
  chatHeaderAvatar: {
    width: 38, height: 38, borderRadius: '50%', background: theme.gradient, color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 15, fontWeight: 800, fontFamily: RC, flexShrink: 0,
  },
  chatHeaderName: { fontWeight: 700, fontSize: 15, fontFamily: mono, color: theme.text, letterSpacing: 1 },
  chatHeaderStatus: { fontSize: 11, color: theme.textMuted, marginTop: 2 },
  messagesArea: {
    flex: 1, overflowY: 'auto', padding: '24px',
    display: 'flex', flexDirection: 'column', gap: 12,
  },
  msgWrapMe:   { display: 'flex', flexDirection: 'column', alignItems: 'flex-end' },
  msgWrapThem: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
  msgBubbleMe: {
    background: theme.gradient, color: '#fff',
    borderRadius: '20px 20px 4px 20px', padding: '12px 20px',
    maxWidth: 320, fontSize: 14, lineHeight: 1.6, fontWeight: 500,
    boxShadow: '0 4px 16px rgba(232,135,42,0.25)',
  },
  msgBubbleThem: {
    background: 'rgba(232,135,42,0.09)', border: '1px solid rgba(232,135,42,0.15)',
    borderRadius: '20px 20px 20px 4px', padding: '12px 20px',
    maxWidth: 320, fontSize: 14, color: theme.text, lineHeight: 1.6,
  },
  msgTime: { fontSize: 10, color: theme.textDim, marginTop: 4, fontFamily: RC, letterSpacing: 0.5 },
  chatInputRow: {
    display: 'flex', gap: 12, padding: '14px 20px',
    background: 'rgba(12,5,0,0.6)', backdropFilter: 'blur(28px)',
    borderTop: '1px solid rgba(232,135,42,0.08)', flexShrink: 0,
  },
  chatInput: {
    flex: 1, padding: '12px 22px',
    border: '1px solid rgba(232,135,42,0.15)', borderRadius: 50,
    fontSize: 14, fontFamily: RC,
    background: 'rgba(232,135,42,0.07)', color: theme.text,
    outline: 'none',
  },
  sendBtn: {
    padding: '12px 24px', background: theme.gradient, color: '#fff', border: 'none',
    borderRadius: 50, cursor: 'pointer', fontWeight: 800, fontFamily: RC,
    fontSize: 13, letterSpacing: 1.5, textTransform: 'uppercase',
    boxShadow: '0 4px 16px rgba(232,135,42,0.25)', flexShrink: 0,
  },

  // ── Profile & Settings — centered cards ───────────────────────────────────
  profileEditCard: {
    background: 'rgba(232,135,42,0.07)', backdropFilter: 'blur(28px)',
    border: '1px solid rgba(232,135,42,0.15)',
    borderRadius: 20, padding: 'clamp(28px,5vw,44px)',
    width: '100%',
    boxShadow: '0 30px 80px rgba(180,80,0,0.15)',
  },
  profileEditAvatar: {
    width: 86, height: 86, borderRadius: '50%', background: theme.gradient, color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 36, fontWeight: 800, marginBottom: 16, fontFamily: RC,
    boxShadow: '0 8px 32px rgba(232,135,42,0.35)',
  },
  profileEditAlias: { fontSize: 22, fontWeight: 700, marginBottom: 4, fontFamily: mono, color: theme.text, letterSpacing: 1.5 },
  profileEditNote: { color: theme.textMuted, fontSize: 12, marginBottom: 28, lineHeight: 1.6 },
  profileSection: { marginBottom: 20 },
  settingsCard: {
    background: 'rgba(232,135,42,0.07)', backdropFilter: 'blur(28px)',
    border: '1px solid rgba(232,135,42,0.15)',
    borderRadius: 20, padding: 'clamp(28px,5vw,44px)', width: '100%',
    display: 'flex', flexDirection: 'column',
  },
  settingRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '18px 0', borderBottom: '1px solid rgba(232,135,42,0.08)',
  },
  settingLabel: { fontWeight: 700, fontSize: 14, marginBottom: 3, color: theme.text },
  settingDesc: { color: theme.textMuted, fontSize: 12, lineHeight: 1.5 },
  toggleOn: {
    width: 46, height: 26, borderRadius: 13, background: theme.gradient,
    cursor: 'pointer', position: 'relative', flexShrink: 0,
    boxShadow: '0 2px 12px rgba(232,135,42,0.3)',
  },
  toggleOff: {
    width: 46, height: 26, borderRadius: 13,
    background: 'rgba(232,135,42,0.1)', border: '1px solid rgba(232,135,42,0.15)',
    cursor: 'pointer', position: 'relative', flexShrink: 0,
  },
  toggleKnob: {
    width: 20, height: 20, borderRadius: '50%', background: '#fff',
    position: 'absolute', top: 3, boxShadow: '0 2px 6px rgba(0,0,0,0.3)', transition: 'left 0.2s',
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    background: 'rgba(12,5,0,0.75)', backdropFilter: 'blur(28px)',
    borderTop: '1px solid rgba(232,135,42,0.08)',
    padding: '14px 36px', fontSize: 11, color: theme.textMuted,
    display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6,
    fontFamily: RC, letterSpacing: 1, textTransform: 'uppercase',
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
    background: 'rgba(255,245,235,0.7)', borderRadius: 2,
  },
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
    zIndex: 199, backdropFilter: 'blur(4px)',
  },
  drawer: {
    position: 'fixed', top: 0, left: 0, bottom: 0, width: 280,
    zIndex: 200, transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
    background: 'rgba(12,5,0,0.97)', backdropFilter: 'blur(28px)',
    borderRight: '1px solid rgba(232,135,42,0.15)',
    overflowY: 'auto',
  },
  sidebarMobile: {
    padding: '20px 14px 30px', display: 'flex',
    flexDirection: 'column', gap: 2, minHeight: '100%',
  },
  sidebarClose: {
    background: 'none', border: 'none', color: theme.textMuted,
    fontSize: 18, cursor: 'pointer', alignSelf: 'flex-end',
    padding: '4px 8px', marginBottom: 16,
  },
  bottomNav: {
    position: 'fixed', bottom: 0, left: 0, right: 0, height: 64,
    background: 'rgba(12,5,0,0.97)', backdropFilter: 'blur(20px)',
    borderTop: '1px solid rgba(232,135,42,0.1)',
    display: 'flex', alignItems: 'center',
    zIndex: 100,
  },
  bottomNavBtn: {
    background: 'none', border: 'none', cursor: 'pointer',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    padding: '8px 0', fontFamily: RC, flex: 1,
  },
};
