# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for **Tondato Advogados Associados**, a law firm in Toledo/PR (Brazil) practicing social security (previdenciário) and labor (trabalhista) law. Next.js 16 (App Router) + React 19 + TypeScript 5.9, statically generated. It was migrated from a single static `index.html`; the original visual design was preserved and is the baseline for any change.

Site copy, comments and identifiers are in **Portuguese** (`getPosts`, `temPendencias`, `aberto`, `.rolou`…) — keep that convention. **Git commit messages are in English** (conventional commits).

## Commands

```bash
npm run dev        # http://localhost:3000
npm run build      # production build (all routes are prerendered)
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
```

There is no linter and no test suite. Verify changes with `typecheck` + `build`, and check visuals in light and dark themes at desktop (1440px) and mobile (390px) widths.

Node ≥ 20.9. Env vars (see `.env.example`): `NEXT_PUBLIC_SITE_URL` (absolute URLs for Open Graph/JSON-LD; defaults to localhost), `RESEND_API_KEY` (+ optional `CONTATO_TO`, `CONTATO_FROM`) for the contact form.

## Architecture

- **`src/app/`** — `layout.tsx` holds metadata, the `LegalService` JSON-LD, fonts (`next/font`: Fraunces + Work Sans exposed as `--font-fraunces` / `--font-work-sans`), the global Header/Footer, and an inline pre-paint script. `page.tsx` composes the home sections. `blog/` and `blog/[slug]/` (SSG via `generateStaticParams`). `actions/contato.ts` is the contact-form server action.
- **`src/components/`** — one component per page section. Server components by default; only interactive pieces are client components (`Header`, `Duvidas`, `FormContato`, `ThemeToggle`, `Reveal`, `ToTop`, `ProgressoLeitura`).
- **`src/lib/site.ts`** — single source for contact data (WhatsApp, email, address, map URLs), menu links and `SITE.oab`. Don't hardcode these elsewhere.

### Content layer (prepared for Sanity.io)

Content lives in `src/data/*.ts`, typed by `src/types/*.ts`, and is **only** read through async functions in `src/lib/` (`getPosts`, `getPostBySlug`, `getEquipe`). Components never import `src/data` directly (the layout's JSON-LD is the one exception). The Sanity integration is meant to replace only the bodies of the `src/lib` functions; types mirror the future Sanity schemas (a sample GROQ projection is in `src/lib/blog.ts`).

`src/data/equipe.ts` contains `[PREENCHER]` placeholders for the lawyers' real names, OAB numbers and bios. Never invent this data. `temPendencias()` makes the production build warn and keeps placeholder entries out of the JSON-LD.

### Styling

All styles are in one file, `src/app/globals.css` — plain CSS with no Tailwind or CSS modules. Follow these conventions:

- **Theme tokens on `:root`, dark values on `:root[data-theme="dark"]`.** Use tokens, never raw hex. `--accent` is for highlight *text, lines and markers* (wine in light, pink in dark, because wine text is illegible on dark backgrounds). `--wine` / `--wine-dk` are for *fills* (buttons, CTA, badges). Translucent accents use `color-mix(in srgb,var(--accent) N%,transparent)`.
- **Theme switching:** the inline script in `layout.tsx` sets `data-theme` before first paint from `localStorage.tema` or `prefers-color-scheme`. `ThemeToggle` changes it, using `document.startViewTransition` when available.
- **Breakpoints:** 1180px (small laptop), 980px (tablet; the menu becomes a slide-in drawer), 600px (phone). Responsive overrides sit in the media-query blocks at the end of the file.
- **Scroll animations:** wrap content in `<Reveal>`; `<Reveal stagger>` cascades its direct children via `--i`. Hover effects that move elements use the CSS `translate` property, not `transform`, so they don't collide with the reveal transition. Hover rules live inside `@media (hover:hover)`.
- **Reduced motion:** everything must degrade under `prefers-reduced-motion` (there is a dedicated block). The pillars marquee becomes a static list.

### Contact form

`FormContato` (client, `useActionState`) → `enviarContato` server action. It validates server-side, drops honeypot submissions (`site` field), and posts to the Resend REST API with `fetch` (no SDK). Without `RESEND_API_KEY` it returns a friendly "unavailable, use WhatsApp" error instead of throwing.

## Domain constraints

- Lawyer bios and copy must follow OAB rules (Provimento 205/2021): informative tone, no self-promotion, no promises of results.
- `SITE.oab` (firm's OAB/PR registration) is pending. The footer renders it only once it is set (Código de Ética, art. 44).
