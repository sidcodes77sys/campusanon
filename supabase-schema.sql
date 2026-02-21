-- ═══════════════════════════════════════════════════════════════
-- CampusAnon — Supabase SQL Setup
-- Run this entire file in: Supabase Dashboard → SQL Editor → New Query
-- ═══════════════════════════════════════════════════════════════


-- ─── 1. PROFILES ─────────────────────────────────────────────────────────────
-- Stores public (anonymous) info about each user

CREATE TABLE IF NOT EXISTS profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         TEXT NOT NULL,
  alias         TEXT NOT NULL,
  gender        TEXT NOT NULL CHECK (gender IN ('male', 'female', 'nonbinary')),
  looking_for   TEXT NOT NULL CHECK (looking_for IN ('male', 'female', 'any')),
  age           INT  NOT NULL CHECK (age >= 18 AND age <= 35),
  bio           TEXT DEFAULT '',
  interests     TEXT[] DEFAULT '{}',
  last_seen     TIMESTAMPTZ DEFAULT NOW(),
  deleted       BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Anyone logged in can read non-deleted profiles
CREATE POLICY "Read profiles" ON profiles
  FOR SELECT USING (auth.role() = 'authenticated' AND deleted = FALSE);

-- Users can only update their own profile
CREATE POLICY "Update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Users can insert their own profile on signup
CREATE POLICY "Insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);


-- ─── 2. LIKES ─────────────────────────────────────────────────────────────────
-- Records every like or pass action

CREATE TABLE IF NOT EXISTS likes (
  id          BIGSERIAL PRIMARY KEY,
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  target_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  is_pass     BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, target_id)
);

ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- Users can see and insert their own likes
CREATE POLICY "Manage own likes" ON likes
  FOR ALL USING (auth.uid() = user_id);

-- Users can see if they were liked (needed to detect mutual match)
CREATE POLICY "See likes on me" ON likes
  FOR SELECT USING (auth.uid() = target_id);


-- ─── 3. MATCHES ──────────────────────────────────────────────────────────────
-- Stores mutual matches (inserted both directions)

CREATE TABLE IF NOT EXISTS matches (
  id               BIGSERIAL PRIMARY KEY,
  user_id          UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  matched_user_id  UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, matched_user_id)
);

ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "See own matches" ON matches
  FOR ALL USING (auth.uid() = user_id);


-- ─── 4. CONVERSATIONS ────────────────────────────────────────────────────────
-- One conversation per matched pair

CREATE TABLE IF NOT EXISTS conversations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_a      UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  user_b      UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_a, user_b)
);

ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Access own conversations" ON conversations
  FOR ALL USING (auth.uid() = user_a OR auth.uid() = user_b);


-- ─── 5. MESSAGES ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS messages (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id  UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id        UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content          TEXT NOT NULL CHECK (char_length(content) <= 1000),
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Only participants can read/write messages
CREATE POLICY "Conversation participants only" ON messages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM conversations c
      WHERE c.id = conversation_id
        AND (c.user_a = auth.uid() OR c.user_b = auth.uid())
    )
  );

-- Auto-update conversation's updated_at when a new message is sent
CREATE OR REPLACE FUNCTION update_conversation_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE conversations SET updated_at = NOW() WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_new_message
  AFTER INSERT ON messages
  FOR EACH ROW EXECUTE FUNCTION update_conversation_timestamp();


-- ─── 6. REALTIME ─────────────────────────────────────────────────────────────
-- Enable real-time for the messages table (for live chat)

ALTER PUBLICATION supabase_realtime ADD TABLE messages;


-- ─── 7. AUTO-PROFILE ON SIGNUP ───────────────────────────────────────────────
-- Automatically creates a profile row when a user signs up via Supabase Auth

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, alias, gender, looking_for, age)
  VALUES (
    NEW.id,
    NEW.email,
    -- Random alias generated in SQL
    (ARRAY['Comet','Blaze','Frost','Storm','Ember','Drift','Sage','Echo','Flux','Gale','Nova','Lyric'])[
      floor(random() * 12 + 1)
    ] || '_' || floor(random() * 90 + 10)::TEXT,
    COALESCE(NEW.raw_user_meta_data->>'gender', 'other'),
    COALESCE(NEW.raw_user_meta_data->>'looking_for', 'any'),
    COALESCE((NEW.raw_user_meta_data->>'age')::INT, 18)
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger fires after each new auth user is confirmed
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
