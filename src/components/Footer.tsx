import Image from 'next/image';
import { SITE } from '@/lib/site';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <Image src="/img/logo-tondato.png" alt={SITE.nome} width={600} height={357} />
        <span>{SITE.descricaoCurta}</span>
        <span>
          © {new Date().getFullYear()} {SITE.nome}. Todos os direitos reservados.
        </span>
      </div>
    </footer>
  );
}
