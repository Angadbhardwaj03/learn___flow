# learnflow — Student Dashboard

A dark, bento-grid dashboard prototype for a student's active courses and
study streak, built with Next.js App Router, Supabase, Tailwind, and Framer
Motion.

## Live demo

- App: _add your Vercel URL here after deploying_
- Repo: _add your GitHub URL here_

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your Supabase URL + anon key
```

Run `supabase/schema.sql` in your Supabase project's SQL editor (or via
`supabase db push`) to create the `courses` table, enable RLS with a public
read policy, and seed four rows.

```bash
npm run dev
```

## Design direction

The brief is for night-owl studying, not a generic SaaS panel, so the
palette leans into that: near-black surfaces (`#0A0A0E` / `#0F0F14`) with two
accents — an ember orange for progress/streak data and a muted violet for
secondary emphasis — rather than the single neon-on-black look most
AI-dashboard mockups default to. Type pairs a humanist sans (Manrope) for
copy with JetBrains Mono reserved specifically for numbers: streak count,
percentages, dates. The idea is that anything measured looks measured.

The signature element is the streak indicator on the hero tile: instead of a
stat block with an up-arrow, it's a hand-drawn heartbeat line that draws
itself in on load. A streak is a rhythm, not just a number, so it gets a
rhythm-shaped visual.

## Architecture

### Server / client split

- `app/page.tsx` is a plain server component. It renders the static shell
  (sidebar, mobile nav) immediately and wraps the data-dependent part of the
  page in `<Suspense>`.
- `components/courses-section.tsx` is an **async server component**. It
  calls `getCourses()` directly — no client-side fetch, no API route — and
  is the only piece of the tree that touches Supabase. While it resolves,
  Next streams in the `DashboardSkeleton` fallback; `app/loading.tsx`
  provides the same skeleton as a route-level fallback for slower
  navigations.
- Everything that needs interaction or motion (`Sidebar`, `MobileNav`,
  `HeroTile`, `CourseCard`, `ActivityTile`, `BentoGrid`, `StaggerItem`) is a
  client component. They receive plain data as props — no component below
  the data fetch ever imports the Supabase client.
- `lib/supabase/server.ts` builds a request-scoped client with
  `@supabase/ssr`, reading cookies via `next/headers`. `lib/courses.ts`
  isolates the actual query and normalizes failures into a typed
  `CoursesFetchError` so the UI layer never deals with raw Postgrest errors.

### Animation

- **Stagger**: `BentoGrid` owns a parent `variants` object with
  `staggerChildren`; each tile is wrapped in `StaggerItem`, which only
  declares `hidden`/`show` variants and lets the parent drive timing. This
  keeps individual tiles dumb — they don't know they're being staggered.
- **Hover**: `CourseCard` uses `whileHover={{ scale: 1.02, y: -2 }}` with a
  spring transition (`stiffness: 300, damping: 20`), animating only
  `transform`/`opacity` so hover never triggers layout or paint work.
- **Progress bars**: animate `width` from `0` to the fetched value on
  mount, not on scroll-into-view — these tiles are above the fold by
  design, so a scroll trigger would just add latency before feedback.
- **Sidebar nav**: the active-item highlight uses `layoutId` so it slides
  between items as a single shared element instead of two elements
  cross-fading.
- `prefers-reduced-motion` is respected globally in `globals.css`.

## Known simplifications

- The sidebar's icon-only mode is a manual toggle rather than an automatic
  tablet breakpoint — in practice this is the same pattern most production
  dashboards ship (user-controlled, persisted preference) but a pure
  breakpoint-driven collapse would also satisfy the brief if that's
  preferred.
- There's no auth in this prototype — RLS is open for `SELECT` on
  `courses`, scoped for a single-user demo. A real multi-student version
  would add a `user_id` column and a session-scoped policy.
- The activity heatmap uses deterministic mock data rather than a real
  study-session log table, since that wasn't part of the schema in the
  brief.

## Challenges

The trickiest part was keeping the stagger animation declarative without
making every tile component aware of its position in a list. Splitting
`BentoGrid` (owns timing) from `StaggerItem` (owns nothing but the
variant names) let the hero tile, course cards, and activity tile all
participate in the same sequence without sharing any animation logic.
