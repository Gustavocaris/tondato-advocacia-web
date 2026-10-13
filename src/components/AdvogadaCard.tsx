import Image from 'next/image';
import type { Advogada } from '@/types/equipe';

export default function AdvogadaCard({ advogada }: { advogada: Advogada }) {
  return (
    <article className="adv-card">
      <div className="adv-foto">
        <Image
          src={advogada.foto}
          alt={advogada.fotoAlt}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 1440px) 45vw, 620px"
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
      </div>
    </article>
  );
}
