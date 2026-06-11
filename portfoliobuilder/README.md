# Portfol.io — Developer Portfolio Builder

Build a polished portfolio website in minutes. Upload your resume, pick a template for your role, and publish.

## What's included

- **4 portfolio templates** — Minimal, Developer Dark, Bold Visual, Timeline
- **6 developer roles** — Frontend, Backend, Data Engineer, Data Scientist, Full Stack, DevOps
- **Resume parsing** — PDF/DOCX upload, AI extraction with Claude (or local fallback)
- **Live preview** — iframe preview updates as you type
- **Publish** — one-click publish to subdomain or download HTML

## Project structure

```
portfoliobuilder/
├── app/
│   ├── page.tsx                  # Landing page
│   ├── builder/page.tsx          # Builder (4-step flow)
│   └── api/
│       ├── parse-resume/route.ts # Resume upload + AI parsing
│       └── publish/route.ts      # Portfolio publishing
├── components/
│   └── builder/
│       ├── BuilderContext.tsx    # Global state (React Context)
│       ├── BuilderShell.tsx      # Layout + step routing
│       ├── Stepper.tsx           # Progress indicator
│       ├── StepRole.tsx          # Step 1: pick role
│       ├── StepTemplate.tsx      # Step 2: pick template
│       ├── StepDetails.tsx       # Step 3: fill in details
│       ├── StepPreview.tsx       # Step 4: preview + publish
│       ├── ResumeUpload.tsx      # Drag-and-drop upload
│       └── TemplateThumb.tsx     # Template preview cards
└── lib/
    ├── types.ts                  # TypeScript types
    ├── constants.ts              # Roles, templates, colors
    ├── resumeParser.ts           # Local resume text extraction
    └── generatePortfolio.ts      # HTML generator for all 4 templates
```

## Getting started

### 1. Install

```bash
cd portfoliobuilder
npm install
```

### 2. Environment variables

```bash
cp .env.example .env.local
```

Add your `ANTHROPIC_API_KEY` for AI-powered resume parsing. Without it, the local regex parser is used instead.

### 3. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment (Vercel)

```bash
npm install -g vercel
vercel --prod
```

Add environment variables in the Vercel dashboard.

### Subdomain routing for published portfolios

In `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/sites/:path*", "destination": "/sites/:path*/index.html" }
  ]
}
```

For real subdomain support (`john.portfol.io`), configure a wildcard DNS record and Vercel middleware to route by subdomain.

## Extending

### Add a new role

In `lib/constants.ts`, add to the `ROLES` array:

```ts
{
  id: 'mobile',
  label: 'Mobile developer',
  description: 'iOS, Android, React Native',
  icon: 'Smartphone',
  defaultSkills: ['Swift', 'Kotlin', 'React Native', 'Flutter'],
  accent: '#7C3AED',
}
```

### Add a new template

1. Add to `TEMPLATES` in `lib/constants.ts`
2. Add a thumbnail in `components/builder/TemplateThumb.tsx`
3. Add the generator function in `lib/generatePortfolio.ts`

### Add a database

Replace the file-write in `api/publish/route.ts` with a Supabase insert:

```ts
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)
await supabase.from('portfolios').upsert({ subdomain, html, updated_at: new Date() })
```
