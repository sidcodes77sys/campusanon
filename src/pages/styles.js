// CampusAnon — Aesthetic Violet/Cyan/Pink palette with animations

export const theme = {
  bg:          'transparent',
  accent:      '#7c3aed',   // violet
  accent2:     '#06b6d4',   // cyan
  accent3:     '#f472b6',   // pink
  accent4:     '#34d399',   // mint
  neon:        '#a78bfa',   // soft violet
  neonDim:     'rgba(124,58,237,0.1)',
  neonBorder:  'rgba(124,58,237,0.22)',
  text:        '#f0eeff',
  textMuted:   'rgba(220,215,255,0.5)',
  textDim:     'rgba(220,215,255,0.2)',
  success:     '#34d399',
  error:       '#fb7185',
  gradient:    'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
  gradientPink:'linear-gradient(135deg, #ec4899 0%, #7c3aed 100%)',
  glass:       'rgba(255,255,255,0.04)',
  border:      'rgba(255,255,255,0.08)',
};

const F = "'Outfit', sans-serif";
const M = "'Space Mono', monospace";

// Glass card mixin
const glass = {
  background:          'rgba(10,6,30,0.55)',
  backdropFilter:      'blur(40px)',
  WebkitBackdropFilter:'blur(40px)',
  border:              '1px solid rgba(255,255,255,0.08)',
  boxShadow:           '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
};

