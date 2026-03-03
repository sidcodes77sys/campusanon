// CampusAnon — Apple-inspired minimal aesthetic

export const theme = {
  bg:              '#000000',
  surface:         '#1c1c1e',
  surfaceElevated: '#2c2c2e',
  accent:          '#0a84ff',
  accentHover:     '#409cff',
  accentSubtle:    'rgba(10,132,255,0.08)',
  accentBorder:    'rgba(10,132,255,0.15)',
  // backward-compatible keys
  neon:            '#0a84ff',
  neonDim:         'rgba(10,132,255,0.06)',
  neonBorder:      'rgba(10,132,255,0.12)',
  text:            '#f5f5f7',
  textMuted:       'rgba(245,245,247,0.6)',
  textDim:         'rgba(245,245,247,0.3)',
  success:         '#30d158',
  error:           '#ff453a',
  gradient:        'linear-gradient(135deg, #0a84ff 0%, #5e5ce6 100%)',
  gradientPink:    'linear-gradient(135deg, #ff375f 0%, #ff6482 100%)',
  glass:           'rgba(28,28,30,0.6)',
  border:          'rgba(255,255,255,0.08)',
};

const F = "-apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Display', sans-serif";
const M = "'SF Mono', 'Space Mono', monospace";

const glass = {
  background:           'rgba(28,28,30,0.6)',
  backdropFilter:       'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border:               '1px solid rgba(255,255,255,0.06)',
};

