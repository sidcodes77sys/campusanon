import { useState } from 'react';
import { AuthProvider, useAuth } from './lib/AuthContext';
import { signOut } from './lib/supabase';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import MatchesPage from './pages/MatchesPage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import { styles, theme } from './pages/styles';

function Header({ profile, currentPage, setCurrentPage }) {
  async function handleLogout() {
    try { await signOut(); } catch (e) { console.error(e); }
  }
  return (
    <header style={styles.header}>
      <div style={styles.headerLogo} onClick={() => setCurrentPage('dashboard')}>
        <span style={{ color: theme.neon, fontSize: 18, marginRight: 8 }}>✦</span>
        <span style={{ letterSpacing: 3 }}>CAMPUS<span style={{ color: theme.neon }}>ANON</span></span>
      </div>
      {profile && (
        <nav style={styles.headerNav}>
          {[
            { id: 'dashboard', label: 'Discover' },
            { id: 'matches',   label: 'Matches' },
            { id: 'chat',      label: 'Chat' },
            { id: 'profile',   label: 'Profile' },
          ].map(({ id, label }) => (
            <button key={id}
              style={currentPage === id ? { ...styles.navBtn, ...styles.navBtnActive } : styles.navBtn}
              onClick={() => setCurrentPage(id)}>
              {label}
            </button>
          ))}
        </nav>
      )}
      {profile && (
        <div style={styles.headerRight}>
          <span style={styles.aliasTag}>{profile.alias}</span>
          <button style={styles.logoutBtn} onClick={handleLogout}>logout</button>
        </div>
      )}
    </header>
  );
}

function Sidebar({ profile, currentPage, setCurrentPage }) {
  if (!profile) return null;
  const items = [
    { id: 'dashboard', icon: '✦', label: 'Discover' },
    { id: 'matches',   icon: '◇', label: 'Matches' },
    { id: 'chat',      icon: '◈', label: 'Messages' },
    { id: 'profile',   icon: '◉', label: 'Profile' },
    { id: 'settings',  icon: '⚙', label: 'Settings' },
  ];
  return (
    <aside style={styles.sidebar}>
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
          onClick={() => setCurrentPage(id)}>
          <span style={{ color: currentPage === id ? theme.neon : theme.textMuted, fontSize: 14, width: 18, textAlign: 'center' }}>{icon}</span>
          {label}
        </button>
      ))}
      <hr style={styles.sidebarDivider} />
      <div style={styles.sidebarStats}>
        {[['0', 'likes'], ['0', 'matches'], ['0', 'chats']].map(([n, l]) => (
          <div key={l} style={styles.statBox}>
            <span style={{ fontSize: 20, fontWeight: 800, color: theme.neon, fontFamily: "'Space Mono', monospace" }}>{n}</span>
            <span>{l}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

function Footer() {
  return (
    <footer style={styles.footer}>
      <span style={{ color: theme.neon }}>✦</span>
      <span style={{ marginLeft: 8 }}>CampusAnon · Anonymous Connections</span>
      <span style={{ margin: '0 16px', color: 'rgba(255,255,255,0.08)' }}>·</span>
      <span>🔒 Identities Always Protected</span>
      <span style={{ marginLeft: 'auto', display: 'flex', gap: 20, alignItems: 'center' }}>
        <a href="#" style={styles.footerLink}>Privacy</a>
        <a href="#" style={styles.footerLink}>Terms</a>
        <span style={{ color: theme.textMuted }}>
          Made with <span style={{ color: theme.neon }}>♥</span> by Siddhant
        </span>
      </span>
    </footer>
  );
}

function InnerApp() {
  const { profile, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [activeChatPartner, setActiveChatPartner] = useState(null);

  if (loading) {
    return (
      <div style={styles.appWrap}>
        <div style={styles.loadingWrap}>
          <span style={{ color: theme.neon, fontSize: 20 }}>✦</span>
          <span>Initializing...</span>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={styles.appWrap}>
        <Header profile={null} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <AuthPage />
        <Footer />
      </div>
    );
  }

  return (
    <div style={styles.appWrap}>
      <Header profile={profile} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div style={styles.body}>
        <Sidebar profile={profile} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main style={styles.main}>
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'matches'   && <MatchesPage setCurrentPage={setCurrentPage} setActiveChatPartner={setActiveChatPartner} />}
          {currentPage === 'chat'      && <ChatPage activeChatPartner={activeChatPartner} setActiveChatPartner={setActiveChatPartner} />}
          {currentPage === 'profile'   && <ProfilePage />}
          {currentPage === 'settings'  && <SettingsPage />}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return <AuthProvider><InnerApp /></AuthProvider>;
}
