import { SITE } from '@/lib/site';
import HeroSlides from './HeroSlides';
import { IconeLocal } from './icons';
import Reveal from './Reveal';

export default function Hero() {
  return (
    <div className="hero-bg">
      <div id="topo" className="wrap hero">
        <Reveal className="hero-txt" stagger>
          <div className="hero-tag">
            <span></span>
            <span className="eyebrow">{SITE.descricaoCurta}</span>
          </div>
          <h1>
            Ao seu lado na busca pelo <em>melhor direito</em>.
          </h1>
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
              Conhecer as áreas de atuação{' '}
              <span className="btn-seta" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </Reveal>
        <Reveal className="hero-media">
          <HeroSlides />
          <div className="hero-selo">
            <div className="hero-selo-ico">
              <IconeLocal stroke="#FBF7F1" width={18} height={18} />
            </div>
            <div>
              <strong>Atendimento em Toledo/PR</strong>
              <span>Presencial, WhatsApp ou e-mail</span>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
