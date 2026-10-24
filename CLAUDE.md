# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for **Tondato Advogados Associados**, a law firm in Toledo/PR (Brazil) practicing social security (previdenciário) and labor (trabalhista) law. Next.js 16 (App Router) + React 19 + TypeScript 5.9, statically generated. It was migrated from a single static `index.html`; the original visual design was preserved and is the baseline for any change.

Site copy, comments and identifiers are in **Portuguese** (`getPosts`, `temPendencias`, `aberto`, `.rolou`…) — keep that convention. **Git commit messages are in English** (conventional commits).

Git workflow: `main` is production (deployed on Vercel) and only receives the final merge from `staging` once the project is finished. `staging` is the homologation branch (Vercel preview) and the base for all work: one branch per change, created from an up-to-date `staging` and merged back into `staging`; get its PR merged before starting the next (no stacked branches). Never rewrite history that has already been pushed (no filter-branch/rebase + force-push on branches with open PRs) — doing so once caused conflicts across every PR.

## Commands

```bash
npm run dev        # http://localhost:3000
npm run build      # production build (all routes are prerendered)
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
```

There is no linter and no test suite. GitHub Actions CI (`.github/workflows/ci.yml`, explained in `docs/CI.md`) runs `typecheck` + `build` on Node 20 and 22, plus a `tsc` of `studio/`, for every push and for PRs to `staging`/`main`. Verify changes with `typecheck` + `build`, and check visuals in light and dark themes at desktop (1440px) and mobile (390px) widths.

Node ≥ 20.9. Env vars (see `.env.example`): `NEXT_PUBLIC_SITE_URL` (absolute URLs for Open Graph/JSON-LD; defaults to localhost), `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` / `SANITY_REVALIDATE_SECRET` for content, `RESEND_API_KEY` (+ optional `CONTATO_TO`, `CONTATO_FROM`) for the contact form, optional `NEXT_PUBLIC_CLARITY_ID` for Microsoft Clarity.

