import Image from 'next/image';
import Link from 'next/link';
import { formatarData } from '@/lib/blog';
import type { Post } from '@/types/blog';

interface BlogCardProps {
  post: Post;
  /** Card largo, com imagem ao lado do texto (primeiro post do /blog). */
  destaque?: boolean;
}

/* Card de listagem de um post do blog. */
export default function BlogCard({ post, destaque = false }: BlogCardProps) {
  return (
    <article className={destaque ? 'post-card post-destaque' : 'post-card'}>
      <Link href={`/blog/${post.slug}`} className="post-card-link">
        <div className="post-capa">
          <Image
            src={post.capaUrl}
            alt=""
            fill
            sizes={
              destaque ? '(max-width: 980px) 100vw, 55vw' : '(max-width: 600px) 100vw, (max-width: 980px) 50vw, 33vw'
            }
          />
          <span className="post-cat">{post.categoria}</span>
        </div>
        <div className="post-corpo">
          <time dateTime={post.data}>{formatarData(post.data)}</time>
          <h3>{post.titulo}</h3>
          <p className="lead">{post.resumo}</p>
          <span className="post-mais">
            Ler artigo <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
