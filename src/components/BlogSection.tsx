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
  /** Exibe o primeiro post como card largo de destaque. */
  destacarPrimeiro?: boolean;
}

export default function BlogSection({
  posts,
  verTodos = false,
  tituloComoH1 = false,
  destacarPrimeiro = false,
}: BlogSectionProps) {
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
          <Reveal className="posts" stagger>
            {posts.map((post, i) => (
              <BlogCard key={post.id} post={post} destaque={destacarPrimeiro && i === 0} />
            ))}
          </Reveal>
        ) : (
          <p className="lead">Em breve, novos artigos por aqui.</p>
        )}
        {verTodos && (
          <div className="blog-acoes">
            <Link className="btn btn-ghost" href="/blog">
              Ver todos os artigos{' '}
              <span className="btn-seta" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
