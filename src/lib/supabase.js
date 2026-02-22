import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const COLLEGE_DOMAINS = process.env.REACT_APP_COLLEGE_DOMAIN.split(',').map(d => d.trim());

// ─── Auth ─────────────────────────────────────────────────────────────────────

export async function signUp({ email, password, gender, lookingFor, age }) {
  // 1. Create auth user (triggers email verification)
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: window.location.origin,
      data: { gender, looking_for: lookingFor, age },
    },
  });
  if (error) throw error;

  // 2. Insert profile row (will be created after email verification too via trigger)
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
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
}

export async function updateProfile(userId, updates) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ─── Discovery ────────────────────────────────────────────────────────────────

export async function getDiscoverProfiles(currentUser) {
  // Get IDs already liked/passed by this user
  const { data: seen } = await supabase
    .from('likes')
    .select('target_id')
    .eq('user_id', currentUser.id);

  const seenIds = (seen || []).map(r => r.target_id);
  seenIds.push(currentUser.id); // exclude self

  // Determine which genders to show based on looking_for
  let genderFilter;
  if (currentUser.looking_for === 'any') {
    genderFilter = ['male', 'female', 'nonbinary'];
  } else {
    genderFilter = [currentUser.looking_for];
  }

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
  // Record the like
  const { error: likeError } = await supabase
    .from('likes')
    .insert({ user_id: userId, target_id: targetId });
  if (likeError) throw likeError;

  // Check if target also liked us → mutual match
  const { data: mutual } = await supabase
    .from('likes')
    .select('id')
    .eq('user_id', targetId)
    .eq('target_id', userId)
    .single();

  if (mutual) {
    // Create match (insert both directions for easy querying)
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
    .select(`
      matched_user_id,
      profiles:matched_user_id (id, alias, gender, age, interests, bio, last_seen)
    `)
    .eq('user_id', userId);
  if (error) throw error;
  return (data || []).map(r => r.profiles);
}

// ─── Chat ─────────────────────────────────────────────────────────────────────

export async function getOrCreateConversation(userA, userB) {
  // Consistent ordering so we don't duplicate
  const [u1, u2] = [userA, userB].sort();

  const { data: existing } = await supabase
    .from('conversations')
    .select('id')
    .eq('user_a', u1)
    .eq('user_b', u2)
    .single();

  if (existing) return existing.id;

  const { data: created, error } = await supabase
    .from('conversations')
    .insert({ user_a: u1, user_b: u2 })
    .select('id')
    .single();

  if (error) throw error;
  return created.id;
}

export async function getMessages(conversationId) {
  const { data, error } = await supabase
    .from('messages')
    .select('id, sender_id, content, created_at')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function sendMessage(conversationId, senderId, content) {
  const { data, error } = await supabase
    .from('messages')
    .insert({ conversation_id: conversationId, sender_id: senderId, content })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export function subscribeToMessages(conversationId, callback) {
  return supabase
    .channel(`messages:${conversationId}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: `conversation_id=eq.${conversationId}`,
    }, payload => callback(payload.new))
    .subscribe();
}

export async function getConversations(userId) {
  const { data, error } = await supabase
    .from('conversations')
    .select(`
      id,
      user_a,
      user_b,
      updated_at,
      messages(content, created_at, sender_id)
    `)
    .or(`user_a.eq.${userId},user_b.eq.${userId}`)
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

// ─── Presence / Online Status ─────────────────────────────────────────────────

export async function updateLastSeen(userId) {
  await supabase
    .from('profiles')
    .update({ last_seen: new Date().toISOString() })
    .eq('id', userId);
}

export function isOnline(lastSeen) {
  if (!lastSeen) return false;
  return (Date.now() - new Date(lastSeen).getTime()) < 5 * 60 * 1000; // 5 min window
}

// ─── Utils ────────────────────────────────────────────────────────────────────

export function generateAlias() {
  const words = ['Comet','Blaze','Frost','Storm','Ember','Drift','Sage','Echo','Flux','Gale','Prism','Zenith','Nova','Lyric','Crest'];
  return words[Math.floor(Math.random() * words.length)] + '_' + Math.floor(Math.random() * 90 + 10);
}
