import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Domain & Roll Number Validation ─────────────────────────────────────────

export const COLLEGE_DOMAINS = ['cse.iiitp.ac.in', 'ece.iiitp.ac.in'];
export const COLLEGE_DOMAIN = COLLEGE_DOMAINS[0];

export function isValidCollegeEmail(email) {
  if (!email || !email.includes('@')) return false;
  const [local, domain] = email.split('@');
  if (domain === 'cse.iiitp.ac.in') {
    // Roll numbers: 112515001 to 112515320
    const match = local.match(/^112515(\d{3})$/);
    if (!match) return false;
    const num = parseInt(match[1]);
    return num >= 1 && num <= 320;
  }
  if (domain === 'ece.iiitp.ac.in') {
    // Roll numbers: 112516001 to 112516111
    const match = local.match(/^112516(\d{3})$/);
    if (!match) return false;
    const num = parseInt(match[1]);
    return num >= 1 && num <= 111;
  }
  return false;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export async function signUp({ email, password, gender, lookingFor, age }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: window.location.origin,
      data: { gender, looking_for: lookingFor, age },
    },
  });
  if (error) throw error;

  if (data.user) {
    await supabase.from('profiles').upsert({
      id: data.user.id,
      email,
      gender,
      looking_for: lookingFor,
      age,
      alias: generateAlias(),
      interests: [],
      bio: '',
    });
  }

  return data;
}

export async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

// ─── Profile ──────────────────────────────────────────────────────────────────

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('profiles').select('*').eq('id', userId).single();
  if (error) throw error;
  return data;
}

export async function updateProfile(userId, updates) {
  const { data, error } = await supabase
    .from('profiles').update(updates).eq('id', userId).select().single();
  if (error) throw error;
  return data;
}

// ─── Discovery ────────────────────────────────────────────────────────────────

export async function getDiscoverProfiles(currentUser) {
  const { data: seen } = await supabase
    .from('likes').select('target_id').eq('user_id', currentUser.id);

  const seenIds = (seen || []).map(r => r.target_id);
  seenIds.push(currentUser.id);

  let genderFilter = currentUser.looking_for === 'any'
    ? ['male', 'female', 'nonbinary']
    : [currentUser.looking_for];

  let query = supabase
    .from('profiles')
    .select('id, alias, gender, age, interests, bio, last_seen')
    .in('gender', genderFilter)
    .limit(20);

  if (seenIds.length > 0) {
    query = query.not('id', 'in', `(${seenIds.join(',')})`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

// ─── Likes & Matching ─────────────────────────────────────────────────────────

export async function likeProfile(userId, targetId) {
  const { error: likeError } = await supabase
    .from('likes').insert({ user_id: userId, target_id: targetId });
  if (likeError) throw likeError;

  const { data: mutual } = await supabase
    .from('likes').select('id')
    .eq('user_id', targetId).eq('target_id', userId).single();

  if (mutual) {
    await supabase.from('matches').insert([
      { user_id: userId, matched_user_id: targetId },
      { user_id: targetId, matched_user_id: userId },
    ]);
    return { matched: true };
  }
  return { matched: false };
}

export async function passProfile(userId, targetId) {
  await supabase.from('likes').insert({ user_id: userId, target_id: targetId, is_pass: true });
}

export async function getMatches(userId) {
  const { data, error } = await supabase
    .from('matches')
    .select(`matched_user_id, profiles:matched_user_id (id, alias, gender, age, interests, bio, last_seen)`)
    .eq('user_id', userId);
  if (error) throw error;
  return (data || []).map(r => r.profiles);
}

// ─── Stats ────────────────────────────────────────────────────────────────────

export async function getUserStats(userId) {
  const [{ count: likes }, { count: matches }, { count: chatsCount }] = await Promise.all([
    supabase.from('likes').select('*', { count: 'exact', head: true }).eq('user_id', userId).eq('is_pass', false),
    supabase.from('matches').select('*', { count: 'exact', head: true }).eq('user_id', userId),
    supabase.from('matches').select('*', { count: 'exact', head: true }).or(`user_id.eq.${userId},matched_user_id.eq.${userId}`),
  ]);
  return { likes: likes || 0, matches: matches || 0, chats: chatsCount || 0 };
}

// ─── Chat ─────────────────────────────────────────────────────────────────────

export async function getOrCreateConversation(userA, userB) {
  const [u1, u2] = [userA, userB].sort();
  const { data: existing } = await supabase
    .from('conversations').select('id').eq('user_a', u1).eq('user_b', u2).single();
  if (existing) return existing.id;
  const { data: created, error } = await supabase
    .from('conversations').insert({ user_a: u1, user_b: u2 }).select('id').single();
  if (error) throw error;
  return created.id;
}

export async function getMessages(conversationId) {
  const { data, error } = await supabase
    .from('messages').select('id, sender_id, content, created_at')
    .eq('conversation_id', conversationId).order('created_at', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function sendMessage(conversationId, senderId, content) {
  const { data, error } = await supabase
    .from('messages').insert({ conversation_id: conversationId, sender_id: senderId, content })
    .select().single();
  if (error) throw error;
  return data;
}

export function subscribeToMessages(conversationId, callback) {
  return supabase
    .channel(`messages:${conversationId}`)
    .on('postgres_changes', {
      event: 'INSERT', schema: 'public', table: 'messages',
      filter: `conversation_id=eq.${conversationId}`,
    }, payload => callback(payload.new))
    .subscribe();
}

export async function getConversations(userId) {
  const { data, error } = await supabase
    .from('conversations')
    .select(`id, user_a, user_b, updated_at, messages(content, created_at, sender_id)`)
    .or(`user_a.eq.${userId},user_b.eq.${userId}`)
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

// ─── Presence ─────────────────────────────────────────────────────────────────

export async function updateLastSeen(userId) {
  await supabase.from('profiles').update({ last_seen: new Date().toISOString() }).eq('id', userId);
}

export function isOnline(lastSeen) {
  if (!lastSeen) return false;
  return (Date.now() - new Date(lastSeen).getTime()) < 5 * 60 * 1000;
}

// ─── Utils ────────────────────────────────────────────────────────────────────

export function generateAlias() {
  const words = ['Comet','Blaze','Frost','Storm','Ember','Drift','Sage','Echo','Flux','Gale','Prism','Zenith','Nova','Lyric','Crest'];
  return words[Math.floor(Math.random() * words.length)] + '_' + Math.floor(Math.random() * 90 + 10);
}

// ─── Delete Account ───────────────────────────────────────────────────────────
export async function deleteAccount(userId) {
  // Delete all user data — cascade handles likes, matches, conversations, messages
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', userId);
  if (error) throw error;
  // Sign out after data deletion
  await supabase.auth.signOut();
}
