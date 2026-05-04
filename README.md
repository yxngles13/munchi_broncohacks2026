# Munchi 🍊

A real-time campus food rescue PWA that connects students with leftover event food before it gets thrown away.

Built solo at BroncoHacks 2026 — won Best Use of Vercel.

**Live Demo:** https://munchi-broncohacks2026.vercel.app/ 

---

## The Problem

Campus clubs and events have leftover food every single day. Students nearby are hungry and have no idea it exists. Munchi connects the two in real time.

## Features

- 🔴 **Real-time feed** — new listings appear instantly without refreshing
- 📬 **Magic link auth** — sign in with just your email, no password needed
- 📝 **Post a listing** — hosts post food in seconds with emoji, location, and expiry time
- ✅ **Claim system** — claim a portion and portions update live for everyone
- ⏰ **Countdown timer** — each listing shows time remaining before it expires
- 🎓 **University selector** — supports campuses across the US
- 📱 **PWA** — installable on iPhone and Android, feels native

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | Supabase (PostgreSQL) |
| Realtime | Supabase Realtime |
| Auth | Supabase Magic Link |
| Deployment | Vercel |

## Getting Started

### Prerequisites
- Node.js 20+
- A Supabase account
- A Vercel account

### Installation

1. Clone the repo
```bash
git clone https://github.com/yxngles13/munchi_broncohacks2026.git
cd munchi_broncohacks2026
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables — create a `.env.local` file in the root:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

4. Set up your Supabase database — create these tables:

**listings**
```sql
create table listings (
  id bigint primary key generated always as identity,
  food_name text not null,
  emoji text,
  host text,
  location text,
  distance text,
  portions_left int8,
  expires_at timestamptz not null,
  created_at timestamptz default now()
);
```

**claims**
```sql
create table claims (
  id bigint primary key generated always as identity,
  listing_id int8,
  created_at timestamptz default now()
);
```

5. Enable Realtime on the `listings` table in your Supabase dashboard → Database → Publications → supabase_realtime

6. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure
munchi/
├── app/
│   ├── (auth)/
│   │   └── login/          # Magic link login page
│   ├── (app)/
│   │   ├── feed/           # Real-time food feed
│   │   ├── post/           # Post a food listing
│   │   ├── saved/          # Claimed listings
│   │   └── claim/          # Claim success page
│   └── auth/callback/      # Supabase auth callback
├── components/
│   ├── navbar.tsx           # Bottom navigation
│   ├── feed-client.tsx      # Client-side feed with realtime
│   ├── listing-card.tsx     # Individual food card
│   └── countdown.tsx        # Expiry countdown timer
└── lib/
├── supabase.ts          # Server Supabase client
└── supabase-browser.ts  # Browser Supabase client

## What I Learned

- How to use Supabase Realtime subscriptions with Postgres replication
- The difference between Server and Client Components in Next.js App Router
- How to implement magic link auth with Supabase SSR and handle auth callbacks
- Building a design system from scratch with Tailwind CSS v4 `@theme`
- Debugging production vs development environment differences on Vercel

## What's Next

- [ ] Push notifications when food drops nearby
- [ ] Real GPS-based distance calculation
- [ ] Host dashboard to manage listings
- [ ] Sustainability dashboard showing total food rescued
- [ ] Full DOE API integration for all 4,000+ US universities

## Built By

**Yong Thu La Wong** — [@yxngles13](https://github.com/yxngles13)

[LinkedIn](https://linkedin.com/in/yong-thu-la-wong) · [Live Demo](your Vercel URL)
