'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/* Expõe em --p (-1 a 1) a posição do bloco em relação ao centro da tela; o CSS usa para o parallax. */
export default function Parallax({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const atualizar = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const meio = window.innerHeight / 2;
      const p = (r.top + r.height / 2 - meio) / (meio + r.height / 2);
      el.style.setProperty('--p', Math.max(-1, Math.min(1, p)).toFixed(3));
    };
    const agendar = () => {
      if (!raf) raf = requestAnimationFrame(atualizar);
    };
    atualizar();
    window.addEventListener('scroll', agendar, { passive: true });
    window.addEventListener('resize', agendar);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', agendar);
      window.removeEventListener('resize', agendar);
    };
  }, []);

  return (
    <div ref={ref} className="parallax">
      {children}
    </div>
  );
}
