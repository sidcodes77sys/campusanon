import { useEffect, useRef, useState, useCallback } from 'react';
import {
  getMatches, getOrCreateConversation, getMessages,
  sendMessage, subscribeToMessages, isOnline
} from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import { styles, theme } from './styles';

const isMobileDevice = window.screen.width < 768;

// Heights in px
const HEADER_H = 60;
const BOTTOM_NAV_H = 62;

export default function ChatPage({ activeChatPartner, setActiveChatPartner }) {
  const { profile } = useAuth();
  const [matches, setMatches] = useState([]);
  const [convId, setConvId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mobileView, setMobileView] = useState(activeChatPartner ? 'chat' : 'list');
  const bottomRef = useRef(null);
  const channelRef = useRef(null);
  const inputRef = useRef(null);

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
            icon: '/favicon.ico',
            tag: 'campusanon-msg',
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
  function goBack() { setMobileView('list'); setActiveChatPartner(null); }

  // ── Contact list ────────────────────────────────────────────────────────
  const contactList = (
    <div style={{
      ...styles.chatList,
      // On mobile: fill full available height and scroll within
      ...(isMobileDevice ? {
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
      } : {}),
    }}>
      <div style={styles.chatListTitle}>Messages</div>
      {matches.length === 0 && (
        <div style={{ padding: '32px 20px', color: theme.textMuted, fontSize: 13, textAlign: 'center', lineHeight: 1.8 }}>
          No matches yet<br/>
          <span style={{ fontSize: 11 }}>Like someone to start chatting</span>
        </div>
      )}
      {matches.map(m => (
        <div key={m.id}
          style={activeChatPartner?.id === m.id && !isMobileDevice
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

  // ── Chat window ─────────────────────────────────────────────────────────
  // The secret: chatWindow itself is a flex column with fixed height.
  // Only messagesArea (flex:1, minHeight:0, overflowY:auto) scrolls.
  const chatWindow = (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',      // fill whatever parent gives
      overflow: 'hidden',  // nothing escapes
    }}>
      {activeChatPartner ? (
        <>
          {/* Header — fixed, never scrolls */}
          <div style={{ ...styles.chatHeader, flexShrink: 0 }}>
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
                {isOnline(activeChatPartner.last_seen) ? '● Online' : '● Offline'}
              </div>
            </div>
            <div style={{ marginLeft: 'auto', color: theme.textMuted, fontSize: 11 }}>🔒 anonymous</div>
          </div>

          {/* Messages — THE ONLY scrollable area */}
          <div style={{
            flex: 1,
            minHeight: 0,                        // critical for flex scroll
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',    // smooth iOS momentum
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}>
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

          {/* Input — fixed at bottom, never scrolls */}
          <form style={{ ...styles.chatInputRow, flexShrink: 0 }} onSubmit={handleSend}>
            <input ref={inputRef} style={styles.chatInput} placeholder="Type a message..." defaultValue="" autoComplete="off" />
            <button style={styles.sendBtn} type="submit">Send ➤</button>
          </form>
        </>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, color: theme.textMuted }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>💬</div>
          <p>Select a match to start chatting</p>
        </div>
      )}
    </div>
  );

  // ── Mobile: exact viewport height minus header + bottom nav ─────────────
  if (isMobileDevice) {
    const h = `calc(100vh - ${HEADER_H}px - ${BOTTOM_NAV_H}px)`;
    return (
      <div style={{ height: h, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {mobileView === 'list' ? contactList : chatWindow}
      </div>
    );
  }

  // ── Desktop side-by-side ────────────────────────────────────────────────
  return (
    <div style={styles.chatLayout}>
      {contactList}
      {chatWindow}
    </div>
  );
}
