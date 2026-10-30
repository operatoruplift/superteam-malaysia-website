<div align="center">

<img src="docs/readme/banner.png" alt="Superteam Malaysia. Community site, Solana, competition. Building Solana in Malaysia. A community website for Superteam Malaysia: mission, projects, events and member cards, with an optional Supabase CMS. Static first, member directory, Supabase CMS, Next.js 16. superteammalaysia.vercel.app. 2nd place, website competition." width="100%">

<br><br>

<a href="https://superteammalaysia.vercel.app"><img src="https://img.shields.io/badge/Visit_the_site-E8A800?style=for-the-badge" alt="Visit the site" height="36"></a>&nbsp;&nbsp;
<a href="https://superteammalaysia.vercel.app/members"><img src="https://img.shields.io/badge/Member_directory-1F1F23?style=for-the-badge" alt="Open the member directory" height="36"></a>&nbsp;&nbsp;
<a href="#run-it-locally"><img src="https://img.shields.io/badge/Run_it_locally-6F6163?style=for-the-badge" alt="Run it locally" height="36"></a>

<br><br>

<a href="https://superteammalaysia.vercel.app"><img src="https://img.shields.io/website?url=https%3A%2F%2Fsuperteammalaysia.vercel.app&label=site&up_message=live&down_message=down&up_color=34d399&labelColor=0F0F0F&style=flat-square" alt="Site status"></a>
<img src="https://img.shields.io/badge/2nd_place-Superteam_Malaysia_Website-F5C542?style=flat-square&labelColor=0F0F0F" alt="2nd place, Superteam Malaysia Website competition">
<img src="https://img.shields.io/badge/Next.js-16.1-E8A800?style=flat-square&logo=nextdotjs&logoColor=white&labelColor=0F0F0F" alt="Next.js 16.1">
<img src="https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white&labelColor=0F0F0F" alt="Tailwind CSS 4">
<img src="https://img.shields.io/badge/CMS-Supabase,_optional-3ECF8E?style=flat-square&logo=supabase&logoColor=white&labelColor=0F0F0F" alt="CMS: Supabase, optional">

<h3>Malaysia's Solana builders, projects and events, on one page.</h3>

<b>Discover</b> &nbsp;→&nbsp; <b>Browse</b> &nbsp;→&nbsp; <b>Attend</b> &nbsp;→&nbsp; <b>Meet</b> &nbsp;→&nbsp; <b>Join</b>

<br>

<a href="#how-it-works">How it works</a> &nbsp;·&nbsp;
<a href="#results">Results</a> &nbsp;·&nbsp;
<a href="#run-it-locally">Run it locally</a> &nbsp;·&nbsp;
<a href="#content-and-admin">Content and admin</a>

</div>

<br>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/readme/screens-dark.png">
  <img src="docs/readme/screens-light.png" alt="Four sections of the site. 01, what the chapter does: six pillars, from builder support and events to grants, bounties, education and ecosystem access. 02, projects built in Malaysia: ten Solana projects with category filters for DeFi, infrastructure, consumer and community. 03, events and a calendar: highlighted events with cover art, plus a calendar of every event linking to its Luma page. 04, part of a global network: a dot map marks 16 Superteam chapters and links out to Superteam Global." width="100%">
</picture>

<p align="center"><sub>Captured from a local production build (<code>pnpm build && pnpm start</code>) with the built-in static data on 30 October 2026. The ticker's SOL price is its fallback value, because CoinGecko is unreachable from this environment. Member and testimonial photos load from unavatar.io, also unreachable here, so those sections are not shown.</sub></p>

**This is a community website for Superteam Malaysia, built for the Superteam Malaysia Website Competition, where it placed 2nd.** It presents the chapter's mission, Solana projects built in Malaysia, events and members, plus a searchable member directory. All content ships as static data, so the site runs with no backend; once Supabase is configured, its rows replace the defaults section by section, and a prototype `/admin` dashboard edits them.

