import Image from 'next/image';
import Link from 'next/link';
import { MENU_LINKS, SITE } from '@/lib/site';

export default function Footer() {
  return (
    <footer>
      <div className="wrap footer-grid">
        <div className="footer-marca">
          <Image src="/img/logo-tondato.png" alt={SITE.nome} width={600} height={357} />
          <p>{SITE.descricaoCurta}</p>
          {SITE.oab && <p>Inscrição OAB/PR {SITE.oab}</p>}
        </div>
        <nav className="footer-col" aria-label="Rodapé">
          <p className="footer-tit">Navegação</p>
          {MENU_LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="footer-col">
          <p className="footer-tit">Contato</p>
          <a href={SITE.whatsappUrl} target="_blank" rel="noopener">
            WhatsApp {SITE.whatsappExibicao}
          </a>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </div>
        <div className="footer-col">
          <p className="footer-tit">Endereço</p>
          <address>
            {SITE.endereco.rua}
            <br />
            {SITE.endereco.cidade}/{SITE.endereco.uf}
          </address>
          <a href={SITE.endereco.mapaUrl} target="_blank" rel="noopener">
            Ver no mapa
          </a>
        </div>
      </div>
      <div className="footer-base">
        <div className="wrap">
          <span>
            © {new Date().getFullYear()} {SITE.nome}. Todos os direitos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
}