export const styles = {
  appWrap: {
    display: 'flex', flexDirection: 'column', minHeight: '100vh',
    fontFamily: F, color: theme.text, background: 'transparent',
  },
  body: { display: 'flex', flex: 1 },
  main: { flex: 1, overflow: 'auto' },
  loadingWrap: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    height: '80vh', gap: 14, flexDirection: 'column',
    color: theme.textMuted, fontFamily: F,
  },

  // ── Header ────────────────────────────────────────────────────────────────
  header: {
    display: 'flex', alignItems: 'center', padding: '0 32px', height: 62,
    ...glass,
    position: 'sticky', top: 0, zIndex: 100,
    borderTop: 'none', borderLeft: 'none', borderRight: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
  },
  headerLogo: {
    fontSize: 19, fontWeight: 800, cursor: 'pointer', marginRight: 'auto',
    fontFamily: F, color: theme.text, letterSpacing: 1,
    display: 'flex', alignItems: 'center', gap: 10,
  },
  headerNav: { display: 'flex', gap: 2 },
  navBtn: {
    background: 'none', border: 'none', borderRadius: 10, padding: '7px 16px',
    cursor: 'pointer', fontSize: 14, color: theme.textMuted,
    fontFamily: F, fontWeight: 600, letterSpacing: 0.3,
    transition: 'all 0.2s',
  },
  navBtnActive: {
    color: theme.text,
    background: 'rgba(124,58,237,0.15)',
    boxShadow: 'inset 0 0 0 1px rgba(124,58,237,0.3)',
  },
  headerRight: { display: 'flex', alignItems: 'center', gap: 12, marginLeft: 20 },
  aliasTag: {
    background: 'rgba(124,58,237,0.12)',
    border: '1px solid rgba(124,58,237,0.3)',
    padding: '5px 16px', borderRadius: 20, fontSize: 12,
    color: theme.neon, fontFamily: M, letterSpacing: 1,
    boxShadow: '0 0 12px rgba(124,58,237,0.2)',
  },
  logoutBtn: {
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10, padding: '6px 16px', cursor: 'pointer',
    fontSize: 13, color: theme.textMuted, fontFamily: F, fontWeight: 600,
  },

  // ── Sidebar ───────────────────────────────────────────────────────────────
  sidebar: {
    width: 220, ...glass,
    borderTop: 'none', borderBottom: 'none', borderLeft: 'none',
    borderRight: '1px solid rgba(255,255,255,0.07)',
    padding: '24px 12px', display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0,
  },
  sidebarUser: {
    display: 'flex', alignItems: 'center', gap: 14, padding: '8px 12px 20px',
  },
  sidebarAvatar: {
    width: 46, height: 46, borderRadius: '50%',
    background: theme.gradient, color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 18, fontWeight: 800, fontFamily: F, flexShrink: 0,
    boxShadow: '0 4px 20px rgba(124,58,237,0.5)',
    animation: 'pulse-glow 3s ease-in-out infinite',
  },
  sidebarAlias: { fontWeight: 700, fontSize: 14, color: theme.text, letterSpacing: 0.3 },
  sidebarGender: { color: theme.textMuted, fontSize: 12, marginTop: 3 },
  sidebarDivider: { border: 'none', borderTop: '1px solid rgba(255,255,255,0.07)', margin: '8px 0' },
  sidebarItem: {
    display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px',
    borderRadius: 12, border: 'none', background: 'none', cursor: 'pointer',
    fontSize: 14, textAlign: 'left', color: theme.textMuted, width: '100%',
    fontFamily: F, fontWeight: 600, transition: 'all 0.18s',
  },
  sidebarItemActive: {
    background: 'rgba(124,58,237,0.15)',
    color: theme.text,
    boxShadow: 'inset 0 0 0 1px rgba(124,58,237,0.25)',
  },
  sidebarStats: { display: 'flex', gap: 6, marginTop: 10 },
  statBox: {
    flex: 1, textAlign: 'center',
    background: 'rgba(124,58,237,0.07)',
    border: '1px solid rgba(124,58,237,0.15)',
    borderRadius: 12, padding: '12px 6px',
    display: 'flex', flexDirection: 'column', gap: 4,
    fontSize: 11, color: theme.textMuted, letterSpacing: 0.5, textTransform: 'uppercase',
  },

  // ── Auth ──────────────────────────────────────────────────────────────────
  authWrap: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flex: 1, padding: 24, minHeight: '85vh',
  },
  authCard: {
    ...glass,
    borderRadius: 28, padding: 'clamp(32px,6vw,52px) clamp(24px,6vw,48px)',
    width: '100%', maxWidth: 440,
    animation: 'fadeUp 0.6s cubic-bezier(0.34,1.2,0.64,1) both',
    position: 'relative', overflow: 'hidden',
  },
  authCardTopLine: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 1,
    background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.8), rgba(6,182,212,0.8), transparent)',
  },
  authTitle: {
    fontSize: 30, fontWeight: 800, textAlign: 'center', marginBottom: 8,
    fontFamily: F, color: theme.text, letterSpacing: -0.5,
  },
  authSubtitle: {
    color: theme.textMuted, textAlign: 'center', marginBottom: 32,
    fontSize: 14, lineHeight: 1.7,
  },
  infoBox: {
    background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)',
    borderRadius: 12, padding: '13px 16px', marginBottom: 18,
    fontSize: 13, color: theme.success, lineHeight: 1.6,
  },
  input: {
    display: 'block', width: '100%', padding: '13px 18px', marginBottom: 14,
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, fontSize: 14,
    boxSizing: 'border-box', fontFamily: F,
    background: 'rgba(255,255,255,0.05)', color: theme.text,
    outline: 'none', transition: 'all 0.2s',
  },
  label: {
    display: 'block', fontWeight: 600, fontSize: 11, marginBottom: 7,
    color: theme.textMuted, letterSpacing: 1, textTransform: 'uppercase',
  },
  genderRow: { display: 'flex', gap: 8, marginBottom: 18 },
  genderBtn: {
    flex: 1, padding: '11px 4px', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 12, background: 'rgba(255,255,255,0.04)', cursor: 'pointer',
    fontSize: 13, fontFamily: F, color: theme.textMuted, transition: 'all 0.2s', fontWeight: 600,
  },
  genderBtnActive: {
    background: 'rgba(124,58,237,0.2)', color: theme.neon,
    border: '1px solid rgba(124,58,237,0.4)',
    boxShadow: '0 0 12px rgba(124,58,237,0.2)',
  },
  primaryBtn: {
    display: 'block', width: '100%', padding: '14px',
    background: theme.gradient, color: '#fff', border: 'none',
    borderRadius: 14, cursor: 'pointer', fontSize: 15, fontWeight: 700,
    marginTop: 10, textAlign: 'center', fontFamily: F, letterSpacing: 0.3,
    boxShadow: '0 4px 24px rgba(124,58,237,0.45)',
    position: 'relative', overflow: 'hidden',
  },
  authSwitch: { textAlign: 'center', marginTop: 22, fontSize: 13, color: theme.textMuted },
  authLink: {
    color: theme.neon, fontWeight: 700, cursor: 'pointer',
    background: 'linear-gradient(135deg, #a78bfa, #06b6d4)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
  },
  error: { color: theme.error, fontSize: 12, marginBottom: 10 },

  // ── Pages ─────────────────────────────────────────────────────────────────
  pageWrap: {
    padding: 'clamp(28px,5vw,52px) clamp(16px,5vw,52px)',
    maxWidth: 760, margin: '0 auto', width: '100%',
    animation: 'fadeIn 0.4s ease both',
  },
  pageTitle: {
    fontSize: 32, fontWeight: 800, marginBottom: 8, fontFamily: F,
    color: theme.text, letterSpacing: -0.5,
    display: 'flex', alignItems: 'center', gap: 12,
  },
  pageSubtitle: { color: theme.textMuted, marginBottom: 36, fontSize: 14, lineHeight: 1.6 },
  matchBanner: {
    background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.2))',
    border: '1px solid rgba(124,58,237,0.4)',
    color: theme.text, padding: '16px 24px', borderRadius: 16, marginBottom: 28,
    textAlign: 'center', fontWeight: 800, fontSize: 16, fontFamily: F,
    boxShadow: '0 0 40px rgba(124,58,237,0.3)',
    animation: 'pulse-glow 1.5s ease-in-out 3',
  },

  // ── Discover ──────────────────────────────────────────────────────────────
  profileCard: {
    ...glass,
    borderRadius: 28, padding: '44px 40px', width: '100%', maxWidth: 400,
    textAlign: 'center', position: 'relative', overflow: 'hidden',
    transition: 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.45s ease',
    animation: 'fadeUp 0.5s cubic-bezier(0.34,1.2,0.64,1) both',
  },
  profileAvatar: {
    width: 96, height: 96, borderRadius: '50%',
    background: theme.gradient, color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 40, fontWeight: 800, margin: '0 auto 18px', fontFamily: F,
    boxShadow: '0 8px 32px rgba(124,58,237,0.5)',
    animation: 'float 4s ease-in-out infinite',
  },
  profileAlias: { fontSize: 22, fontWeight: 700, marginBottom: 6, color: theme.text, letterSpacing: -0.3 },
  profileMeta: { color: theme.textMuted, fontSize: 13, marginBottom: 14 },
  profileBio: {
    color: 'rgba(220,215,255,0.55)', fontSize: 13, fontStyle: 'italic',
    marginBottom: 20, lineHeight: 1.7,
    borderLeft: '2px solid rgba(124,58,237,0.4)', paddingLeft: 14, textAlign: 'left',
  },
  cardLiked:  { transform: 'translateX(140px) rotate(15deg)', opacity: 0 },
  cardPassed: { transform: 'translateX(-140px) rotate(-15deg)', opacity: 0 },
  interestRow: { display: 'flex', flexWrap: 'wrap', gap: 7, justifyContent: 'center', marginBottom: 28 },
  interestTag: {
    background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)',
    borderRadius: 20, padding: '5px 14px', fontSize: 12,
    color: theme.neon, fontWeight: 600, letterSpacing: 0.3,
  },
  actionRow: { display: 'flex', gap: 14, justifyContent: 'center' },
  passBtn: {
    padding: '13px 36px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.12)', color: theme.textMuted,
    borderRadius: 50, cursor: 'pointer', fontSize: 14, fontWeight: 700,
    fontFamily: F, transition: 'all 0.2s',
  },
  likeBtn: {
    padding: '13px 36px', background: theme.gradientPink, color: '#fff',
    border: 'none', borderRadius: 50, cursor: 'pointer', fontSize: 14,
    fontWeight: 700, fontFamily: F,
    boxShadow: '0 4px 24px rgba(236,72,153,0.4)',
  },
  cardCounter: { marginTop: 20, color: theme.textDim, fontSize: 12, letterSpacing: 1 },

  // ── Matches ───────────────────────────────────────────────────────────────
  matchGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 },
  matchCard: {
    ...glass, borderRadius: 20, padding: 24, textAlign: 'center',
    transition: 'all 0.25s cubic-bezier(0.34,1.2,0.64,1)',
    position: 'relative', overflow: 'hidden', cursor: 'pointer',
  },
  matchAvatar: {
    width: 64, height: 64, borderRadius: '50%', background: theme.gradient, color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 26, fontWeight: 800, margin: '0 auto 12px', fontFamily: F,
    boxShadow: '0 4px 20px rgba(124,58,237,0.4)',
  },
  matchAlias: { fontWeight: 700, fontSize: 15, marginBottom: 4, color: theme.text },
  matchMeta: { color: theme.textMuted, fontSize: 12, marginBottom: 12 },

  // ── Chat ──────────────────────────────────────────────────────────────────
  chatLayout: { display: 'flex', height: 'calc(100vh - 62px)', overflow: 'hidden' },
  chatList: {
    width: 260, ...glass,
    borderTop: 'none', borderBottom: 'none', borderLeft: 'none',
    borderRight: '1px solid rgba(255,255,255,0.07)',
    overflowY: 'auto', flexShrink: 0,
  },
  chatListTitle: {
    padding: '20px 20px 14px', fontWeight: 700, fontSize: 12, letterSpacing: 2,
    textTransform: 'uppercase', color: theme.textMuted,
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  chatListItem: {
    display: 'flex', alignItems: 'center', gap: 14, padding: '13px 18px',
    cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.04)',
    position: 'relative', transition: 'background 0.15s',
  },
  chatListItemActive: {
    background: 'rgba(124,58,237,0.12)',
    boxShadow: 'inset 2px 0 0 #7c3aed',
  },
  chatListAvatar: {
    width: 40, height: 40, borderRadius: '50%', background: theme.gradient, color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 16, fontWeight: 800, flexShrink: 0,
    boxShadow: '0 2px 12px rgba(124,58,237,0.35)',
  },
  chatListName: { fontWeight: 700, fontSize: 14, color: theme.text },
  chatListPreview: { color: theme.textMuted, fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 2 },
  onlineDot: { width: 8, height: 8, borderRadius: '50%', background: theme.success, position: 'absolute', right: 16, top: 14, boxShadow: '0 0 6px rgba(52,211,153,0.7)' },
  chatWindow: { flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  chatHeader: {
    display: 'flex', alignItems: 'center', gap: 14, padding: '13px 24px',
    ...glass,
    borderTop: 'none', borderLeft: 'none', borderRight: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    flexShrink: 0, position: 'sticky', top: 0, zIndex: 10,
  },
  chatHeaderAvatar: {
    width: 38, height: 38, borderRadius: '50%', background: theme.gradient, color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 15, fontWeight: 800, flexShrink: 0,
    boxShadow: '0 2px 12px rgba(124,58,237,0.35)',
  },
  chatHeaderName: { fontWeight: 700, fontSize: 15, color: theme.text },
  chatHeaderStatus: { fontSize: 12, color: theme.textMuted, marginTop: 2 },
  messagesArea: {
    flex: 1, minHeight: 0, overflowY: 'auto', padding: '24px',
    display: 'flex', flexDirection: 'column', gap: 12,
    WebkitOverflowScrolling: 'touch',
  },
  msgWrapMe:   { display: 'flex', flexDirection: 'column', alignItems: 'flex-end' },
  msgWrapThem: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
  msgBubbleMe: {
    background: theme.gradient, color: '#fff',
    borderRadius: '20px 20px 4px 20px', padding: '12px 18px',
    maxWidth: 320, fontSize: 14, lineHeight: 1.6, fontWeight: 500,
    boxShadow: '0 4px 16px rgba(124,58,237,0.35)',
    animation: 'fadeUp 0.25s cubic-bezier(0.34,1.2,0.64,1) both',
  },
  msgBubbleThem: {
    ...glass,
    borderRadius: '20px 20px 20px 4px', padding: '12px 18px',
    maxWidth: 320, fontSize: 14, color: theme.text, lineHeight: 1.6,
    animation: 'fadeUp 0.25s cubic-bezier(0.34,1.2,0.64,1) both',
  },
  msgTime: { fontSize: 10, color: theme.textDim, marginTop: 4, letterSpacing: 0.5 },
  chatInputRow: {
    display: 'flex', gap: 10, padding: '14px 18px',
    ...glass,
    borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: 'none', borderLeft: 'none', borderRight: 'none',
    flexShrink: 0,
  },
  chatInput: {
    flex: 1, padding: '12px 20px',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 50,
    fontSize: 14, fontFamily: F,
    background: 'rgba(255,255,255,0.05)', color: theme.text,
    outline: 'none', transition: 'all 0.2s',
  },
  sendBtn: {
    padding: '12px 22px', background: theme.gradient, color: '#fff', border: 'none',
    borderRadius: 50, cursor: 'pointer', fontWeight: 700, fontFamily: F,
    fontSize: 14, boxShadow: '0 4px 16px rgba(124,58,237,0.4)', flexShrink: 0,
  },

  // ── Profile & Settings ────────────────────────────────────────────────────
  profileEditCard: {
    ...glass, borderRadius: 24,
    padding: 'clamp(24px,5vw,40px)', width: '100%', maxWidth: 500,
    animation: 'fadeUp 0.5s cubic-bezier(0.34,1.2,0.64,1) both',
  },
  profileEditAvatar: {
    width: 80, height: 80, borderRadius: '50%', background: theme.gradient, color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 32, fontWeight: 800, fontFamily: F, flexShrink: 0,
    boxShadow: '0 8px 28px rgba(124,58,237,0.5)',
    animation: 'float 4s ease-in-out infinite',
  },
  profileEditAlias: { fontSize: 20, fontWeight: 700, marginBottom: 4, color: theme.text },
  profileEditNote: { color: theme.textMuted, fontSize: 12, lineHeight: 1.6 },
  profileSection: { marginBottom: 18 },
  settingsCard: {
    ...glass, borderRadius: 24,
    padding: 'clamp(24px,5vw,40px)', width: '100%',
    display: 'flex', flexDirection: 'column',
    animation: 'fadeUp 0.5s cubic-bezier(0.34,1.2,0.64,1) both',
  },
  settingRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '18px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  settingLabel: { fontWeight: 700, fontSize: 14, marginBottom: 3, color: theme.text },
  settingDesc: { color: theme.textMuted, fontSize: 12, lineHeight: 1.5 },
  toggleOn: {
    width: 48, height: 26, borderRadius: 13,
    background: theme.gradient,
    cursor: 'pointer', position: 'relative', flexShrink: 0,
    boxShadow: '0 2px 12px rgba(124,58,237,0.45)',
    transition: 'all 0.2s',
  },
  toggleOff: {
    width: 48, height: 26, borderRadius: 13,
    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
    cursor: 'pointer', position: 'relative', flexShrink: 0,
    transition: 'all 0.2s',
  },
  toggleKnob: {
    width: 20, height: 20, borderRadius: '50%', background: '#fff',
    position: 'absolute', top: 3,
    boxShadow: '0 2px 6px rgba(0,0,0,0.4)', transition: 'left 0.2s',
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    ...glass,
    borderTop: '1px solid rgba(255,255,255,0.07)',
    borderBottom: 'none', borderLeft: 'none', borderRight: 'none',
    padding: '14px 36px', fontSize: 12, color: theme.textMuted,
    display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6,
    fontFamily: F,
  },
  footerLink: { color: theme.textMuted, textDecoration: 'none', cursor: 'pointer' },
};

