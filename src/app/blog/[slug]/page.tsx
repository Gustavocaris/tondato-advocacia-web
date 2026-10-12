import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CtaBanner from '@/components/CtaBanner';
import ProgressoLeitura from '@/components/ProgressoLeitura';
import { formatarData, getPostBySlug, getPosts } from '@/lib/blog';

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
  return {
    title: post.titulo,
    description: post.resumo,
    openGraph: { type: 'article', title: post.titulo, description: post.resumo, images: [post.capaUrl] },
  };
}

/* Página do artigo — o corpo do texto virá do Sanity (Portable Text). */
export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug((await params).slug);
  if (!post) notFound();

  return (
    <>
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
              <Image src={post.capaUrl} alt="" fill sizes="(max-width: 980px) 100vw, 820px" priority />
            </div>
            <p className="nota">Conteúdo completo do artigo em breve.</p>
          </article>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
