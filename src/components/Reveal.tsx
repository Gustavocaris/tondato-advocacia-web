'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

interface RevealProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/* Animação suave ao aparecer: aplica `.visivel` quando o elemento entra na tela. */
export default function Reveal({ as: Tag = 'div', className, children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setVisivel(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((en) => en.isIntersecting)) {
          setVisivel(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const classes = ['reveal', className, visivel && 'visivel'].filter(Boolean).join(' ');
  return (
    <Tag ref={ref} className={classes}>
      {children}
    </Tag>
  );
}
