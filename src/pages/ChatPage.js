import { useEffect, useRef, useState } from 'react';
import {
  getMatches, getOrCreateConversation, getMessages,
  sendMessage, subscribeToMessages, isOnline
} from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import { styles, theme } from './styles';

function useIsMobile() {
  const [v, setV] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setV(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return v;
}

export default function ChatPage({ activeChatPartner, setActiveChatPartner }) {
  const { profile } = useAuth();
  const isMobile = useIsMobile();
  const [matches, setMatches] = useState([]);
  const [convId, setConvId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  // On mobile: 'list' or 'chat'
  const [mobileView, setMobileView] = useState(activeChatPartner ? 'chat' : 'list');
  const bottomRef = useRef(null);
  const channelRef = useRef(null);

  useEffect(() => {
    if (profile) getMatches(profile.id).then(setMatches).catch(console.error);
  }, [profile]);

  useEffect(() => {
    if (!profile || !activeChatPartner) return;
    loadConversation();
    if (isMobile) setMobileView('chat');
  }, [activeChatPartner]);

  async function loadConversation() {
    setLoading(true); setMessages([]);
    try {
      const id = await getOrCreateConversation(profile.id, activeChatPartner.id);
      setConvId(id);
      const msgs = await getMessages(id);
      setMessages(msgs);
      if (channelRef.current) channelRef.current.unsubscribe();
      channelRef.current = subscribeToMessages(id, (newMsg) => {
        setMessages(prev => [...prev, newMsg]);
      });
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  useEffect(() => {
    return () => { if (channelRef.current) channelRef.current.unsubscribe(); };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || !convId) return;
    const text = input.trim(); setInput('');
    try { await sendMessage(convId, profile.id, text); }
    catch (e) { console.error(e); setInput(text); }
  }

  function openChat(m) {
    setActiveChatPartner(m);
    if (isMobile) setMobileView('chat');
  }

  function goBack() {
    setMobileView('list');
    setActiveChatPartner(null);
  }

  // ── Contact List ──────────────────────────────────────────────────────────
  const ContactList = () => (
    <div style={isMobile ? {
      flex: 1, overflowY: 'auto', background: 'transparent',
    } : styles.chatList}>
      <div style={styles.chatListTitle}>Messages</div>
      {matches.length === 0 && (
        <div style={{ padding: '24px 20px', color: theme.textMuted, fontSize: 13, textAlign: 'center', lineHeight: 1.6 }}>
          No matches yet<br/>
          <span style={{ fontSize: 11 }}>Like someone to start chatting</span>
        </div>
      )}
      {matches.map(m => (
        <div key={m.id}
          style={activeChatPartner?.id === m.id && !isMobile
            ? { ...styles.chatListItem, ...styles.chatListItemActive }
            : styles.chatListItem}
          onClick={() => openChat(m)}>
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

  // ── Chat Window ───────────────────────────────────────────────────────────
  const ChatWindow = () => (
    <div style={styles.chatWindow}>
      {activeChatPartner ? (
        <>
          <div style={styles.chatHeader}>
            {/* Back button on mobile */}
            {isMobile && (
              <button onClick={goBack} style={{
                background: 'none', border: 'none', color: theme.textMuted,
                fontSize: 22, cursor: 'pointer', marginRight: 8, padding: '0 4px',
                display: 'flex', alignItems: 'center',
              }}>←</button>
            )}
            <div style={styles.chatHeaderAvatar}>{activeChatPartner.alias?.[0]}</div>
            <div>
              <div style={styles.chatHeaderName}>{activeChatPartner.alias}</div>
              <div style={styles.chatHeaderStatus}>
                {isOnline(activeChatPartner.last_seen) ? '● Online' : '● Offline'}
              </div>
            </div>
            <div style={{ marginLeft: 'auto', color: theme.textMuted, fontSize: 11 }}>
              🔒 anonymous
            </div>
          </div>

          <div style={styles.messagesArea}>
            {loading && <div style={{ textAlign: 'center', color: theme.textMuted, padding: 20 }}>Loading...</div>}
            {messages.map((msg) => {
              const isMe = msg.sender_id === profile.id;
              return (
                <div key={msg.id} style={isMe ? styles.msgWrapMe : styles.msgWrapThem}>
                  <div style={isMe ? styles.msgBubbleMe : styles.msgBubbleThem}>{msg.content}</div>
                  <div style={styles.msgTime}>
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          <form style={styles.chatInputRow} onSubmit={handleSend}>
            <input style={styles.chatInput} placeholder="Type a message..."
              value={input} onChange={e => setInput(e.target.value)} />
            <button style={styles.sendBtn} type="submit" disabled={!input.trim()}>Send ➤</button>
          </form>
        </>
      ) : (
        <div style={{ ...styles.emptyState, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>💬</div>
          <p style={{ color: theme.textMuted }}>Select a match to start chatting</p>
        </div>
      )}
    </div>
  );

  // ── Mobile: show list OR chat, not both ───────────────────────────────────
  if (isMobile) {
    return (
      <div style={{ height: 'calc(100vh - 126px)', display: 'flex', flexDirection: 'column' }}>
        {mobileView === 'list' ? <ContactList /> : <ChatWindow />}
      </div>
    );
  }

  // ── Desktop: side by side ─────────────────────────────────────────────────
  return (
    <div style={styles.chatLayout}>
      <ContactList />
      <ChatWindow />
    </div>
  );
}
