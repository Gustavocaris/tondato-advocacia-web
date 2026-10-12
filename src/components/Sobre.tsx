import Image from 'next/image';
import Reveal from './Reveal';

/* Seção "Equipe" — apresentação do escritório. */
export default function Sobre() {
  return (
    <section id="equipe">
      <div className="wrap equipe">
        <Reveal className="fotos">
          <Image
            src="/img/equipe-tondato.jpg"
            alt="Advogadas da Tondato Advogados Associados"
            width={1200}
            height={1800}
            sizes="(max-width: 980px) 50vw, 25vw"
          />
          <Image
            src="/img/reuniao-tondato.jpg"
            alt="Equipe da Tondato Advogados Associados em reunião"
            width={1200}
            height={1800}
            sizes="(max-width: 980px) 50vw, 25vw"
          />
        </Reveal>
        <Reveal className="equipe-txt">
          <span className="eyebrow">Equipe</span>
          <h2>Duas advogadas, um só compromisso</h2>
          <p className="lead">
            A Tondato Advogados Associados nasceu do desejo de oferecer uma advocacia previdenciária e trabalhista
            próxima, técnica e comprometida com pessoas reais. Acompanhamos cada cliente de perto, explicando o
            processo em linguagem simples e mantendo você informado do início ao fim.
          </p>
          <p className="lead">Acreditamos que todo segurado e todo trabalhador merece ser ouvido e defendido com seriedade.</p>
        </Reveal>
      </div>
    </section>
  );
}
