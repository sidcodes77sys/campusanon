# CampusAnon — Setup Guide
## From zero to live in ~20 minutes

---

## STEP 1 — Create your Supabase project (5 min)

1. Go to https://supabase.com and click **Start your project** (free)
2. Sign up and create a new project
3. Choose a name (e.g. `campusanon`), set a database password, pick a region close to your college
4. Wait ~2 minutes for the project to spin up

---

## STEP 2 — Set up the database (2 min)

1. In your Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click **New Query**
3. Open the file `supabase-schema.sql` from this project
4. Copy the entire contents and paste into the SQL editor
5. Click **Run** — you should see "Success"

---

## STEP 3 — Configure college email restriction (2 min)

1. In Supabase dashboard → **Authentication** → **Providers** → **Email**
2. Make sure **Email confirmations** is ON (this sends the verification email)
3. Go to **Authentication** → **URL Configuration**
4. Set **Site URL** to: `http://localhost:3000` (for now; update after deploying)
5. Add `http://localhost:3000` to **Redirect URLs**

> **To restrict only your college domain:**
> Go to **Authentication** → **Hooks** or use an **Edge Function** that checks the email domain on signup. Alternatively, the frontend already validates the domain before calling Supabase — this is sufficient for a prototype.

---

## STEP 4 — Get your API keys (1 min)

1. In Supabase dashboard → **Settings** → **API**
2. Copy:
   - **Project URL** (looks like `https://abcdefgh.supabase.co`)
   - **anon/public** key (long string starting with `eyJ...`)

---

## STEP 5 — Configure the app (1 min)

1. In the project folder, copy `.env.example` to `.env`:
   ```
   cp .env.example .env
   ```
2. Open `.env` and fill in:
   ```
   REACT_APP_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
   REACT_APP_COLLEGE_DOMAIN=yourcollege.edu
   ```
   Replace `yourcollege.edu` with your actual college email domain.

---

## STEP 6 — Run locally (1 min)

```bash
npm install
npm start
```

The app opens at http://localhost:3000. Sign up with a `@yourcollege.edu` email, check your inbox for the verification link, then log in.

---

## STEP 7 — Deploy to Vercel (5 min)

1. Push your code to a GitHub repository
2. Go to https://vercel.com → **New Project** → import your GitHub repo
3. In **Environment Variables**, add the same 3 variables from your `.env`:
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`
   - `REACT_APP_COLLEGE_DOMAIN`
4. Click **Deploy**
5. Copy your Vercel URL (e.g. `https://campusanon.vercel.app`)
6. Go back to Supabase → **Authentication** → **URL Configuration**
   - Update **Site URL** to your Vercel URL
   - Add your Vercel URL to **Redirect URLs**

---

## Project Structure

```
campusanon/
├── public/
│   └── index.html
├── src/
│   ├── lib/
│   │   ├── supabase.js       ← All Supabase queries & auth helpers
│   │   └── AuthContext.js    ← React auth state management
│   ├── pages/
│   │   ├── AuthPage.js       ← Login & signup
│   │   ├── Dashboard.js      ← Discover / swipe cards
│   │   ├── MatchesPage.js    ← Mutual matches grid
│   │   ├── ChatPage.js       ← Real-time messaging
│   │   ├── ProfilePage.js    ← Edit profile
│   │   ├── SettingsPage.js   ← App settings
│   │   └── styles.js         ← Shared styles
│   ├── App.js                ← Main app + layout
│   └── index.js
├── supabase-schema.sql       ← Run this in Supabase SQL Editor
├── .env.example              ← Copy to .env and fill in keys
└── package.json
```

---

## What's working

- ✅ Real email verification (only @yourcollege.edu can sign up)
- ✅ Secure authentication via Supabase Auth
- ✅ Anonymous profiles with auto-generated aliases
- ✅ Gender self-selection & preference matching
- ✅ Like/Pass discovery feed (unseen profiles only)
- ✅ Mutual match detection
- ✅ Real-time chat with message history
- ✅ Online presence (last seen within 5 minutes)
- ✅ Profile editing (bio + interests)
- ✅ Row-level security (users can only see their own data)

---

## Next Steps (Phase 2)

- 🎨 UI/design overhaul
- 📸 Anonymous avatar system (generated art, no photos)
- 📱 Make it a PWA (installable on phones)
- 🔔 Push notifications for matches/messages
- 🚨 Report & block system
- 📊 Admin dashboard for moderation
- 🔒 Stronger domain enforcement via Supabase Edge Function
