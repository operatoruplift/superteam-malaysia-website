# Superteam Malaysia Website

The official website for **Superteam Malaysia** — Malaysia's home for Solana builders, creators, and founders. Part of the global [Superteam](https://superteam.fun) network.

**Live Demo:** [sun-valley-rouge.vercel.app](https://sun-valley-rouge.vercel.app)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Fonts | ABC Diatype + ABC Diatype Semi-Mono (self-hosted) |
| Animation | [Framer Motion](https://www.framer.com/motion/) + custom canvas (DotGrid) |
| Database / CMS | [Supabase](https://supabase.com) (PostgreSQL + Row Level Security) |
| Deployment | [Vercel](https://vercel.com) |
| Package Manager | pnpm |

## Features

- **Live stat ticker** bar with real-time SOL price (CoinGecko API), ecosystem GDP, member count
- **Responsive landing page** with hero, mission, stats, events, members, global network, FAQ, projects, wall of love, and join CTA
- **Member spotlight** with collectible card-style profiles (rarity tiers, flip animation, skill tags)
- **Full member directory** (`/members`) with search, skill/lane/rarity filters, and sorting
- **Events integration** with Luma — upcoming highlights + calendar sidebar with all events
- **Top Projects** section showcasing Malaysian-built Solana projects with category filters
- **Global Network** SVG world map showing 16+ Superteam chapters
- **Ecosystem partners** auto-scrolling logo marquee
- **Wall of Love** with auto-scrolling testimonials + embedded X/Twitter timeline
- **Dark/Light mode** with system preference detection
- **CMS Admin Dashboard** (`/admin`) for managing all content via Supabase
- **Canvas-animated dot grid** (hero + join CTA) with seeded random, sine-based pulse

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)
- Supabase project (free tier works)

### Installation

```bash
git clone https://github.com/operatoruplift/superteam-malaysia-website.git
cd superteam-malaysia-website/sun-valley
pnpm install
```

### Environment Variables

Copy the example env file and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | Password for the admin dashboard |

### Database Setup

1. Create a new [Supabase project](https://supabase.com/dashboard)
2. Open the SQL Editor and run the schema file:

```bash
# Copy the contents of supabase/schema.sql into the SQL editor
```

This creates tables for `events`, `members`, `partners`, `projects`, `announcements`, and `site_content` with:
- Row Level Security (public read, service-role write)
- Auto-updated timestamps
- Performance indexes

### Local Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

The site works with or without Supabase — static data from `src/data/site.ts` is used as the default, and the CMS layer can progressively enhance it once connected.

### Build

```bash
pnpm build
pnpm start
```

## Project Structure

```
sun-valley/
├── public/
│   ├── events/          # Event cover images (AVIF)
│   ├── logos/
│   │   ├── partners/    # Ecosystem partner logos
│   │   └── projects/    # Malaysian project logos
│   ├── petronas.jpg     # KL skyline hero background
│   └── favicon.png
├── src/
│   ├── app/
│   │   ├── admin/       # CMS admin dashboard
│   │   ├── members/     # Full member directory page
│   │   ├── globals.css  # Tailwind v4 + custom styles
│   │   ├── layout.tsx   # Root layout with theme provider
│   │   └── page.tsx     # Landing page
│   ├── components/      # UI components
│   │   ├── Hero.tsx
│   │   ├── PartnerLogos.tsx
│   │   ├── Mission.tsx
│   │   ├── Stats.tsx
│   │   ├── Events.tsx
│   │   ├── Members.tsx
│   │   ├── MemberCard.tsx
│   │   ├── GlobalNetwork.tsx
│   │   ├── WallOfLove.tsx
│   │   ├── FAQ.tsx
│   │   ├── Projects.tsx
│   │   ├── JoinCTA.tsx
│   │   ├── DotGrid.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── data/
│   │   └── site.ts      # Static data (fallback when Supabase is not configured)
│   └── lib/
│       ├── supabase.ts      # Supabase client initialization
│       └── database.types.ts # TypeScript types for DB tables
└── supabase/
    └── schema.sql       # Database schema (run in Supabase SQL editor)
```

## CMS Administration

Navigate to `/admin` and enter the admin password. The dashboard allows you to:

- **Events:** Add, edit, and delete events (title, date, location, status, Luma URL, image)
- **Members:** Full CRUD for member profiles with skills, achievements, and featured toggle
- **Partners:** Manage ecosystem partner logos and URLs
- **Projects:** Manage Malaysian project entries with categories
- **Announcements:** Create and manage community announcements (highlight, announcement, update types)
- **Content:** Edit key-value site content (hero text, descriptions)

## Deployment

### Vercel (Recommended)

```bash
vercel deploy --prod
```

Or connect your GitHub repo to Vercel for automatic deployments on push.

### Environment Variables on Vercel

Add all variables from `.env.example` in your Vercel project settings under **Settings > Environment Variables**.

## Design Decisions

- **Gold + dark theme** aligns with Superteam brand while adding warmth for the Malaysian chapter
- **Petronas Towers imagery** with animated dot grid provides recognizable Malaysian identity without being cliché
- **Collectible card system** for members (rarity tiers based on community engagement) adds gamification
- **Static-first architecture** — the site ships as static HTML with optional Supabase CMS enhancement, ensuring fast load times
- **Tailwind v4** with custom CSS variables for consistent theming across dark/light modes

## License

Built for the Superteam Malaysia Website Competition.
