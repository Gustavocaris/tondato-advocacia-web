import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

/* /robots.txt — libera o site inteiro e informa o sitemap ao Google. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
