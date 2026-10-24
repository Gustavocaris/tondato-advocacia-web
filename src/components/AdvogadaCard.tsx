import Image from 'next/image';
import type { Advogada } from '@/types/equipe';
import { IconeInstagram } from './icons';

export default function AdvogadaCard({ advogada }: { advogada: Advogada }) {
  return (
    <article className="adv-card">
      <div className="adv-foto">
        <Image
          src={advogada.foto}
          alt={advogada.fotoAlt}
          fill
          sizes="(max-width: 600px) 100vw, 320px"
        />
      </div>
      <div className="adv-corpo">
        <h3>{advogada.nome}</h3>
        <p className="adv-oab">{advogada.oab}</p>
        <ul className="adv-formacao">
          {advogada.formacao.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="lead">{advogada.bio}</p>
        {advogada.instagram && (
          <a
            className="adv-insta"
            href={advogada.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram de ${advogada.nome} (abre em nova aba)`}
          >
            <IconeInstagram width={18} height={18} />
          </a>
        )}
      </div>
    </article>
  );
}
