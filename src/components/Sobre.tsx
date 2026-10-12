import Image from 'next/image';
import { getEquipe } from '@/lib/equipe';
import AdvogadaCard from './AdvogadaCard';
import Reveal from './Reveal';

/* Seção "Equipe" — apresentação do escritório e das advogadas. */
export default async function Sobre() {
  const equipe = await getEquipe();

  return (
    <section id="equipe">
      <div className="wrap">
        <div className="equipe-intro">
          <Reveal className="equipe-txt">
            <span className="eyebrow">Equipe</span>
            <h2>Duas advogadas, um só compromisso</h2>
            <p className="lead">
              A Tondato Advogados Associados nasceu do desejo de oferecer uma advocacia previdenciária e trabalhista
              próxima, técnica e comprometida com pessoas reais. Acompanhamos cada cliente de perto, explicando o
              processo em linguagem simples e mantendo você informado do início ao fim.
            </p>
            <p className="lead">
              Acreditamos que todo segurado e todo trabalhador merece ser ouvido e defendido com seriedade.
            </p>
          </Reveal>
          <Reveal className="equipe-foto">
            <Image
              src="/img/reuniao-tondato.jpg"
              alt="Equipe da Tondato Advogados Associados em reunião"
              fill
              sizes="(max-width: 980px) 100vw, 40vw"
            />
          </Reveal>
        </div>
        <Reveal className="advogadas" stagger>
          {equipe.map((a) => (
            <AdvogadaCard key={a.id} advogada={a} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
