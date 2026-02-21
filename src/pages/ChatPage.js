import { useEffect, useRef, useState } from 'react';
import {
  getMatches, getOrCreateConversation, getMessages,
  sendMessage, subscribeToMessages, isOnline
} from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import { styles, theme } from './styles';

export default function ChatPage({ activeChatPartner, setActiveChatPartner }) {
  const { profile } = useAuth();
  const [matches, setMatches] = useState([]);
  const [convId, setConvId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const channelRef = useRef(null);

  // Load match list for sidebar
  useEffect(() => {
    if (profile) getMatches(profile.id).then(setMatches).catch(console.error);
  }, [profile]);

  // When active partner changes, load/create conversation
  useEffect(() => {
    if (!profile || !activeChatPartner) return;
    loadConversation();
  }, [activeChatPartner]);

  async function loadConversation() {
    setLoading(true);
    setMessages([]);
    try {
      const id = await getOrCreateConversation(profile.id, activeChatPartner.id);
      setConvId(id);
      const msgs = await getMessages(id);
      setMessages(msgs);

      // Unsubscribe from old channel
      if (channelRef.current) {
        channelRef.current.unsubscribe();
      }

      // Subscribe to real-time new messages
      channelRef.current = subscribeToMessages(id, (newMsg) => {
        setMessages(prev => [...prev, newMsg]);
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  // Cleanup subscription on unmount
  useEffect(() => {
    return () => { if (channelRef.current) channelRef.current.unsubscribe(); };
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || !convId) return;
    const text = input.trim();
    setInput('');
    try {
      await sendMessage(convId, profile.id, text);
      // Real-time subscription will append it
    } catch (e) {
      console.error(e);
      setInput(text); // restore on error
    }
  }

  return (
    <div style={styles.chatLayout}>
      {/* Conversation list */}
      <div style={styles.chatList}>
        <div style={styles.chatListTitle}>Messages</div>
        {matches.length === 0 && (
          <div style={{padding:16, color:'#aaa', fontSize:13}}>No matches yet</div>
        )}
        {matches.map(m => (
          <div key={m.id}
            style={activeChatPartner?.id === m.id ? {...styles.chatListItem, ...styles.chatListItemActive} : styles.chatListItem}
            onClick={() => setActiveChatPartner(m)}>
            <div style={styles.chatListAvatar}>{m.alias?.[0]}</div>
            <div style={{flex:1, overflow:'hidden'}}>
              <div style={styles.chatListName}>{m.alias}</div>
              <div style={styles.chatListPreview}>{isOnline(m.last_seen) ? '🟢 Online' : 'Say hello!'}</div>
            </div>
            {isOnline(m.last_seen) && <div style={styles.onlineDot} />}
          </div>
        ))}
      </div>

      {/* Chat window */}
      <div style={styles.chatWindow}>
        {activeChatPartner ? (
          <>
            <div style={styles.chatHeader}>
              <div style={styles.chatHeaderAvatar}>{activeChatPartner.alias?.[0]}</div>
              <div>
                <div style={styles.chatHeaderName}>{activeChatPartner.alias}</div>
                <div style={styles.chatHeaderStatus}>
                  {isOnline(activeChatPartner.last_seen) ? '🟢 Online' : '⚫ Offline'}
                </div>
              </div>
              <div style={{marginLeft:'auto', color:'#e74c3c', fontSize:12}}>
                🔒 Anonymous · End-to-end
              </div>
            </div>

            <div style={styles.messagesArea}>
              {loading && <div style={{textAlign:'center', color:'#aaa', padding:20}}>Loading messages...</div>}
              {messages.map((msg) => {
                const isMe = msg.sender_id === profile.id;
                return (
                  <div key={msg.id} style={isMe ? styles.msgWrapMe : styles.msgWrapThem}>
                    <div style={isMe ? styles.msgBubbleMe : styles.msgBubbleThem}>
                      {msg.content}
                    </div>
                    <div style={styles.msgTime}>
                      {new Date(msg.created_at).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            <form style={styles.chatInputRow} onSubmit={handleSend}>
              <input
                style={styles.chatInput}
                placeholder="Type a message..."
                value={input}
                onChange={e => setInput(e.target.value)}
              />
              <button style={styles.sendBtn} type="submit" disabled={!input.trim()}>
                Send ➤
              </button>
            </form>
          </>
        ) : (
          <div style={styles.emptyState}>
            <div style={{fontSize:48}}>💬</div>
            <p>Select a match to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}
