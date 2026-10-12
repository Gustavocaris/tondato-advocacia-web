import BlogSection from '@/components/BlogSection';
import Contato from '@/components/Contato';
import CtaBanner from '@/components/CtaBanner';
import Diferenciais from '@/components/Diferenciais';
import Duvidas from '@/components/Duvidas';
import Hero from '@/components/Hero';
import Pilares from '@/components/Pilares';
import Servicos from '@/components/Servicos';
import Sobre from '@/components/Sobre';
import { getPosts } from '@/lib/blog';

export default async function Home() {
  const posts = await getPosts(3);

  return (
    <>
      <Hero />
      <Pilares />
      <Servicos />
      <Diferenciais />
      <Sobre />
      <Duvidas />
      <BlogSection posts={posts} verTodos />
      <CtaBanner />
      <Contato />
    </>
  );
}
