import { useState } from 'react';
import { styles, theme } from './styles';

const mono = "'Space Mono', monospace";
const RC = "'Roboto Condensed', sans-serif";

export default function InfoPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const sections = [
    {
      icon: '🔒',
      title: 'Completely Anonymous',
      body: 'You are never identified by your real name. Every user gets a randomly generated alias like "Frost_41" or "Ember_66". Your roll number email is only used to verify you\'re a real IIIT Pune student — it\'s never visible to anyone.',
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
      title: 'IIIT Pune Only',
      body: 'CampusAnon is exclusively for IIIT Pune students. Signup requires a valid CSE or ECE roll number email (112515xxx@cse.iiitp.ac.in or 112516xxx@ece.iiitp.ac.in). This keeps the community safe, trusted, and relevant.',
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
    { q: 'Why only IIIT Pune?', a: 'Starting small keeps the community tight and trustworthy. Expansion to other colleges is planned based on how this goes.' },
    { q: 'Does it work on mobile?', a: 'Yes — fully mobile responsive with a bottom navigation bar, slide-in menus, and a chat UI optimized for phones.' },
  ];

  return (
    <div style={styles.pageWrap}>
      {/* Hero */}
      <div style={{
        textAlign: 'center', padding: 'clamp(32px,6vw,64px) 0 clamp(24px,4vw,48px)',
        borderBottom: '1px solid rgba(139,92,246,0.12)', marginBottom: 48,
      }}>
        <div className="breathe" style={{ fontSize: 52, marginBottom: 16, display: 'inline-block', filter: 'drop-shadow(0 0 16px rgba(139,92,246,0.7))' }}>✦</div>
        <h1 style={{
          fontFamily: RC, fontSize: 'clamp(28px,6vw,44px)', fontWeight: 800,
          letterSpacing: 4, textTransform: 'uppercase', marginBottom: 16,
          background: 'linear-gradient(135deg, #f0eeff 0%, #a78bfa 50%, #06b6d4 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          CAMPUS<span style={{ background: 'linear-gradient(135deg, #a78bfa, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ANON</span>
        </h1>
        <p style={{
          color: theme.textMuted, fontSize: 'clamp(14px,2vw,17px)', maxWidth: 480,
          margin: '0 auto', lineHeight: 1.8, fontFamily: RC,
        }}>
          Anonymous dating for IIIT Pune students.<br />
          No real names. No pressure. Just genuine connections.
        </p>
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 12, marginTop: 28, flexWrap: 'wrap',
        }}>
          {['100% Anonymous', 'IIIT-P Only', 'No Ads', 'Mobile First'].map(tag => (
            <span key={tag} style={{
              background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)',
              borderRadius: 20, padding: '6px 18px', fontSize: 12,
              color: theme.neon, fontFamily: RC, letterSpacing: 1.5, fontWeight: 700, textTransform: 'uppercase',
              transition: 'all 0.2s',
            }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Feature cards */}
      <h2 style={{ ...styles.pageTitle, marginBottom: 24, fontSize: 20 }}>
        <span style={{ color: theme.neon, WebkitTextFillColor: 'initial' }}>✦</span> How It Works
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 16, marginBottom: 52,
      }}>
        {sections.map((s, i) => (
          <div key={i} className="card-enter" style={{
            background: 'rgba(10,6,30,0.6)', backdropFilter: 'blur(50px)',
            border: '1px solid rgba(139,92,246,0.14)',
            borderRadius: 16, padding: '28px 24px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 0 20px rgba(139,92,246,0.02)',
            position: 'relative', overflow: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.34,1.2,0.64,1)',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)' }} />
            <div style={{ fontSize: 30, marginBottom: 14, animation: 'breathe 3s ease-in-out infinite' }}>{s.icon}</div>
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
        background: 'rgba(10,6,30,0.6)', border: '1px solid rgba(139,92,246,0.14)',
        borderRadius: 16, overflow: 'hidden', flexWrap: 'wrap',
        boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
      }}>
        {[
          { n: '2', label: 'Departments' },
          { n: '431', label: 'Eligible Students' },
          { n: '∞', label: 'Possibilities' },
          { n: '0', label: 'Ads Ever' },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, minWidth: 120, textAlign: 'center', padding: '28px 16px',
            borderRight: i < 3 ? '1px solid rgba(139,92,246,0.1)' : 'none',
            animation: `countUp 0.5s ease both ${i * 0.1}s`,
          }}>
            <div style={{
              fontFamily: mono, fontSize: 'clamp(24px,4vw,36px)', fontWeight: 700,
              background: 'linear-gradient(135deg, #a78bfa, #06b6d4)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              marginBottom: 8,
            }}>{s.n}</div>
            <div style={{ color: theme.textMuted, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: RC }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* FAQ — with expand/collapse animation */}
      <h2 style={{ ...styles.pageTitle, marginBottom: 24, fontSize: 20 }}>
        <span style={{ color: theme.neon, WebkitTextFillColor: 'initial' }}>✦</span> FAQ
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 52 }}>
        {faqs.map((f, i) => (
          <div key={i} style={{
            background: openFaq === i ? 'rgba(139,92,246,0.1)' : 'rgba(10,6,30,0.55)',
            border: `1px solid ${openFaq === i ? 'rgba(139,92,246,0.3)' : 'rgba(139,92,246,0.12)'}`,
            borderRadius: 12, overflow: 'hidden',
            transition: 'all 0.3s ease',
          }}>
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{
                width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: 12,
              }}>
              <span style={{ fontFamily: RC, fontWeight: 800, fontSize: 14, color: theme.text, letterSpacing: 0.5, textAlign: 'left' }}>
                {f.q}
              </span>
              <span style={{
                color: theme.neon, fontSize: 16, flexShrink: 0,
                transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)',
                transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                display: 'inline-block',
              }}>+</span>
            </button>
            {openFaq === i && (
              <div style={{
                padding: '0 24px 18px', color: theme.textMuted, fontSize: 13,
                lineHeight: 1.8, fontFamily: RC,
                animation: 'fadeIn 0.25s ease both',
              }}>
                {f.a}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Built by */}
      <div style={{
        textAlign: 'center', padding: '36px 24px',
        background: 'rgba(10,6,30,0.6)', border: '1px solid rgba(139,92,246,0.14)',
        borderRadius: 16, boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
      }}>
        <div style={{ fontSize: 28, marginBottom: 12, animation: 'breathe 3s ease-in-out infinite' }}>🎓</div>
        <div style={{ fontFamily: RC, fontSize: 16, fontWeight: 800, color: theme.text, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>
          Built by a student, for students
        </div>
        <div style={{ color: theme.textMuted, fontSize: 13, lineHeight: 1.8, maxWidth: 380, margin: '0 auto', fontFamily: RC }}>
          CampusAnon is an open project built with love for the IIIT Pune community. Feedback, suggestions, and bug reports are always welcome.
        </div>
        <div style={{ marginTop: 20, color: theme.textDim, fontSize: 11, letterSpacing: 2, fontFamily: RC, textTransform: 'uppercase' }}>
          Made with <span style={{ color: theme.neon }}>♥</span> for students · IIIT Pune · 2026
        </div>
      </div>
    </div>
  );
}