Built by Matt ([RVAClassic](https://x.com/rvaclassic), [Operator Uplift](https://operatoruplift.com)) in March 2026 for the competition.

<br>

## How it works

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/readme/flow-dark.png">
  <img src="docs/readme/flow-light.png" alt="/admin, Supabase and the Next.js site. /admin is a prototype CMS: it edits events, members, partners, projects and more, writes straight from the browser, and has prototype access control. Supabase is optional: seven content tables with Row Level Security on every table, and the site runs fine without it. The Next.js site is static first: default content ships in src/data/site.ts, Supabase rows replace it when present, and it serves the landing page and member directory. /admin writes to Supabase, and the site reads from it." width="100%">
</picture>

<table>
  <tr valign="top">
    <td width="33%"><b>Static first</b><br><sub>Every section renders from <code>src/data/site.ts</code>: 16 events, 37 members, 10 projects, 10 partners, 6 testimonials and the FAQ. No database or API key is needed to build or run the site.</sub></td>
    <td width="33%"><b>Supabase when you want it</b><br><sub>The events, members, partners, projects and testimonials hooks read their table and keep the static list when the table is missing, empty or unreachable. A deploy without Supabase variables still builds and renders.</sub></td>
    <td width="33%"><b>Collectible member cards</b><br><sub>Members appear as trading-card profiles with rarity tiers, skill tags and a flip to reveal stats. <code>/members</code> adds search, skill, lane and rarity filters, and sorting by rarity, name or connections.</sub></td>
  </tr>
</table>

Also on the page: a ticker with a live SOL price from CoinGecko (the other ticker figures are fixed values), a canvas dot grid behind the hero and the join call to action, an auto-scrolling Wall of Love with a follow card for X, a partner logo marquee, an FAQ, a Kuala Lumpur skyline footer, generated Open Graph and X images, and dark and light themes that remember your choice.

<p align="center"><sub>Next.js 16.1 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Supabase JS · lucide-react · ABC Diatype (self-hosted) · Vercel</sub></p>

<br>

## Results

<table>
  <tr valign="top">
    <td width="16%" align="center"><img src="https://img.shields.io/badge/WINNER-F5C542?style=for-the-badge" alt="Winner"></td>
    <td>2nd place in the Superteam Malaysia Website competition (Superteam, $3,000 pool). The pool is the event total, not a payout. The result is listed on the operatoruplift profile.</td>
    <td width="22%"><a href="https://github.com/operatoruplift">operatoruplift profile</a></td>
  </tr>
  <tr valign="top">
    <td align="center"><img src="https://img.shields.io/badge/HACKATHON-C3A1F2?style=for-the-badge" alt="Hackathon"></td>
    <td>Scaffolded on 11 March 2026 and built on 13 March 2026: the full site, then a day of fixes and features merged as eleven pull requests (Supabase CMS wiring, the world map, testimonials, mobile fixes). A twelfth pull request on 6 May 2026 addressed horizontal overflow on Android phones.</td>
    <td><a href="https://github.com/operatoruplift/superteam-malaysia-website/pulls?q=is%3Apr+is%3Amerged">Merged pull requests</a></td>
  </tr>
  <tr valign="top">
    <td align="center"><img src="https://img.shields.io/badge/LIVE-34d399?style=for-the-badge" alt="Live"></td>
    <td><a href="https://superteammalaysia.vercel.app">superteammalaysia.vercel.app</a> is Vercel's production deployment of <code>main</code> (commit <code>3e3d03d</code>, deployed 6 May 2026, ready when checked on 30 October 2026), with Supabase configured. The older <code>sun-valley-rouge.vercel.app</code> address redirects there.</td>
    <td><a href="https://superteammalaysia.vercel.app">Visit the site</a></td>
  </tr>
  <tr valign="top">
    <td align="center"><img src="https://img.shields.io/badge/PROTOTYPE-6574A4?style=for-the-badge" alt="Prototype"></td>
    <td>The <code>/admin</code> CMS. It edits content directly through the public Supabase client, and its access control is a prototype; see <a href="#content-and-admin">Content and admin</a> before you rely on it.</td>
    <td><a href="supabase/schema.sql">Database schema</a></td>
  </tr>
</table>

<br>

## Run it locally

<table>
  <tr valign="top">
    <td width="33%"><b>Prerequisites</b><br><sub>Node 20.9 or newer (Next.js 16; Vercel builds on Node 24) and pnpm 10. A Supabase project only if you want the CMS.</sub></td>
    <td width="33%"><b>Read first</b><br><sub><a href="src/data/site.ts"><code>src/data/site.ts</code></a> holds all default content, and <a href="supabase/schema.sql"><code>supabase/schema.sql</code></a> creates the CMS tables.</sub></td>
    <td width="33%"><b>What the checks prove</b><br><sub>Types and a production build. ESLint currently reports 8 errors and 4 warnings (React effect and image rules). There are no automated tests.</sub></td>
  </tr>
</table>

### 1. Run the site

```bash
git clone https://github.com/operatoruplift/superteam-malaysia-website.git
cd superteam-malaysia-website
pnpm install
pnpm dev                     # http://localhost:3000, using the static data
```

### 2. Check it

```bash
pnpm exec tsc --noEmit       # TypeScript, strict mode
pnpm lint                    # ESLint (Next.js core web vitals and TypeScript rules)
pnpm build && pnpm start     # production build, served on http://localhost:3000
```

### 3. Connect Supabase (optional)

1. Create a [Supabase project](https://supabase.com/dashboard), open the SQL editor and run [`supabase/schema.sql`](supabase/schema.sql). It creates the `events`, `members`, `partners`, `projects`, `announcements`, `site_content` and `testimonials` tables, with indexes and auto-updated timestamps.
2. Copy the environment file and fill in your project's values:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL. Without it, and the anon key, the site uses the static data |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key, used for the public reads and by `/admin` |
| `SUPABASE_SERVICE_ROLE_KEY` | Read only by `createAdminClient()` in `src/lib/supabase.ts`, which no page calls yet. Server-side only: never prefix it with `NEXT_PUBLIC_` |
| `NEXT_PUBLIC_SITE_URL` | Base URL for metadata and social images; defaults to `https://sun-valley-rouge.vercel.app` |

On Vercel, add the same variables under **Settings → Environment Variables** and redeploy, or deploy from the CLI with `vercel deploy --prod`.

<br>

## Content and admin

Visiting `/admin` opens a dashboard with tabs for events, members, partners, projects, testimonials, announcements and site content. Events, members, partners, projects and testimonials appear on the public site; announcements and site content are editable but no public page reads them yet.

The dashboard writes with the anon key from the browser, so `supabase/schema.sql` pairs public-read policies with open write policies on every content table. That is fine for a demo project but means anyone holding the anon key can edit content. Before you put real content behind it, replace the write policies with ones limited to an authenticated admin role (or move writes to a server route that uses the service-role key), and put real authentication in front of `/admin`.

<details>
<summary><b>Project structure</b></summary>
<br>

| Path | Contents |
|---|---|
| `src/app/page.tsx` | The landing page: hero, mission, stats, projects, events, members, global network, Wall of Love, FAQ, partners and the join call to action |
| `src/app/members/` | The member directory with search, filters and sorting |
| `src/app/admin/` | The prototype CMS dashboard |
| `src/app/opengraph-image.tsx`, `twitter-image.tsx` | Generated social images (edge runtime) |
| `src/components/` | Section components, the dot grid canvas, the stat ticker, the theme provider and the KL skyline art |
| `src/data/site.ts` | All default content and the member rarity rules |
| `src/hooks/useSupabaseData.ts` | Supabase reads with the static fallback |
| `src/lib/` | The Supabase clients and generated database types |
| `supabase/schema.sql` | Tables, indexes, triggers and RLS policies |
| `scripts/gen-world-map.mjs` | Generates the dot coordinates for the world map |
| `public/` | Event covers (AVIF), partner and project logos, Superteam Malaysia logos, the Petronas hero photo and the fonts |

</details>

<details>
<summary><b>Design decisions</b></summary>
<br>

- **Gold on dark** follows the Superteam brand while adding warmth for the Malaysian chapter.
- **Petronas Towers imagery** with an animated dot grid gives a recognizable Malaysian identity.
- **Collectible member cards** with rarity tiers add a little gamification to the member list.
- **Static first, CMS second**: the site ships as prerendered pages with static data, and Supabase enhances it when present.
- **Tailwind CSS 4** with CSS variables keeps the dark and light themes consistent.

</details>

<br>

<p align="center"><sub>Built for the Superteam Malaysia Website Competition. This repository has no license file. Superteam, partner and project names and logos belong to their owners.</sub></p>

<p align="center"><sub>Built by <a href="https://rvaclassic.xyz">Matt Sim</a>, founder of <a href="https://operatoruplift.com">Operator Uplift</a>. More builds at <a href="https://github.com/operatoruplift">github.com/operatoruplift</a>. Want one built for your product? <a href="https://cal.com/rvaclassic/15min">Book a 15-minute call</a>.</sub></p>