export const styles = {
  appWrap: {
    display: 'flex', flexDirection: 'column', height: '100vh',
    fontFamily: F, color: theme.text, background: 'transparent',
    overflow: 'hidden',
  },
  body: { display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' },
  main: { flex: 1, minHeight: 0, overflow: 'auto', display: 'flex', flexDirection: 'column' },
  loadingWrap: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    height: '80vh', gap: 12, flexDirection: 'column',
    color: theme.textMuted, fontFamily: F, fontSize: 14,
    animation: 'fadeIn 0.4s ease both',
  },

  // ── Header ────────────────────────────────────────────────────────────────
  header: {
    display: 'flex', alignItems: 'center', padding: '0 28px', height: 48,
    background: 'rgba(0,0,0,0.7)',
    backdropFilter: 'saturate(180%) blur(20px)',
    WebkitBackdropFilter: 'saturate(180%) blur(20px)',
    borderBottom: '0.5px solid rgba(255,255,255,0.08)',
    position: 'sticky', top: 0, zIndex: 100,
  },
  headerLogo: {
    fontSize: 16, fontWeight: 600, cursor: 'pointer', marginRight: 'auto',
    fontFamily: F, color: theme.text, letterSpacing: 0.3,
    display: 'flex', alignItems: 'center', gap: 8,
    transition: 'opacity 0.2s cubic-bezier(0.25,0.1,0.25,1)',
  },
  headerNav: { display: 'flex', gap: 0 },
  navBtn: {
    background: 'none', border: 'none', borderRadius: 6, padding: '6px 14px',
    cursor: 'pointer', fontSize: 14, color: theme.textMuted,
    fontFamily: F, fontWeight: 400, letterSpacing: 0,
    transition: 'all 0.2s cubic-bezier(0.25,0.1,0.25,1)',
  },
  navBtnActive: {
    color: theme.text,
    fontWeight: 600,
  },
  headerRight: { display: 'flex', alignItems: 'center', gap: 10, marginLeft: 16 },
  aliasTag: {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.08)',
    padding: '4px 12px', borderRadius: 20, fontSize: 12,
    color: theme.textMuted, fontFamily: M, letterSpacing: 0.5,
  },
  logoutBtn: {
    background: 'none', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8, padding: '5px 14px', cursor: 'pointer',
    fontSize: 13, color: theme.textMuted, fontFamily: F, fontWeight: 400,
    transition: 'all 0.2s cubic-bezier(0.25,0.1,0.25,1)',
  },

  // ── Sidebar ───────────────────────────────────────────────────────────────
  sidebar: {
    width: 240, background: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
    borderRight: '0.5px solid rgba(255,255,255,0.06)',
    padding: '20px 10px', display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0,
  },
  sidebarUser: {
    display: 'flex', alignItems: 'center', gap: 12, padding: '6px 10px 16px',
  },
  sidebarAvatar: {
    width: 42, height: 42, borderRadius: '50%',
    background: '#2c2c2e', color: theme.text,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 17, fontWeight: 600, fontFamily: F, flexShrink: 0,
  },
  sidebarAlias: { fontWeight: 600, fontSize: 14, color: theme.text, letterSpacing: 0 },
  sidebarGender: { color: theme.textMuted, fontSize: 12, marginTop: 2 },
  sidebarDivider: {
    border: 'none', margin: '6px 0',
    borderTop: '0.5px solid rgba(255,255,255,0.06)',
    height: 0,
  },
  sidebarItem: {
    display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px',
    borderRadius: 8, border: 'none', background: 'none', cursor: 'pointer',
    fontSize: 14, textAlign: 'left', color: theme.textMuted, width: '100%',
    fontFamily: F, fontWeight: 400, transition: 'all 0.2s cubic-bezier(0.25,0.1,0.25,1)',
  },
  sidebarItemActive: {
    background: 'rgba(255,255,255,0.06)',
    color: theme.text,
    fontWeight: 500,
  },
  sidebarStats: { display: 'flex', gap: 0, marginTop: 12, padding: '0 2px' },
  statBox: {
    flex: 1, textAlign: 'center',
    padding: '10px 4px',
    display: 'flex', flexDirection: 'column', gap: 3,
    fontSize: 11, color: theme.textMuted, letterSpacing: 0.3,
  },

  // ── Auth ──────────────────────────────────────────────────────────────────
  authWrap: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flex: 1, padding: 24, minHeight: '85vh',
  },
  authCard: {
    background: '#1c1c1e',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 16, padding: 'clamp(32px,6vw,48px) clamp(24px,6vw,44px)',
    width: '100%', maxWidth: 440,
    animation: 'fadeUp 0.4s cubic-bezier(0.25,0.1,0.25,1) both',
    position: 'relative', overflow: 'hidden',
  },
  authCardTopLine: { display: 'none' },
  authTitle: {
    fontSize: 32, fontWeight: 300, textAlign: 'center', marginBottom: 8,
    fontFamily: F, color: theme.text, letterSpacing: -0.5,
  },
  authSubtitle: {
    color: theme.textMuted, textAlign: 'center', marginBottom: 32,
    fontSize: 14, lineHeight: 1.7,
  },
  infoBox: {
    background: 'rgba(48,209,88,0.08)', border: '1px solid rgba(48,209,88,0.2)',
    borderRadius: 10, padding: '12px 16px', marginBottom: 16,
    fontSize: 13, color: theme.success, lineHeight: 1.6,
  },
  input: {
    display: 'block', width: '100%', padding: '13px 16px', marginBottom: 14,
    border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, fontSize: 14,
    boxSizing: 'border-box', fontFamily: F, height: 48,
    background: 'rgba(255,255,255,0.05)', color: theme.text,
    outline: 'none', transition: 'all 0.2s cubic-bezier(0.25,0.1,0.25,1)',
  },
  label: {
    display: 'block', fontWeight: 500, fontSize: 12, marginBottom: 6,
    color: theme.textMuted, letterSpacing: 0.3,
  },
  genderRow: { display: 'flex', gap: 8, marginBottom: 16 },
  genderBtn: {
    flex: 1, padding: '10px 4px', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 10, background: 'rgba(255,255,255,0.03)', cursor: 'pointer',
    fontSize: 13, fontFamily: F, color: theme.textMuted,
    transition: 'all 0.2s cubic-bezier(0.25,0.1,0.25,1)', fontWeight: 400,
  },
  genderBtnActive: {
    background: 'rgba(10,132,255,0.08)', color: theme.text,
    border: '1px solid rgba(10,132,255,0.25)',
  },
  primaryBtn: {
    display: 'block', width: '100%', padding: '14px',
    background: '#0a84ff', color: '#fff', border: 'none',
    borderRadius: 10, cursor: 'pointer', fontSize: 15, fontWeight: 600,
    marginTop: 10, textAlign: 'center', fontFamily: F, letterSpacing: 0,
    position: 'relative', overflow: 'hidden',
    transition: 'all 0.2s cubic-bezier(0.25,0.1,0.25,1)',
  },
  authSwitch: { textAlign: 'center', marginTop: 20, fontSize: 13, color: theme.textMuted },
  authLink: {
    color: '#0a84ff', fontWeight: 500, cursor: 'pointer',
  },
  error: { color: theme.error, fontSize: 12, marginBottom: 10 },

  // ── Pages ─────────────────────────────────────────────────────────────────
  pageWrap: {
    padding: 'clamp(24px,4vw,48px) clamp(16px,4vw,48px)',
    maxWidth: 760, margin: '0 auto', width: '100%',
    animation: 'fadeIn 0.3s ease both',
  },
  pageTitle: {
    fontSize: 28, fontWeight: 300, marginBottom: 8, fontFamily: F,
    color: theme.text,
    display: 'flex', alignItems: 'center', gap: 10,
    letterSpacing: -0.5,
  },
  pageSubtitle: { color: theme.textMuted, marginBottom: 32, fontSize: 14, lineHeight: 1.6 },
  matchBanner: {
    background: 'rgba(10,132,255,0.1)',
    border: '1px solid rgba(10,132,255,0.2)',
    color: theme.text, padding: '14px 22px', borderRadius: 12, marginBottom: 24,
    textAlign: 'center', fontWeight: 500, fontSize: 16, fontFamily: F,
    animation: 'slideDown 0.35s cubic-bezier(0.25,0.1,0.25,1) both',
  },

  // ── Discover ──────────────────────────────────────────────────────────────
  profileCard: {
    background: '#1c1c1e',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 16, padding: '40px 36px', width: '100%', maxWidth: 400,
    textAlign: 'center', position: 'relative', overflow: 'hidden',
    transition: 'transform 0.4s cubic-bezier(0.25,0.1,0.25,1), opacity 0.4s ease',
    animation: 'fadeUp 0.4s cubic-bezier(0.25,0.1,0.25,1) both',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
  },
  profileAvatar: {
    width: 88, height: 88, borderRadius: '50%',
    background: '#2c2c2e', color: theme.text,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 36, fontWeight: 600, margin: '0 auto 16px', fontFamily: F,
  },
  profileAlias: {
    fontSize: 20, fontWeight: 600, marginBottom: 6, letterSpacing: -0.3,
    color: theme.text,
  },
  profileMeta: { color: theme.textMuted, fontSize: 13, marginBottom: 12 },
  profileBio: {
    color: theme.textMuted, fontSize: 13, fontStyle: 'italic',
    marginBottom: 18, lineHeight: 1.7, textAlign: 'left',
  },
  cardLiked:  { transform: 'translateX(140px) rotate(12deg)', opacity: 0 },
  cardPassed: { transform: 'translateX(-140px) rotate(-12deg)', opacity: 0 },
  interestRow: { display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginBottom: 24 },
  interestTag: {
    background: 'rgba(255,255,255,0.06)',
    borderRadius: 6, padding: '4px 12px', fontSize: 12,
    color: theme.textMuted, fontWeight: 400, letterSpacing: 0,
    transition: 'all 0.2s cubic-bezier(0.25,0.1,0.25,1)',
  },
  interestTagSm: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: 6, padding: '3px 9px', fontSize: 11,
    color: theme.textMuted, fontWeight: 400,
  },
  actionRow: { display: 'flex', gap: 12, justifyContent: 'center' },
  passBtn: {
    padding: '12px 32px',
    background: 'rgba(255,255,255,0.08)',
    border: 'none', color: theme.textMuted,
    borderRadius: 24, cursor: 'pointer', fontSize: 14, fontWeight: 500,
    fontFamily: F, transition: 'all 0.2s cubic-bezier(0.25,0.1,0.25,1)',
  },
  likeBtn: {
    padding: '12px 32px', background: '#ff375f', color: '#fff',
    border: 'none', borderRadius: 24, cursor: 'pointer', fontSize: 14,
    fontWeight: 600, fontFamily: F,
    transition: 'all 0.2s cubic-bezier(0.25,0.1,0.25,1)',
  },
  cardCounter: { marginTop: 16, color: theme.textDim, fontSize: 12, letterSpacing: 0.5 },
  deckProgress: {
    width: '100%', maxWidth: 400, height: 2,
    background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden',
    marginTop: 8,
  },
  deckProgressBar: {
    height: '100%', borderRadius: 2,
    background: '#0a84ff',
    transition: 'width 0.4s ease',
  },

  // ── Matches ───────────────────────────────────────────────────────────────
  matchGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 },
  matchCard: {
    background: '#1c1c1e',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 12, padding: 20, textAlign: 'center',
    transition: 'all 0.2s cubic-bezier(0.25,0.1,0.25,1)',
    position: 'relative', overflow: 'hidden', cursor: 'pointer',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
  },
  matchAvatar: {
    width: 60, height: 60, borderRadius: '50%', background: '#2c2c2e', color: theme.text,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 24, fontWeight: 600, margin: '0 auto 12px', fontFamily: F,
  },
  matchAvatarOnline: {
    width: 60, height: 60, borderRadius: '50%', background: '#2c2c2e', color: theme.text,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 24, fontWeight: 600, margin: '0 auto 12px', fontFamily: F,
    boxShadow: '0 0 0 2.5px #30d158',
  },
  matchAlias: { fontWeight: 600, fontSize: 14, marginBottom: 4, color: theme.text },
  matchMeta: { color: theme.textMuted, fontSize: 12, marginBottom: 10 },

  // ── Chat ──────────────────────────────────────────────────────────────────
  chatLayout: { display: 'flex', flex: 1, height: '100%', overflow: 'hidden', background: 'transparent' },
  chatList: {
    width: '260px', minWidth: '260px',
    background: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
    borderRight: '0.5px solid rgba(255,255,255,0.06)',
    overflowY: 'auto', flexShrink: 0,
  },
  chatListTitle: {
    padding: '18px 18px 12px', fontWeight: 500, fontSize: 12, letterSpacing: 0.5,
    color: theme.textMuted,
    borderBottom: '0.5px solid rgba(255,255,255,0.06)',
  },
  chatListItem: {
    display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
    cursor: 'pointer', borderBottom: '0.5px solid rgba(255,255,255,0.04)',
    position: 'relative', transition: 'background 0.2s',
  },
  chatListItemActive: {
    background: 'rgba(255,255,255,0.06)',
  },
  chatListAvatar: {
    width: 38, height: 38, borderRadius: '50%', background: '#2c2c2e', color: theme.text,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 15, fontWeight: 600, flexShrink: 0,
  },
  chatListName: { fontWeight: 500, fontSize: 14, color: theme.text },
  chatListPreview: { color: theme.textMuted, fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 2 },
  onlineDot: { width: 8, height: 8, borderRadius: '50%', background: '#30d158', position: 'absolute', right: 14, top: 14 },
  chatWindow: { flex: 1, minWidth: 0, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%' },
  chatHeader: {
    display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px',
    background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '0.5px solid rgba(255,255,255,0.06)',
    flexShrink: 0,
  },
  chatHeaderAvatar: {
    width: 36, height: 36, borderRadius: '50%', background: '#2c2c2e', color: theme.text,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 14, fontWeight: 600, flexShrink: 0,
  },
  chatHeaderName: { fontWeight: 600, fontSize: 15, color: theme.text },
  chatHeaderStatus: { fontSize: 12, color: theme.textMuted, marginTop: 1 },
  messagesArea: {
    flex: 1, minHeight: 0, overflowY: 'auto', padding: '20px',
    display: 'flex', flexDirection: 'column', gap: 10,
    WebkitOverflowScrolling: 'touch',
    background: 'rgba(0,0,0,0.2)',
  },
  msgWrapMe:   { display: 'flex', flexDirection: 'column', alignItems: 'flex-end' },
  msgWrapThem: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
  msgBubbleMe: {
    background: '#0a84ff', color: '#fff',
    borderRadius: '18px 18px 4px 18px', padding: '10px 16px',
    maxWidth: 320, fontSize: 14, lineHeight: 1.6, fontWeight: 400,
    animation: 'messageFadeIn 0.25s ease both',
  },
  msgBubbleThem: {
    background: '#2c2c2e',
    border: 'none',
    borderRadius: '18px 18px 18px 4px', padding: '10px 16px',
    maxWidth: 320, fontSize: 14, color: theme.text, lineHeight: 1.6,
    animation: 'messageFadeIn 0.25s ease both',
  },
  msgTime: { fontSize: 10, color: theme.textDim, marginTop: 3, letterSpacing: 0.3 },
  chatInputRow: {
    display: 'flex', gap: 10, padding: '12px 16px', flexShrink: 0,
    background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
    borderTop: '0.5px solid rgba(255,255,255,0.06)',
  },
  chatInput: {
    flex: 1, padding: '10px 18px',
    border: '1px solid rgba(255,255,255,0.08)', borderRadius: 50,
    fontSize: 14, fontFamily: F,
    background: 'rgba(255,255,255,0.06)', color: theme.text,
    outline: 'none', transition: 'all 0.2s cubic-bezier(0.25,0.1,0.25,1)',
  },
  sendBtn: {
    padding: '10px 20px', background: '#0a84ff', color: '#fff', border: 'none',
    borderRadius: 50, cursor: 'pointer', fontWeight: 600, fontFamily: F,
    fontSize: 14, flexShrink: 0,
    transition: 'all 0.2s cubic-bezier(0.25,0.1,0.25,1)',
  },
  typingIndicator: {
    display: 'flex', alignItems: 'center', gap: 4, padding: '8px 14px',
    background: '#2c2c2e', borderRadius: '16px 16px 16px 4px',
    alignSelf: 'flex-start',
    animation: 'messageFadeIn 0.25s ease both',
  },
  typingDot: {
    width: 6, height: 6, borderRadius: '50%',
    background: theme.textMuted,
    animation: 'dotBounce 1.4s ease-in-out infinite',
  },

  // ── Profile & Settings ────────────────────────────────────────────────────
  profileEditCard: {
    background: '#1c1c1e',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 'clamp(24px,4vw,40px)', width: '100%', maxWidth: 500,
    animation: 'fadeUp 0.4s cubic-bezier(0.25,0.1,0.25,1) both',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
  },
  profileEditAvatar: {
    width: 72, height: 72, borderRadius: '50%', background: '#2c2c2e', color: theme.text,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 28, fontWeight: 600, fontFamily: F, flexShrink: 0,
  },
  profileEditAlias: { fontSize: 19, fontWeight: 600, marginBottom: 4, color: theme.text },
  profileEditNote: { color: theme.textMuted, fontSize: 12, lineHeight: 1.6 },
  profileSection: { marginBottom: 16 },
  settingsCard: {
    background: '#1c1c1e',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 'clamp(24px,4vw,40px)', width: '100%',
    display: 'flex', flexDirection: 'column',
    animation: 'fadeUp 0.4s cubic-bezier(0.25,0.1,0.25,1) both',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
  },
  settingRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '16px 0',
    borderBottom: '0.5px solid rgba(255,255,255,0.06)',
  },
  settingLabel: { fontWeight: 500, fontSize: 14, marginBottom: 3, color: theme.text },
  settingDesc: { color: theme.textMuted, fontSize: 12, lineHeight: 1.5 },
  toggleOn: {
    width: 50, height: 28, borderRadius: 14,
    background: '#30d158',
    cursor: 'pointer', position: 'relative', flexShrink: 0,
    transition: 'all 0.2s cubic-bezier(0.25,0.1,0.25,1)',
  },
  toggleOff: {
    width: 50, height: 28, borderRadius: 14,
    background: 'rgba(255,255,255,0.15)',
    cursor: 'pointer', position: 'relative', flexShrink: 0,
    transition: 'all 0.2s cubic-bezier(0.25,0.1,0.25,1)',
  },
  toggleKnob: {
    width: 22, height: 22, borderRadius: '50%', background: '#fff',
    position: 'absolute', top: 3,
    boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
    transition: 'left 0.2s cubic-bezier(0.25,0.1,0.25,1)',
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    borderTop: '0.5px solid rgba(255,255,255,0.06)',
    padding: '12px 28px', fontSize: 12, color: theme.textMuted,
    display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6,
    fontFamily: F, background: 'rgba(0,0,0,0.7)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
  },
  footerLink: { color: theme.textMuted, textDecoration: 'none', cursor: 'pointer', transition: 'color 0.2s' },

  // ── Empty state ───────────────────────────────────────────────────────────
  emptyState: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    textAlign: 'center', gap: 12, paddingTop: 60, color: theme.textMuted,
    fontSize: 14, lineHeight: 1.7,
  },
  emptyIcon: {
    fontSize: 44, lineHeight: 1, opacity: 0.5,
  },
};

