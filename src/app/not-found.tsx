import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Página não encontrada',
  robots: { index: false, follow: true },
};

export default function NaoEncontrada() {
  return (
    <section className="artigo">
      <div className="wrap">
        <div className="artigo-conteudo">
          <span className="eyebrow">Erro 404</span>
          <h1>Página não encontrada</h1>
          <p className="lead">O endereço pode ter mudado ou não existe mais. Veja as opções abaixo.</p>
          <div className="actions">
            <Link className="btn btn-wine" href="/">
              Ir para o início
            </Link>
            <Link className="btn btn-ghost" href="/blog">
              Ver o blog
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
