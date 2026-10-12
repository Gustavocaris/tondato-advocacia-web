import Image from 'next/image';
import Link from 'next/link';
import { formatarData } from '@/lib/blog';
import type { Post } from '@/types/blog';
import Reveal from './Reveal';

interface BlogCardProps {
  post: Post;
}

/* Card de listagem de um post do blog. */
export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Reveal as="article" className="post-card">
      <Link href={`/blog/${post.slug}`} className="post-card-link">
        <div className="post-capa">
          <Image src={post.capaUrl} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 980px) 50vw, 33vw" />
        </div>
        <div className="post-corpo">
          <time dateTime={post.data}>{formatarData(post.data)}</time>
          <h3>{post.titulo}</h3>
          <p className="lead">{post.resumo}</p>
          <span className="post-mais">Ler artigo →</span>
        </div>
      </Link>
    </Reveal>
  );
}