export const mobileStyles = {
  hamburger: {
    background: 'none', border: 'none', cursor: 'pointer',
    padding: '8px', marginRight: 10, display: 'flex',
    flexDirection: 'column', gap: 5, flexShrink: 0,
  },
  hamburgerLine: {
    display: 'block', width: 20, height: 1.5,
    background: 'rgba(245,245,247,0.7)', borderRadius: 2,
  },
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
    zIndex: 199, backdropFilter: 'blur(8px)',
  },
  drawer: {
    position: 'fixed', top: 0, left: 0, bottom: 0, width: 260,
    zIndex: 200, transition: 'transform 0.3s cubic-bezier(0.25,0.1,0.25,1)',
    background: 'rgba(10,10,10,0.98)', backdropFilter: 'blur(20px)',
    borderRight: '0.5px solid rgba(255,255,255,0.08)',
    overflowY: 'auto',
  },
  sidebarMobile: {
    padding: '20px 10px 30px', display: 'flex',
    flexDirection: 'column', gap: 2, minHeight: '100%',
  },
  sidebarClose: {
    background: 'none', border: 'none', color: theme.textMuted,
    fontSize: 18, cursor: 'pointer', alignSelf: 'flex-end',
    padding: '4px 8px', marginBottom: 12,
  },
  bottomNav: {
    position: 'fixed', bottom: 0, left: 0, right: 0, height: 64,
    background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)',
    borderTop: '0.5px solid rgba(255,255,255,0.08)',
    display: 'flex', alignItems: 'center',
    zIndex: 100,
  },
  bottomNavBtn: {
    background: 'none', border: 'none', cursor: 'pointer',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    padding: '8px 0', fontFamily: F, flex: 1,
    transition: 'all 0.2s cubic-bezier(0.25,0.1,0.25,1)', position: 'relative',
  },
};
