import { SITE } from '@/lib/site';
import FormContato from './FormContato';
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
        <Reveal className="contatos" stagger>
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
            <a className="mapa" href="#mapa">
              Ver no mapa <span aria-hidden="true">↓</span>
            </a>
          </div>
        </Reveal>
        <Reveal className="contato-grid">
          <FormContato />
          <div className="mapa-card" id="mapa">
            <div className="mapa-frame">
              <iframe
                src={SITE.endereco.mapaEmbedUrl}
                title={`Mapa: ${SITE.endereco.rua}, ${SITE.endereco.cidade}/${SITE.endereco.uf}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <p className="mapa-legenda">
              <IconeLocal width={18} height={18} />
              {SITE.endereco.rua} · {SITE.endereco.cidade}/{SITE.endereco.uf}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
