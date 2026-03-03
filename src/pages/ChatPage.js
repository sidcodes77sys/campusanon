import { useEffect, useRef, useState, useCallback } from 'react';
import {
  getMatches, getOrCreateConversation, getMessages,
  sendMessage, subscribeToMessages, isOnline
} from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import { styles, theme } from './styles';

const isMobileDevice = window.screen.width < 768;
const HEADER_H  = 62;
const BOTTOM_NAV_H = 64;

export default function ChatPage({ activeChatPartner, setActiveChatPartner }) {
  const { profile } = useAuth();
  const [matches, setMatches]   = useState([]);
  const [convId, setConvId]     = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [mobileView, setMobileView] = useState(activeChatPartner ? 'chat' : 'list');
  const [hoveredContact, setHoveredContact] = useState(null);
  const bottomRef  = useRef(null);
  const channelRef = useRef(null);
  const inputRef   = useRef(null);

  useEffect(() => {
    if (profile) getMatches(profile.id).then(setMatches).catch(console.error);
  }, [profile]);

  useEffect(() => {
    if (!profile || !activeChatPartner) return;
    loadConversation();
    if (isMobileDevice) setMobileView('chat');
  }, [activeChatPartner?.id]);

  async function loadConversation() {
    setLoading(true); setMessages([]);
    try {
      const id = await getOrCreateConversation(profile.id, activeChatPartner.id);
      setConvId(id);
      const msgs = await getMessages(id);
      setMessages(msgs);
      if (channelRef.current) channelRef.current.unsubscribe();
      channelRef.current = subscribeToMessages(id, (newMsg) => {
        if (newMsg.sender_id !== profile.id && document.hidden && Notification.permission === 'granted') {
          new Notification('CampusAnon — New Message', {
            body: 'You have a new message from your match',
            icon: '/favicon.ico', tag: 'campusanon-msg',
          });
        }
        setMessages(prev => [...prev, newMsg]);
      });
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  useEffect(() => () => { if (channelRef.current) channelRef.current.unsubscribe(); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = useCallback(async (e) => {
    e.preventDefault();
    const text = inputRef.current?.value?.trim();
    if (!text || !convId) return;
    inputRef.current.value = '';
    inputRef.current.focus();
    try { await sendMessage(convId, profile.id, text); }
    catch (err) { console.error(err); }
  }, [convId, profile?.id]);

  function openChat(m) { setActiveChatPartner(m); if (isMobileDevice) setMobileView('chat'); }
  function goBack()    { setMobileView('list'); setActiveChatPartner(null); }

  // ── Shared inner styles ──────────────────────────────────────────────────
  const headerStyle = {
    display: 'flex', alignItems: 'center', gap: 14, padding: '13px 24px',
    background: 'rgba(6,4,20,0.92)', backdropFilter: 'blur(50px)',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    flexShrink: 0,
  };
  const msgsStyle = {
    flex: 1, minHeight: 0, overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    padding: '20px', display: 'flex', flexDirection: 'column', gap: 12,
    background: 'rgba(4,2,16,0.5)',
  };
  const inputRowStyle = {
    display: 'flex', gap: 10, padding: '14px 18px', flexShrink: 0,
    background: 'rgba(6,4,20,0.92)', backdropFilter: 'blur(50px)',
    borderTop: '1px solid rgba(255,255,255,0.07)',
  };

  // ── Contact list ─────────────────────────────────────────────────────────
  const ContactList = () => (
    <div style={{
      width: isMobileDevice ? '100%' : '260px',
      minWidth: isMobileDevice ? undefined : '260px',
      flexShrink: 0,
      background: 'rgba(6,4,20,0.7)', backdropFilter: 'blur(50px)',
      borderRight: isMobileDevice ? 'none' : '1px solid rgba(255,255,255,0.07)',
      overflowY: 'auto', display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ padding: '20px 20px 14px', fontWeight: 700, fontSize: 11,
        letterSpacing: 2, textTransform: 'uppercase', color: theme.textMuted,
        borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        Messages
      </div>
      {matches.length === 0 && (
        <div style={{ padding: '32px 20px', color: theme.textMuted, fontSize: 13, textAlign: 'center', lineHeight: 1.8 }}>
          No matches yet<br/><span style={{ fontSize: 11 }}>Like someone to start chatting</span>
        </div>
      )}
      {matches.map(m => (
        <div key={m.id}
          style={{
            display: 'flex', alignItems: 'center', gap: 14, padding: '13px 18px',
            cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.04)',
            background: activeChatPartner?.id === m.id && !isMobileDevice
              ? 'rgba(139,92,246,0.14)'
              : hoveredContact === m.id ? 'rgba(139,92,246,0.07)' : 'transparent',
            boxShadow: activeChatPartner?.id === m.id && !isMobileDevice
              ? 'inset 2px 0 0 #8b5cf6' : 'none',
            position: 'relative', transition: 'background 0.2s',
          }}
          onClick={() => openChat(m)}
          onMouseEnter={() => setHoveredContact(m.id)}
          onMouseLeave={() => setHoveredContact(null)}>
          <div style={styles.chatListAvatar}>{m.alias?.[0]}</div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={styles.chatListName}>{m.alias}</div>
            <div style={styles.chatListPreview}>{isOnline(m.last_seen) ? '● Online' : 'Say hello!'}</div>
          </div>
          {isOnline(m.last_seen) && <div style={styles.onlineDot} />}
        </div>
      ))}
    </div>
  );

  // ── Chat window ──────────────────────────────────────────────────────────
  const ChatWindow = () => (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {activeChatPartner ? (
        <>
          <div style={headerStyle}>
            {isMobileDevice && (
              <button onClick={goBack} style={{
                background: 'none', border: 'none', color: theme.textMuted,
                fontSize: 22, cursor: 'pointer', marginRight: 8, padding: '0 4px', flexShrink: 0,
              }}>←</button>
            )}
            <div style={styles.chatHeaderAvatar}>{activeChatPartner.alias?.[0]}</div>
            <div>
              <div style={styles.chatHeaderName}>{activeChatPartner.alias}</div>
              <div style={styles.chatHeaderStatus}>
                {isOnline(activeChatPartner.last_seen)
                  ? <span style={{ color: theme.success }}>● Online</span>
                  : <span>● Offline</span>}
              </div>
            </div>
            <div style={{ marginLeft: 'auto', color: theme.textMuted, fontSize: 11 }}>🔒 anonymous</div>
          </div>

          <div style={msgsStyle}>
            {loading && (
              <div style={{ textAlign: 'center', color: theme.textMuted, padding: 20 }}>
                {/* Typing indicator as loading state */}
                <div style={styles.typingIndicator}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{ ...styles.typingDot, animationDelay: `${i * 0.16}s` }} />
                  ))}
                </div>
              </div>
            )}
            {messages.map((msg) => {
              const isMe = msg.sender_id === profile.id;
              return (
                <div key={msg.id} style={isMe ? styles.msgWrapMe : styles.msgWrapThem}>
                  <div style={isMe ? styles.msgBubbleMe : styles.msgBubbleThem}>{msg.content}</div>
                  <div style={styles.msgTime}>
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    {isMe && <span style={{ marginLeft: 4, color: theme.success }}>✓</span>}
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          <form style={inputRowStyle} onSubmit={handleSend}>
            <input ref={inputRef} style={styles.chatInput} placeholder="Type a message..." defaultValue="" autoComplete="off" />
            <button className="shimmer-btn" style={styles.sendBtn} type="submit">Send ➤</button>
          </form>
        </>
      ) : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: theme.textMuted }}>
          <div style={{ fontSize: 52, marginBottom: 16, animation: 'float 3s ease-in-out infinite' }}>💬</div>
          <p>Select a match to start chatting</p>
        </div>
      )}
    </div>
  );

  // ── Mobile ───────────────────────────────────────────────────────────────
  if (isMobileDevice) {
    return (
      <div style={{ height: `calc(100vh - ${HEADER_H}px - ${BOTTOM_NAV_H}px)`, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {mobileView === 'list' ? <ContactList /> : <ChatWindow />}
      </div>
    );
  }

  // ── Desktop ──────────────────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', overflow: 'hidden' }}>
      <ContactList />
      <ChatWindow />
    </div>
  );
}
