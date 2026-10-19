import { POSTS_MOCK } from '@/data/posts';
import type { Post } from '@/types/blog';
import { buscar, sanityAtivo } from './sanity';
import { verificarSeoPost } from './seo';

/*
 * Camada de acesso aos posts do blog.
 *
 * Lê os artigos do Sanity.io quando o projeto está configurado; senão, os dados
 * mockados. A projeção GROQ dá aos campos os mesmos nomes de src/types/blog.ts,
 * então os componentes não sabem de onde vêm os dados.
 */

const CAMPOS = `
  "id": _id,
  titulo,
  "slug": slug.current,
  resumo,
  "data": publishedAt,
  "capaUrl": capa.asset->url,
  "capaAlt": coalesce(capa.alt, ""),
  categoria,
  "palavrasChave": coalesce(palavrasChave, []),
  seoTitulo,
  seoDescricao,
  "atualizadoEm": _updatedAt`;

const CORPO = `"corpo": corpo[]{
  ...,
  _type == "image" => { "url": asset->url, "dimensoes": asset->metadata.dimensions }
}`;

const FILTRO = `_type == "post" && defined(slug.current) && defined(publishedAt)`;

let seoVerificado = false;

/** Avisa no build de produção (uma vez) sobre artigos com SEO incompleto. */
function avisarSeo(posts: Post[]) {
  if (seoVerificado || process.env.NODE_ENV !== 'production') return;
  seoVerificado = true;
  for (const post of posts) {
    for (const aviso of verificarSeoPost(post)) console.warn(`[seo] /blog/${post.slug}: ${aviso}`);
  }
}

export async function getPosts(limite?: number): Promise<Post[]> {
  const posts = sanityAtivo
    ? await buscar<Post[]>(`*[${FILTRO}] | order(publishedAt desc) {${CAMPOS}}`, {}, ['post'])
    : [...POSTS_MOCK].sort((a, b) => b.data.localeCompare(a.data));
  avisarSeo(posts);
  return limite ? posts.slice(0, limite) : posts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!sanityAtivo) return POSTS_MOCK.find((p) => p.slug === slug) ?? null;
  return buscar<Post | null>(
    `*[${FILTRO} && slug.current == $slug][0] {${CAMPOS}, ${CORPO}}`,
    { slug },
    ['post'],
  );
}

export function formatarData(iso: string): string {
  return new Date(`${iso.slice(0, 10)}T12:00:00`).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