`AvisoCookies` is the LGPD notice: without `NEXT_PUBLIC_CLARITY_ID` it is informational ("Entendi"); with it, it asks for consent and Clarity loads **only after "Aceitar"** (choice in `localStorage.cookies`; the footer's "Preferências de cookies" reopens it). Never add analytics/pixels that load before consent.

## Architecture

- **`src/app/`** — `layout.tsx` holds metadata, the `LegalService` JSON-LD (team from `getEquipe()`), fonts (`next/font`: Fraunces + Work Sans exposed as `--font-fraunces` / `--font-work-sans`), the global Header/Footer, and an inline pre-paint script. `page.tsx` composes the home sections. `blog/` and `blog/[slug]/` (SSG via `generateStaticParams`). `actions/contato.ts` is the contact-form server action; `api/revalidate/` is the Sanity webhook.
- **`src/components/`** — one component per page section. Server components by default; only interactive pieces are client components (`Header`, `Duvidas`, `FormContato`, `ThemeToggle`, `Reveal`, `ToTop`, `ProgressoLeitura`).
- **`src/lib/site.ts`** — single source for contact data (WhatsApp, email, address, map URLs), menu links and `SITE.oab`. Don't hardcode these elsewhere.

### Content layer (Sanity.io)

Content is **only** read through async functions in `src/lib/` (`getPosts`, `getPostBySlug`, `getEquipe`); components never import `src/data` directly. **Only blog posts live in Sanity** — the client publishes articles and nothing else. When `NEXT_PUBLIC_SANITY_PROJECT_ID` is set, `getPosts`/`getPostBySlug` query Sanity through `buscar()` in `src/lib/sanity.ts` (GROQ projections rename fields to match `src/types/blog.ts`); otherwise they fall back to `src/data/posts.ts`, so CI and local dev run without env vars. The team (`src/data/equipe.ts`), OAB data and everything in `src/lib/site.ts` are maintained by us in code; don't move them to Sanity. The post body (`corpo`, Portable Text) is rendered by `components/CorpoArtigo.tsx`.

- **Studio** lives in `studio/` (own `package.json`, excluded from the root `tsconfig`; project `2ousxa3t`, dataset `production`, which must stay public-read). The only schema is `post` (`studio/schemaTypes/post.tsx`, mirrors `src/types/blog.ts`; body marks: strong, em, underline, highlight, link); `studio/schemaTypes/seo.ts` duplicates the rules of `src/lib/seo.ts` as Studio warnings, so change both together. `studio/scripts/importar-mocks.ts` imports the mock posts into the dataset (idempotent). See `studio/README.md`.
- **Caching:** post queries are tagged `post` and revalidate hourly as a fallback (the fetch cache in `.next/cache` survives rebuilds, so never use `revalidate: false`); the Sanity webhook hits `src/app/api/revalidate/route.ts` (signed with `SANITY_REVALIDATE_SECRET`), which calls `revalidateTag`. New slugs render on demand (`dynamicParams`).

`src/data/equipe.ts` holds the lawyers' real names, OAB numbers, education and bios, as supplied by the firm. Never invent or embellish this data. A `[PREENCHER]` placeholder in any field makes `temPendencias()` warn in the production build and keeps that entry out of the JSON-LD.

### Styling

All styles are in one file, `src/app/globals.css` — plain CSS with no Tailwind or CSS modules. Follow these conventions:

- **Theme tokens on `:root`, dark values on `:root[data-theme="dark"]`.** Use tokens, never raw hex. `--accent` is for highlight *text, lines and markers* (wine in light, pink in dark, because wine text is illegible on dark backgrounds). `--wine` / `--wine-dk` are for *fills* (buttons, CTA, badges). Translucent accents use `color-mix(in srgb,var(--accent) N%,transparent)`.
- **Theme switching:** the inline script in `layout.tsx` sets `data-theme` before first paint: light by default, dark only when `localStorage.tema` is `'dark'` (the visitor picked it in `ThemeToggle`). The system `prefers-color-scheme` is deliberately ignored. `ThemeToggle` changes it, using `document.startViewTransition` when available.
- **Breakpoints:** 1180px (small laptop), 980px (tablet; the menu becomes a slide-in drawer), 600px (phone). Responsive overrides sit in the media-query blocks at the end of the file.
- **Scroll animations:** wrap content in `<Reveal>`; `<Reveal stagger>` cascades its direct children via `--i`. Hover effects that move elements use the CSS `translate` property, not `transform`, so they don't collide with the reveal transition. Hover rules live inside `@media (hover:hover)`.
- **Reduced motion:** everything must degrade under `prefers-reduced-motion` (there is a dedicated block). The pillars marquee becomes a static list.

### Contact form

`FormContato` (client, `useActionState`) → `enviarContato` server action. It validates server-side, drops honeypot submissions (`site` field), and posts to the Resend REST API with `fetch` (no SDK). Without `RESEND_API_KEY` it returns a friendly "unavailable, use WhatsApp" error instead of throwing.

### SEO

- Global metadata (title template, keywords, canonical, Open Graph/Twitter, optional Search Console verification via `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`) and the `LegalService` JSON-LD (`@id` `${SITE.url}/#escritorio`) live in `layout.tsx`. Every page sets `alternates.canonical`.
- `src/app/sitemap.ts` and `src/app/robots.ts` generate `/sitemap.xml` and `/robots.txt` from `getPosts()`; there is no static robots file.
- Post pages emit `BlogPosting` + `BreadcrumbList` JSON-LD through `components/JsonLd.tsx` and use `seoTitulo()`/`seoDescricao()` from `src/lib/seo.ts` (fallback to `titulo`/`resumo`).
- Every post needs `palavrasChave` (first = primary) and `capaAlt`. `verificarSeoPost()` makes the production build warn when the primary keyword is missing from title/slug/summary, the title exceeds 60 chars, the description is outside 70–160 chars, or `capaAlt` is empty. Keep mock posts warning-free.
- All absolute URLs come from `SITE.url` (`NEXT_PUBLIC_SITE_URL`); it must be the final domain in production.

## Domain constraints

- Lawyer bios and copy must follow OAB rules (Provimento 205/2021): informative tone, no self-promotion, no promises of results.
- `SITE.oab` (firm's OAB/PR registration) is pending. The footer renders it only once it is set (Código de Ética, art. 44).
