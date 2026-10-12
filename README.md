# tondato-advocacia-web

Site da Tondato Advogados Associados — Next.js (App Router), React e TypeScript.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção
npm run typecheck
```

Copie `.env.example` para `.env.local` e defina `NEXT_PUBLIC_SITE_URL`.
Os posts do blog vêm de `src/lib/blog.ts` (hoje mockados em `src/data/posts.ts`), ponto único a ser trocado pela integração com o Sanity.io.
