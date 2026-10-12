import Image from 'next/image';
import { SITE } from '@/lib/site';
import Reveal from './Reveal';

export default function Hero() {
  return (
    <div id="topo" className="wrap hero">
      <Reveal className="hero-txt">
        <div className="hero-tag">
          <span></span>
          <span className="eyebrow">{SITE.descricaoCurta}</span>
        </div>
        <h1>Ao seu lado na busca pelo melhor direito.</h1>
        <p className="lead">
          A Tondato Advogados Associados é um escritório de advocacia em Toledo/PR com atuação em Direito
          Previdenciário e Direito Trabalhista, sempre em busca do melhor direito para o segurado e para o
          trabalhador, do primeiro atendimento até a conclusão do processo.
        </p>
        <div className="actions">
          <a className="btn btn-wine" href={SITE.whatsappUrl} target="_blank" rel="noopener">
            Falar no WhatsApp
          </a>
          <a className="btn btn-ghost" href="#areas">
            Conhecer as áreas de atuação
          </a>
        </div>
      </Reveal>
      <Reveal className="hero-img">
        <Image
          src="/img/socias-tondato.jpg"
          alt="Advogadas sócias da Tondato Advogados Associados"
          width={1200}
          height={1800}
          sizes="(max-width: 980px) 520px, 460px"
          priority
        />
      </Reveal>
    </div>
  );
}
