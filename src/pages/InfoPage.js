import { styles, theme } from './styles';

const mono = "'Space Mono', monospace";
const RC = "'Roboto Condensed', sans-serif";

export default function InfoPage() {
  const sections = [
    {
      icon: '🔒',
      title: 'Completely Anonymous',
      body: 'You are never identified by your real name. Every user gets a randomly generated alias like "Frost_41" or "Ember_66". Your roll number email is only used to verify you\'re a real IIIT Patna student — it\'s never visible to anyone.',
    },
    {
      icon: '✦',
      title: 'How Matching Works',
      body: 'Browse anonymous profiles and like or pass. If someone likes you back, it\'s a mutual match — and only then can you start chatting. No one-sided messaging. No creeping. Just genuine two-way connections.',
    },
    {
      icon: '💬',
      title: 'Anonymous Chat',
      body: 'Once matched, you can chat freely. Messages are end-to-end anonymous — neither side knows who the other is unless you choose to reveal yourself. Take your time, be yourself.',
    },
    {
      icon: '🎓',
      title: 'IIIT Patna Only',
      body: 'CampusAnon is exclusively for IIIT Patna students. Signup requires a valid CSE or ECE roll number email (112515xxx@cse.iiitp.ac.in or 112516xxx@ece.iiitp.ac.in). This keeps the community safe, trusted, and relevant.',
    },
    {
      icon: '🛡️',
      title: 'Your Data, Protected',
      body: 'We never sell, share, or expose your personal data. Your email is encrypted and stored securely. Profiles only show your alias, gender, age, and interests — nothing that identifies you.',
    },
    {
      icon: '⚡',
      title: 'Built for Students',
      body: 'CampusAnon was built by a student, for students. It\'s lightweight, mobile-first, and designed to actually work on a college wifi connection. No ads, no algorithms pushing you to pay.',
    },
  ];

  const faqs = [
    { q: 'Can people find out who I am?', a: 'Not through the app. Your alias is random and your email is never shown. Only you can choose to reveal your identity in chat.' },
    { q: 'What if someone is being inappropriate?', a: 'You can unmatch and block at any time. We\'re also working on a report feature. Misuse of the platform can result in a permanent ban.' },
    { q: 'Is my data stored forever?', a: 'No. You can delete your account at any time from Settings. This permanently removes your profile, matches, and messages.' },
    { q: 'Why only IIIT Patna?', a: 'Starting small keeps the community tight and trustworthy. Expansion to other colleges is planned based on how this goes.' },
    { q: 'Does it work on mobile?', a: 'Yes — fully mobile responsive with a bottom navigation bar, slide-in menus, and a chat UI optimized for phones.' },
  ];

  return (
    <div style={styles.pageWrap}>
      {/* Hero */}
      <div style={{
        textAlign: 'center', padding: 'clamp(32px,6vw,64px) 0 clamp(24px,4vw,48px)',
        borderBottom: `1px solid rgba(77,159,255,0.1)`, marginBottom: 48,
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✦</div>
        <h1 style={{
          fontFamily: RC, fontSize: 'clamp(28px,6vw,44px)', fontWeight: 800,
          color: theme.text, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 16,
        }}>
          CAMPUS<span style={{ color: theme.neon }}>ANON</span>
        </h1>
        <p style={{
          color: theme.textMuted, fontSize: 'clamp(14px,2vw,17px)', maxWidth: 480,
          margin: '0 auto', lineHeight: 1.8, fontFamily: RC,
        }}>
          Anonymous dating for IIIT Patna students.<br />
          No real names. No pressure. Just genuine connections.
        </p>
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 12, marginTop: 28, flexWrap: 'wrap',
        }}>
          {['100% Anonymous', 'IIIT-P Only', 'No Ads', 'Mobile First'].map(tag => (
            <span key={tag} style={{
              background: 'rgba(77,159,255,0.08)', border: '1px solid rgba(77,159,255,0.2)',
              borderRadius: 20, padding: '6px 18px', fontSize: 12,
              color: theme.neon, fontFamily: RC, letterSpacing: 1.5, fontWeight: 700, textTransform: 'uppercase',
            }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Feature cards */}
      <h2 style={{ ...styles.pageTitle, marginBottom: 24, fontSize: 20 }}>
        <span style={{ color: theme.neon }}>✦</span> How It Works
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 16, marginBottom: 52,
      }}>
        {sections.map((s, i) => (
          <div key={i} style={{
            background: 'rgba(10,30,80,0.4)', backdropFilter: 'blur(28px)',
            border: '1px solid rgba(77,159,255,0.12)',
            borderRadius: 16, padding: '28px 24px',
            boxShadow: '0 8px 32px rgba(10,50,150,0.15)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(77,159,255,0.3), transparent)' }} />
            <div style={{ fontSize: 28, marginBottom: 14 }}>{s.icon}</div>
            <div style={{
              fontFamily: RC, fontWeight: 800, fontSize: 16, color: theme.text,
              letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12,
            }}>{s.title}</div>
            <div style={{ color: theme.textMuted, fontSize: 13, lineHeight: 1.8, fontFamily: RC }}>
              {s.body}
            </div>
          </div>
        ))}
      </div>

      {/* Stats strip */}
      <div style={{
        display: 'flex', gap: 0, marginBottom: 52,
        background: 'rgba(10,30,80,0.4)', border: '1px solid rgba(77,159,255,0.12)',
        borderRadius: 16, overflow: 'hidden', flexWrap: 'wrap',
      }}>
        {[
          { n: '2', label: 'Departments' },
          { n: '431', label: 'Eligible Students' },
          { n: '∞', label: 'Possibilities' },
          { n: '0', label: 'Ads Ever' },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, minWidth: 120, textAlign: 'center', padding: '28px 16px',
            borderRight: i < 3 ? '1px solid rgba(77,159,255,0.08)' : 'none',
          }}>
            <div style={{
              fontFamily: mono, fontSize: 'clamp(24px,4vw,36px)', fontWeight: 700,
              color: theme.neon, marginBottom: 8,
            }}>{s.n}</div>
            <div style={{ color: theme.textMuted, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: RC }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <h2 style={{ ...styles.pageTitle, marginBottom: 24, fontSize: 20 }}>
        <span style={{ color: theme.neon }}>✦</span> FAQ
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 52 }}>
        {faqs.map((f, i) => (
          <div key={i} style={{
            background: 'rgba(10,30,80,0.35)', border: '1px solid rgba(77,159,255,0.1)',
            borderRadius: 12, padding: '20px 24px',
          }}>
            <div style={{ fontFamily: RC, fontWeight: 800, fontSize: 14, color: theme.text, marginBottom: 8, letterSpacing: 0.5 }}>
              {f.q}
            </div>
            <div style={{ color: theme.textMuted, fontSize: 13, lineHeight: 1.8, fontFamily: RC }}>
              {f.a}
            </div>
          </div>
        ))}
      </div>

      {/* Built by */}
      <div style={{
        textAlign: 'center', padding: '36px 24px',
        background: 'rgba(10,30,80,0.3)', border: '1px solid rgba(77,159,255,0.1)',
        borderRadius: 16,
      }}>
        <div style={{ fontSize: 24, marginBottom: 12 }}>🎓</div>
        <div style={{ fontFamily: RC, fontSize: 16, fontWeight: 800, color: theme.text, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>
          Built by a student, for students
        </div>
        <div style={{ color: theme.textMuted, fontSize: 13, lineHeight: 1.8, maxWidth: 380, margin: '0 auto', fontFamily: RC }}>
          CampusAnon is an open project built with love for the IIIT Patna community. Feedback, suggestions, and bug reports are always welcome.
        </div>
        <div style={{ marginTop: 20, color: theme.textDim, fontSize: 11, letterSpacing: 2, fontFamily: RC, textTransform: 'uppercase' }}>
          Made with <span style={{ color: theme.neon }}>♥</span> for students · IIIT Patna · 2026
        </div>
      </div>
    </div>
  );
}
