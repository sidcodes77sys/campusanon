import { useState } from 'react';
import { styles, theme } from './styles';

const F = "-apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Display', sans-serif";
const mono = "'SF Mono', 'Space Mono', monospace";

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
        borderBottom: '0.5px solid rgba(255,255,255,0.06)', marginBottom: 48,
      }}>
        <h1 style={{
          fontFamily: F, fontSize: 'clamp(32px,6vw,52px)', fontWeight: 300,
          letterSpacing: -1, marginBottom: 16,
          color: theme.text,
        }}>
          Campus<span style={{ color: theme.accent }}>Anon</span>
        </h1>
        <p style={{
          color: theme.textMuted, fontSize: 'clamp(14px,2vw,17px)', maxWidth: 480,
          margin: '0 auto', lineHeight: 1.8, fontFamily: F,
        }}>
          Anonymous dating for IIIT Pune students.<br />
          No real names. No pressure. Just genuine connections.
        </p>
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 10, marginTop: 28, flexWrap: 'wrap',
        }}>
          {['100% Anonymous', 'IIIT-P Only', 'No Ads', 'Mobile First'].map(tag => (
            <span key={tag} style={{
              background: 'rgba(255,255,255,0.06)',
              borderRadius: 20, padding: '5px 16px', fontSize: 12,
              color: theme.textMuted, fontFamily: F, letterSpacing: 0.3, fontWeight: 400,
              transition: 'all 0.2s',
            }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Feature cards */}
      <h2 style={{ ...styles.pageTitle, marginBottom: 24, fontSize: 20 }}>
        How It Works
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 16, marginBottom: 52,
      }}>
        {sections.map((s, i) => (
          <div key={i} className="card-enter" style={{
            background: '#1c1c1e',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12, padding: '24px 22px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            transition: 'all 0.2s cubic-bezier(0.25,0.1,0.25,1)',
          }}>
            <div style={{ fontSize: 26, marginBottom: 12 }}>{s.icon}</div>
            <div style={{
              fontFamily: F, fontWeight: 600, fontSize: 15, color: theme.text,
              marginBottom: 10,
            }}>{s.title}</div>
            <div style={{ color: theme.textMuted, fontSize: 13, lineHeight: 1.8, fontFamily: F }}>
              {s.body}
            </div>
          </div>
        ))}
      </div>

      {/* Stats strip */}
      <div style={{
        display: 'flex', gap: 0, marginBottom: 48,
        background: '#1c1c1e', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12, overflow: 'hidden', flexWrap: 'wrap',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      }}>
        {[
          { n: '2', label: 'Departments' },
          { n: '431', label: 'Eligible Students' },
          { n: '∞', label: 'Possibilities' },
          { n: '0', label: 'Ads Ever' },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, minWidth: 120, textAlign: 'center', padding: '24px 14px',
            borderRight: i < 3 ? '0.5px solid rgba(255,255,255,0.06)' : 'none',
          }}>
            <div style={{
              fontFamily: mono, fontSize: 'clamp(22px,4vw,32px)', fontWeight: 200,
              color: theme.text,
              marginBottom: 6,
            }}>{s.n}</div>
            <div style={{ color: theme.textMuted, fontSize: 11, letterSpacing: 0.5, fontFamily: F }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* FAQ — with expand/collapse animation */}
      <h2 style={{ ...styles.pageTitle, marginBottom: 24, fontSize: 20 }}>
        FAQ
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 52 }}>
        {faqs.map((f, i) => (
          <div key={i} style={{
            background: openFaq === i ? 'rgba(255,255,255,0.04)' : '#1c1c1e',
            border: `0.5px solid ${openFaq === i ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: 10, overflow: 'hidden',
            transition: 'all 0.2s ease',
          }}>
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{
                width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: 12,
              }}>
              <span style={{ fontFamily: F, fontWeight: 500, fontSize: 14, color: theme.text, textAlign: 'left' }}>
                {f.q}
              </span>
              <span style={{
                color: theme.textMuted, fontSize: 16, flexShrink: 0,
                transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)',
                transition: 'transform 0.2s cubic-bezier(0.25,0.1,0.25,1)',
                display: 'inline-block',
              }}>+</span>
            </button>
            {openFaq === i && (
              <div style={{
                padding: '0 20px 16px', color: theme.textMuted, fontSize: 13,
                lineHeight: 1.8, fontFamily: F,
                animation: 'fadeIn 0.2s ease both',
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
        background: '#1c1c1e', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      }}>
        <div style={{ fontFamily: F, fontSize: 15, fontWeight: 500, color: theme.text, marginBottom: 10 }}>
          Built by a student, for students
        </div>
        <div style={{ color: theme.textMuted, fontSize: 13, lineHeight: 1.8, maxWidth: 380, margin: '0 auto', fontFamily: F }}>
          CampusAnon is an open project built with love for the IIIT Pune community. Feedback, suggestions, and bug reports are always welcome.
        </div>
        <div style={{ marginTop: 18, color: theme.textDim, fontSize: 11, letterSpacing: 0.3, fontFamily: F }}>
          Made with love for students · IIIT Pune · 2026
        </div>
      </div>
    </div>
  );
}
