import { POSTS_MOCK } from '@/data/posts';
import type { Post } from '@/types/blog';
import { verificarSeoPost } from './seo';

/*
 * Camada de acesso aos posts do blog.
 *
 * Hoje lê os dados mockados. Na integração com o Sanity.io, basta trocar o
 * corpo destas funções por consultas GROQ — os componentes não mudam, pois
 * já consomem estas funções de forma assíncrona. Exemplo de projeção:
 *
 *   *[_type == "post"] | order(publishedAt desc) {
 *     "id": _id,
 *     titulo,
 *     "slug": slug.current,
 *     resumo,
 *     "data": publishedAt,
 *     "capaUrl": capa.asset->url,
 *     "capaAlt": capa.alt,
 *     categoria,
 *     palavrasChave,
 *     seoTitulo,
 *     seoDescricao,
 *     "atualizadoEm": _updatedAt
 *   }
 */

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
  avisarSeo(POSTS_MOCK);
  const ordenados = [...POSTS_MOCK].sort((a, b) => b.data.localeCompare(a.data));
  return limite ? ordenados.slice(0, limite) : ordenados;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return POSTS_MOCK.find((p) => p.slug === slug) ?? null;
}

export function formatarData(iso: string): string {
  return new Date(`${iso.slice(0, 10)}T12:00:00`).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
