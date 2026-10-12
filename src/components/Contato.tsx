import { SITE } from '@/lib/site';
import { IconeConversa, IconeEmail, IconeLocal } from './icons';
import Reveal from './Reveal';

export default function Contato() {
  return (
    <section id="contato">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">Contato</span>
          <h2>Fale com o escritório</h2>
          <p className="lead">Atendimento pelo WhatsApp, por e-mail ou presencialmente no escritório, em Toledo/PR.</p>
        </Reveal>
        <Reveal className="contatos">
          <div className="ct">
            <div className="ico">
              <IconeConversa />
            </div>
            <small>WhatsApp</small>
            <a href={SITE.whatsappUrl} target="_blank" rel="noopener">
              {SITE.whatsappExibicao}
            </a>
          </div>
          <div className="ct">
            <div className="ico">
              <IconeEmail />
            </div>
            <small>E-mail</small>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
          <div className="ct">
            <div className="ico">
              <IconeLocal />
            </div>
            <small>Endereço</small>
            <address>
              {SITE.endereco.rua}
              <br />
              {SITE.endereco.cidade}/{SITE.endereco.uf}
            </address>
            <a className="mapa" href={SITE.endereco.mapaUrl} target="_blank" rel="noopener">
              Ver no mapa →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