export const mobileStyles = {
  hamburger: {
    background: 'none', border: 'none', cursor: 'pointer',
    padding: '8px', marginRight: 12, display: 'flex',
    flexDirection: 'column', gap: 5, flexShrink: 0,
  },
  hamburgerLine: {
    display: 'block', width: 22, height: 2,
    background: 'rgba(220,215,255,0.7)', borderRadius: 2,
  },
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
    zIndex: 199, backdropFilter: 'blur(8px)',
  },
  drawer: {
    position: 'fixed', top: 0, left: 0, bottom: 0, width: 270,
    zIndex: 200, transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
    background: 'rgba(6,4,20,0.97)', backdropFilter: 'blur(40px)',
    borderRight: '1px solid rgba(124,58,237,0.2)',
    overflowY: 'auto',
  },
  sidebarMobile: {
    padding: '20px 12px 30px', display: 'flex',
    flexDirection: 'column', gap: 2, minHeight: '100%',
  },
  sidebarClose: {
    background: 'none', border: 'none', color: theme.textMuted,
    fontSize: 18, cursor: 'pointer', alignSelf: 'flex-end',
    padding: '4px 8px', marginBottom: 14,
  },
  bottomNav: {
    position: 'fixed', bottom: 0, left: 0, right: 0, height: 64,
    background: 'rgba(6,4,20,0.97)', backdropFilter: 'blur(32px)',
    borderTop: '1px solid rgba(124,58,237,0.2)',
    display: 'flex', alignItems: 'center',
    zIndex: 100,
  },
  bottomNavBtn: {
    background: 'none', border: 'none', cursor: 'pointer',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    padding: '8px 0', fontFamily: "'Outfit',sans-serif", flex: 1,
  },
};
