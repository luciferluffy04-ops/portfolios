# Portfol.io — Interactive Portfolio Builder

A Next.js 15 + Supabase platform that lets developers build, customise, and publish live portfolio websites in minutes.

## Features

- **Role-specific templates** — Frontend, Backend, Data Engineer, Data Scientist, Full Stack, DevOps
- **4 portfolio templates** — Minimal, Developer Dark, Bold Visual, Timeline
- **AI resume parsing** — Upload a PDF/DOCX and your details are auto-filled
- **Free / Pro / Premium plans** — Built-in plan gating with upgrade flows
- **Live publishing** — Portfolios go live at `your-name.portfol.io/u/slug`
- **Download HTML** — Export and self-host anywhere
- **Auth** — Email + password, Google OAuth, email verification, password reset

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment (already has default Supabase keys)
cp .env.local .env.local   # it's already named correctly

# 3. Run in development
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon/public key |
| `ANTHROPIC_API_KEY` | No | Enables AI resume parsing (falls back to local parser if absent) |
| `PUBLISH_DOMAIN` | No | Domain for published portfolios (default: `portfol.io`) |

## Supabase table schema

Run this SQL in your Supabase SQL editor:

```sql
create table if not exists portfolios (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade,
  slug        text unique not null,
  html        text not null,
  role        text not null default 'frontend',
  template    text not null default 'minimal',
  name        text not null default '',
  published   boolean not null default true,
  plan        text not null default 'free',
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- Row Level Security
alter table portfolios enable row level security;

create policy "Users can read own portfolios"
  on portfolios for select
  using (auth.uid() = user_id);

create policy "Users can insert own portfolios"
  on portfolios for insert
  with check (auth.uid() = user_id);

create policy "Users can update own portfolios"
  on portfolios for update
  using (auth.uid() = user_id);

create policy "Users can delete own portfolios"
  on portfolios for delete
  using (auth.uid() = user_id);

-- Public portfolios are readable by everyone
create policy "Public portfolios are readable"
  on portfolios for select
  using (published = true);
```

## Route overview

| Route | Description |
|---|---|
| `/` | Landing page with pricing preview |
| `/pricing` | Full pricing / feature comparison |
| `/register` | Sign up (email or Google) |
| `/login` | Sign in |
| `/forgot-password` | Password reset request |
| `/auth/reset-password` | Set new password (from email link) |
| `/dashboard` | User's portfolio list |
| `/builder` | 4-step portfolio builder |
| `/u/[slug]` | Public portfolio page |

## Plans

| | Free | Pro ($9/mo) | Premium ($19/mo) |
|---|---|---|---|
| Portfolios | 1 | 5 | Unlimited |
| Templates | 2 | All 4 | All 4 + upcoming |
| Analytics | ✗ | ✓ | ✓ |
| Custom subdomain | ✗ | ✓ | ✓ |
| Recruiter tracking | ✗ | ✗ | ✓ |

## Deployment (Vercel)

1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

The `vercel.json` in the repo already sets the correct build config.
