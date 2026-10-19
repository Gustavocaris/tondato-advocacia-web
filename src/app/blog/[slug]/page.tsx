import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CorpoArtigo from '@/components/CorpoArtigo';
import CtaBanner from '@/components/CtaBanner';
import JsonLd from '@/components/JsonLd';
import ProgressoLeitura from '@/components/ProgressoLeitura';
import { formatarData, getPostBySlug, getPosts } from '@/lib/blog';
import { seoDescricao, seoTitulo } from '@/lib/seo';
import { SITE } from '@/lib/site';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug((await params).slug);
  if (!post) return {};
  const titulo = seoTitulo(post);
  const descricao = seoDescricao(post);
  return {
    title: titulo,
    description: descricao,
    keywords: post.palavrasChave,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: titulo,
      description: descricao,
      url: `/blog/${post.slug}`,
      publishedTime: post.data,
      modifiedTime: post.atualizadoEm ?? post.data,
      section: post.categoria,
      tags: post.palavrasChave,
      images: [{ url: post.capaUrl, alt: post.capaAlt }],
    },
  };
}

/* Página do artigo — o corpo do texto vem do Sanity (Portable Text). */
export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug((await params).slug);
  if (!post) notFound();

  const url = `${SITE.url}/blog/${post.slug}`;
  const artigoLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: seoTitulo(post),
    description: seoDescricao(post),
    image: new URL(post.capaUrl, SITE.url).href,
    datePublished: post.data,
    dateModified: post.atualizadoEm ?? post.data,
    articleSection: post.categoria,
    keywords: post.palavrasChave.join(', '),
    inLanguage: 'pt-BR',
    mainEntityOfPage: url,
    author: { '@type': 'Organization', '@id': `${SITE.url}/#escritorio`, name: SITE.nome, url: SITE.url },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE.url}/#escritorio`,
      name: SITE.nome,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/img/logo-tondato.png` },
    },
  };
  const trilhaLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE.url}/blog` },
      { '@type': 'ListItem', position: 3, name: post.titulo, item: url },
    ],
  };

  return (
    <>
      <JsonLd dados={artigoLd} />
      <JsonLd dados={trilhaLd} />
      <ProgressoLeitura />
      <section className="artigo">
        <div className="wrap">
          <article className="artigo-conteudo">
            <Link href="/blog" className="artigo-voltar">
              ← Voltar ao blog
            </Link>
            <p className="artigo-meta">
              <span className="post-cat">{post.categoria}</span>
              <time dateTime={post.data}>{formatarData(post.data)}</time>
            </p>
            <h1>{post.titulo}</h1>
            <p className="lead">{post.resumo}</p>
            <div className="artigo-capa">
              <Image src={post.capaUrl} alt={post.capaAlt} fill sizes="(max-width: 980px) 100vw, 820px" priority />
            </div>
            {post.corpo?.length ? (
              <CorpoArtigo corpo={post.corpo} />
            ) : (
              <p className="nota">Conteúdo completo do artigo em breve.</p>
            )}
          </article>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
