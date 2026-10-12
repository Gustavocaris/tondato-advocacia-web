import type { Metadata } from 'next';
import BlogSection from '@/components/BlogSection';
import CtaBanner from '@/components/CtaBanner';
import { getPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Artigos da Tondato Advogados Associados sobre Direito Previdenciário, INSS e Direito Trabalhista, em linguagem simples.',
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <BlogSection posts={posts} tituloComoH1 />
      <CtaBanner />
    </>
  );
}
