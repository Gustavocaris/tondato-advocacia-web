import Link from 'next/link';
import type { Post } from '@/types/blog';
import BlogCard from './BlogCard';
import Reveal from './Reveal';

interface BlogSectionProps {
  posts: Post[];
  /** Na home a seção mostra só os destaques e um link para /blog. */
  verTodos?: boolean;
  /** Título principal da página (h1) ou de seção (h2). */
  tituloComoH1?: boolean;
}

export default function BlogSection({ posts, verTodos = false, tituloComoH1 = false }: BlogSectionProps) {
  const Titulo = tituloComoH1 ? 'h1' : 'h2';

  return (
    <section id="blog" className="blog">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">Blog</span>
          <Titulo>Artigos sobre direito previdenciário e trabalhista</Titulo>
          <p className="lead">
            Informação clara para você entender seus direitos junto ao INSS e na relação de trabalho.
          </p>
        </Reveal>
        {posts.length > 0 ? (
          <div className="posts">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="lead">Em breve, novos artigos por aqui.</p>
        )}
        {verTodos && (
          <div className="blog-acoes">
            <Link className="btn btn-ghost" href="/blog">
              Ver todos os artigos
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
