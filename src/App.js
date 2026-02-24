import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './lib/AuthContext';
import { signOut, getUserStats } from './lib/supabase';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import MatchesPage from './pages/MatchesPage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import InfoPage from './pages/InfoPage';
import { styles, theme, mobileStyles as m } from './pages/styles';

const RC = "'Roboto Condensed', sans-serif";
const mono = "'Space Mono', monospace";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return isMobile;
}

// ── Legal Popup ──────────────────────────────────────────────────────────────
function LegalModal({ type, onClose }) {
  if (!type) return null;
  const isPrivacy = type === 'privacy';

  const privacy = {
    title: 'Privacy Policy',
    sections: [
      { heading: 'What We Collect', body: 'We collect your college roll number email address solely to verify you are an IIIT Patna student. We also store your profile preferences (gender, age, interests, bio) and your anonymous alias. We never collect your real name, phone number, or location.' },
      { heading: 'How We Use It', body: 'Your email is used only for authentication. It is never displayed to other users, never sold, and never shared with third parties. Your profile data is used only to show your anonymous profile to potential matches.' },
      { heading: 'Data Storage', body: 'All data is stored securely on Supabase with row-level security policies. Only you can read and edit your own profile. Match and chat data is accessible only to the two matched users.' },
      { heading: 'Cookies & Analytics', body: 'We use no tracking cookies and no third-party analytics. There are no ads, no ad trackers, and no data brokers involved.' },
      { heading: 'Deleting Your Data', body: 'You can permanently delete your account from Settings at any time. This removes your profile, matches, and all messages from our database.' },
      { heading: 'Contact', body: 'For any privacy concerns, reach out to the developer through IIIT Patna student channels.' },
    ],
  };

  const terms = {
    title: 'Terms of Use',
    sections: [
      { heading: 'Eligibility', body: 'CampusAnon is exclusively for current IIIT Patna students. You must have a valid @cse.iiitp.ac.in or @ece.iiitp.ac.in email address to register. Creating fake accounts or sharing access is prohibited.' },
      { heading: 'Acceptable Use', body: 'You agree to use CampusAnon respectfully and not to harass, threaten, or intimidate other users. Sending unsolicited explicit content, hate speech, or spam will result in immediate and permanent account termination.' },
      { heading: 'Anonymity', body: 'You may choose to remain anonymous indefinitely. However, if you share personal identifying information in chat, you do so at your own risk. The platform cannot be responsible for information you voluntarily disclose.' },
      { heading: 'No Guarantees', body: 'CampusAnon is provided as-is. We do not guarantee matches, message delivery, or uptime. The service may be updated, paused, or discontinued at any time.' },
      { heading: 'Reporting', body: 'If you encounter abusive behavior, please report it. Accounts found to be in violation of these terms will be banned without prior notice.' },
      { heading: 'Changes', body: 'These terms may be updated as the platform evolves. Continued use after changes constitutes acceptance.' },
    ],
  };

  const content = isPrivacy ? privacy : terms;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20,
    }} onClick={onClose}>
      <div style={{
        background: 'rgba(5,15,50,0.97)', backdropFilter: 'blur(40px)',
        border: '1px solid rgba(77,159,255,0.2)',
        borderRadius: 20, padding: 'clamp(24px,5vw,40px)',
        maxWidth: 560, width: '100%', maxHeight: '85vh',
        overflowY: 'auto', position: 'relative',
        boxShadow: '0 40px 100px rgba(10,50,150,0.4)',
      }} onClick={e => e.stopPropagation()}>
        {/* Top accent line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(77,159,255,0.6), transparent)', borderRadius: '20px 20px 0 0' }} />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 22 }}>{isPrivacy ? '🔒' : '📋'}</span>
            <h2 style={{ fontFamily: RC, fontWeight: 800, fontSize: 20, color: theme.text, letterSpacing: 2, textTransform: 'uppercase' }}>
              {content.title}
            </h2>
          </div>
          <button onClick={onClose} style={{
            background: 'rgba(77,159,255,0.08)', border: '1px solid rgba(77,159,255,0.15)',
            borderRadius: 8, width: 36, height: 36, cursor: 'pointer',
            color: theme.textMuted, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>✕</button>
        </div>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {content.sections.map((s, i) => (
            <div key={i} style={{ paddingBottom: 20, borderBottom: i < content.sections.length - 1 ? '1px solid rgba(77,159,255,0.07)' : 'none' }}>
              <div style={{ fontFamily: RC, fontWeight: 800, fontSize: 13, color: theme.neon, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>
                {s.heading}
              </div>
              <div style={{ color: theme.textMuted, fontSize: 13, lineHeight: 1.8, fontFamily: RC }}>
                {s.body}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, textAlign: 'center', color: theme.textDim, fontSize: 11, fontFamily: RC, letterSpacing: 1, textTransform: 'uppercase' }}>
          CampusAnon · IIIT Patna · 2026
        </div>
      </div>
    </div>
  );
}

function Header({ profile, currentPage, setCurrentPage, onMenuToggle }) {
  const isMobile = useIsMobile();
  async function handleLogout() { try { await signOut(); } catch(e) {} }

  return (
    <header style={styles.header}>
      {profile && isMobile && (
        <button onClick={onMenuToggle} style={m.hamburger} aria-label="Menu">
          <span style={m.hamburgerLine} />
          <span style={m.hamburgerLine} />
          <span style={m.hamburgerLine} />
        </button>
      )}
      <div style={{ ...styles.headerLogo, gap: 8 }} onClick={() => setCurrentPage('dashboard')}>
        <span style={{ color: theme.neon, fontSize: 18 }}>✦</span>
        <span style={{ letterSpacing: 3 }}>CAMPUS<span style={{ color: theme.neon }}>ANON</span></span>
      </div>
      {profile && !isMobile && (
        <nav style={styles.headerNav}>
          {[
            { id: 'dashboard', label: 'Discover' },
            { id: 'matches',   label: 'Matches'  },
            { id: 'chat',      label: 'Chat'      },
            { id: 'profile',   label: 'Profile'   },
            { id: 'info',      label: 'Info'      },
          ].map(({ id, label }) => (
            <button key={id}
              style={currentPage === id ? { ...styles.navBtn, ...styles.navBtnActive } : styles.navBtn}
              onClick={() => setCurrentPage(id)}>
              {label}
            </button>
          ))}
        </nav>
      )}
      {!profile && !isMobile && (
        <nav style={styles.headerNav}>
          <button style={currentPage === 'info' ? { ...styles.navBtn, ...styles.navBtnActive } : styles.navBtn}
            onClick={() => setCurrentPage('info')}>Info</button>
        </nav>
      )}
      {profile && !isMobile && (
        <div style={styles.headerRight}>
          <span style={styles.aliasTag}>{profile.alias}</span>
          <button style={styles.logoutBtn} onClick={handleLogout}>logout</button>
        </div>
      )}
    </header>
  );
}

function Sidebar({ profile, currentPage, setCurrentPage, isOpen, onClose, stats }) {
  const isMobile = useIsMobile();
  async function handleLogout() { try { await signOut(); } catch(e) {} }
  if (!profile) return null;

  const items = [
    { id: 'dashboard', icon: '✦', label: 'Discover'  },
    { id: 'matches',   icon: '◇', label: 'Matches'   },
    { id: 'chat',      icon: '◈', label: 'Messages'  },
    { id: 'profile',   icon: '◉', label: 'Profile'   },
    { id: 'info',      icon: 'ℹ', label: 'Info'      },
    { id: 'settings',  icon: '⚙', label: 'Settings'  },
  ];

  function navigate(id) { setCurrentPage(id); if (isMobile) onClose(); }

  const inner = (
    <div style={isMobile ? m.sidebarMobile : { padding: '28px 14px', display: 'flex', flexDirection: 'column', gap: 2 }}>
      {isMobile && <button onClick={onClose} style={m.sidebarClose}>✕</button>}
      <div style={styles.sidebarUser}>
        <div style={styles.sidebarAvatar}>{profile.alias?.[0]}</div>
        <div>
          <div style={styles.sidebarAlias}>{profile.alias}</div>
          <div style={styles.sidebarGender}>
            {profile.gender === 'male' ? '♂ male' : profile.gender === 'female' ? '♀ female' : '⚧ non-binary'}
          </div>
        </div>
      </div>
      <hr style={styles.sidebarDivider} />
      {items.map(({ id, icon, label }) => (
        <button key={id}
          style={currentPage === id ? { ...styles.sidebarItem, ...styles.sidebarItemActive } : styles.sidebarItem}
          onClick={() => navigate(id)}>
          <span style={{ color: currentPage === id ? theme.neon : theme.textMuted, fontSize: 14, width: 18, textAlign: 'center' }}>{icon}</span>
          {label}
        </button>
      ))}
      <hr style={styles.sidebarDivider} />
      <div style={styles.sidebarStats}>
        {[
          [stats.likes,   'likes'],
          [stats.matches, 'matches'],
          [stats.chats,   'chats'],
        ].map(([n, l]) => (
          <div key={l} style={styles.statBox}>
            <span style={{ fontSize: 20, fontWeight: 800, color: theme.neon, fontFamily: mono }}>{n}</span>
            <span>{l}</span>
          </div>
        ))}
      </div>
      {isMobile && (
        <>
          <hr style={{ ...styles.sidebarDivider, marginTop: 16 }} />
          <button style={{ ...styles.logoutBtn, width: '100%', textAlign: 'center', padding: '12px' }} onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <>
        {isOpen && <div onClick={onClose} style={m.overlay} />}
        <div style={{ ...m.drawer, transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}>
          {inner}
        </div>
      </>
    );
  }

  return <aside style={styles.sidebar}>{inner}</aside>;
}

function BottomNav({ currentPage, setCurrentPage }) {
  const isMobile = useIsMobile();
  if (!isMobile) return null;
  const items = [
    { id: 'dashboard', icon: '✦', label: 'Discover' },
    { id: 'matches',   icon: '◇', label: 'Matches'  },
    { id: 'chat',      icon: '◈', label: 'Chat'     },
    { id: 'profile',   icon: '◉', label: 'Profile'  },
  ];
  return (
    <nav style={m.bottomNav}>
      {items.map(({ id, icon, label }) => (
        <button key={id} style={m.bottomNavBtn} onClick={() => setCurrentPage(id)}>
          <span style={{ fontSize: 20, color: currentPage === id ? theme.neon : 'rgba(200,220,255,0.3)', display: 'block' }}>{icon}</span>
          <span style={{ fontSize: 10, color: currentPage === id ? theme.neon : 'rgba(200,220,255,0.3)', marginTop: 3, letterSpacing: 0.5, textTransform: 'uppercase', fontFamily: RC }}>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function Footer({ setCurrentPage, onLegal }) {
  const isMobile = useIsMobile();
  if (isMobile) return null;
  return (
    <footer style={styles.footer}>
      <span style={{ color: theme.neon }}>✦</span>
      <span style={{ marginLeft: 8 }}>CampusAnon · Anonymous Connections</span>
      <span style={{ margin: '0 16px', color: 'rgba(255,255,255,0.08)' }}>·</span>
      <span>🔒 Identities Always Protected</span>
      <span style={{ marginLeft: 'auto', display: 'flex', gap: 20, alignItems: 'center' }}>
        <span style={{ ...styles.footerLink, cursor: 'pointer' }} onClick={() => onLegal('privacy')}>Privacy</span>
        <span style={{ ...styles.footerLink, cursor: 'pointer' }} onClick={() => onLegal('terms')}>Terms</span>
        <span style={{ color: theme.textMuted }}>
          Made with <span style={{ color: theme.neon }}>♥</span> for students
        </span>
      </span>
    </footer>
  );
}

function InnerApp() {
  const { profile, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [activeChatPartner, setActiveChatPartner] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [stats, setStats] = useState({ likes: 0, matches: 0, chats: 0 });
  const [legalModal, setLegalModal] = useState(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (profile) getUserStats(profile.id).then(setStats).catch(console.error);
  }, [profile, currentPage]);

  if (loading) return (
    <div style={styles.appWrap}>
      <div style={styles.loadingWrap}>
        <span style={{ color: theme.neon, fontSize: 20 }}>✦</span>
        <span>Initializing...</span>
      </div>
    </div>
  );

  if (!profile) return (
    <div style={styles.appWrap}>
      <Header profile={null} currentPage={currentPage} setCurrentPage={setCurrentPage} onMenuToggle={() => {}} />
      {currentPage === 'info' ? <InfoPage /> : <AuthPage />}
      <Footer setCurrentPage={setCurrentPage} onLegal={setLegalModal} />
      <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />
    </div>
  );

  return (
    <div style={styles.appWrap}>
      <Header profile={profile} currentPage={currentPage} setCurrentPage={setCurrentPage} onMenuToggle={() => setMenuOpen(o => !o)} />
      <div style={{ ...styles.body, paddingBottom: isMobile ? 64 : 0 }}>
        <Sidebar
          profile={profile} currentPage={currentPage}
          setCurrentPage={setCurrentPage} isOpen={menuOpen}
          onClose={() => setMenuOpen(false)} stats={stats}
        />
        <main style={{ ...styles.main, padding: isMobile ? '0' : undefined }}>
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'matches'   && <MatchesPage setCurrentPage={setCurrentPage} setActiveChatPartner={setActiveChatPartner} />}
          {currentPage === 'chat'      && <ChatPage activeChatPartner={activeChatPartner} setActiveChatPartner={setActiveChatPartner} />}
          {currentPage === 'profile'   && <ProfilePage />}
          {currentPage === 'settings'  && <SettingsPage />}
          {currentPage === 'info'      && <InfoPage />}
        </main>
      </div>
      <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <Footer setCurrentPage={setCurrentPage} onLegal={setLegalModal} />
      <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />
    </div>
  );
}

export default function App() {
  return <AuthProvider><InnerApp /></AuthProvider>;
}
