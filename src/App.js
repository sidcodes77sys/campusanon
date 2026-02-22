import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './lib/AuthContext';
import { signOut } from './lib/supabase';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import MatchesPage from './pages/MatchesPage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import { styles, theme, mobileStyles as m } from './pages/styles';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return isMobile;
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
          ].map(({ id, label }) => (
            <button key={id}
              style={currentPage === id ? { ...styles.navBtn, ...styles.navBtnActive } : styles.navBtn}
              onClick={() => setCurrentPage(id)}>
              {label}
            </button>
          ))}
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

function Sidebar({ profile, currentPage, setCurrentPage, isOpen, onClose }) {
  const isMobile = useIsMobile();
  async function handleLogout() { try { await signOut(); } catch(e) {} }
  if (!profile) return null;

  const items = [
    { id: 'dashboard', icon: '✦', label: 'Discover'  },
    { id: 'matches',   icon: '◇', label: 'Matches'   },
    { id: 'chat',      icon: '◈', label: 'Messages'  },
    { id: 'profile',   icon: '◉', label: 'Profile'   },
    { id: 'settings',  icon: '⚙', label: 'Settings'  },
  ];

  function navigate(id) { setCurrentPage(id); if (isMobile) onClose(); }

  const inner = (
    <div style={isMobile ? m.sidebarMobile : { padding: '28px 14px', display: 'flex', flexDirection: 'column', gap: 2 }}>
      {isMobile && (
        <button onClick={onClose} style={m.sidebarClose}>✕</button>
      )}
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
        {[['0','likes'],['0','matches'],['0','chats']].map(([n,l]) => (
          <div key={l} style={styles.statBox}>
            <span style={{ fontSize: 20, fontWeight: 800, color: theme.neon, fontFamily: "'Space Mono',monospace" }}>{n}</span>
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
          <span style={{ fontSize: 20, color: currentPage === id ? theme.neon : 'rgba(200,200,200,0.4)', display: 'block' }}>{icon}</span>
          <span style={{ fontSize: 10, color: currentPage === id ? theme.neon : 'rgba(200,200,200,0.4)', marginTop: 3, letterSpacing: 0.5, textTransform: 'uppercase', fontFamily: "'Roboto Condensed',sans-serif" }}>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function Footer() {
  const isMobile = useIsMobile();
  if (isMobile) return null;
  return (
    <footer style={styles.footer}>
      <span style={{ color: theme.neon }}>✦</span>
      <span style={{ marginLeft: 8 }}>CampusAnon · Anonymous Connections</span>
      <span style={{ margin: '0 16px', color: 'rgba(255,255,255,0.08)' }}>·</span>
      <span>🔒 Identities Always Protected</span>
      <span style={{ marginLeft: 'auto', display: 'flex', gap: 20, alignItems: 'center' }}>
        <a href="#" style={styles.footerLink}>Privacy</a>
        <a href="#" style={styles.footerLink}>Terms</a>
        <span style={{ color: theme.textMuted }}>Made with <span style={{ color: theme.neon }}>♥</span> by Siddhant</span>
      </span>
    </footer>
  );
}

function InnerApp() {
  const { profile, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [activeChatPartner, setActiveChatPartner] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

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
      <AuthPage />
      <Footer />
    </div>
  );

  return (
    <div style={styles.appWrap}>
      <Header profile={profile} currentPage={currentPage} setCurrentPage={setCurrentPage} onMenuToggle={() => setMenuOpen(o => !o)} />
      <div style={{ ...styles.body, paddingBottom: isMobile ? 64 : 0 }}>
        <Sidebar profile={profile} currentPage={currentPage} setCurrentPage={setCurrentPage} isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <main style={{ ...styles.main, padding: isMobile ? '0' : undefined }}>
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'matches'   && <MatchesPage setCurrentPage={setCurrentPage} setActiveChatPartner={setActiveChatPartner} />}
          {currentPage === 'chat'      && <ChatPage activeChatPartner={activeChatPartner} setActiveChatPartner={setActiveChatPartner} />}
          {currentPage === 'profile'   && <ProfilePage />}
          {currentPage === 'settings'  && <SettingsPage />}
        </main>
      </div>
      <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <Footer />
    </div>
  );
}

export default function App() {
  return <AuthProvider><InnerApp /></AuthProvider>;
}
