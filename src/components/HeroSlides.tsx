'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const FOTOS = [
  { src: '/img/socias-tondato.jpg', alt: 'Advogadas sócias da Tondato Advogados Associados' },
  { src: '/img/equipe-tondato.jpg', alt: 'Advogadas da Tondato Advogados Associados' },
  { src: '/img/reuniao-tondato.jpg', alt: 'Equipe da Tondato Advogados Associados em reunião' },
];

const INTERVALO_MS = 5500;

/* Fotos do hero alternando com fade; pausa no hover e respeita "reduzir movimento". */
export default function HeroSlides() {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    if (pausado || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setTimeout(() => setAtual((i) => (i + 1) % FOTOS.length), INTERVALO_MS);
    return () => clearTimeout(t);
  }, [atual, pausado]);

  return (
    <div className="hero-img" onMouseEnter={() => setPausado(true)} onMouseLeave={() => setPausado(false)}>
      {FOTOS.map((foto, i) => (
        <div key={foto.src} className={`hero-slide${i === atual ? ' ativo' : ''}`} aria-hidden={i !== atual}>
          <Image src={foto.src} alt={foto.alt} fill sizes="(max-width: 980px) 520px, 460px" priority={i === 0} />
        </div>
      ))}
      <div className="hero-dots" role="group" aria-label="Fotos do escritório">
        {FOTOS.map((foto, i) => (
          <button
            key={foto.src}
            type="button"
            className={i === atual ? 'ativo' : undefined}
            aria-label={`Mostrar foto ${i + 1} de ${FOTOS.length}`}
            aria-pressed={i === atual}
            onClick={() => setAtual(i)}
          />
        ))}
      </div>
    </div>
  );
}
