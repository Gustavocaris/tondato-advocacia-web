import type { MetadataRoute } from 'next';
import { getPosts } from '@/lib/blog';
import { SITE } from '@/lib/site';

/* /sitemap.xml — novos artigos entram automaticamente. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const ultimoPost = posts[0]?.atualizadoEm ?? posts[0]?.data;

  return [
    { url: SITE.url, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE.url}/blog`, lastModified: ultimoPost, changeFrequency: 'weekly', priority: 0.8 },
    ...posts.map((p) => ({
      url: `${SITE.url}/blog/${p.slug}`,
      lastModified: p.atualizadoEm ?? p.data,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
