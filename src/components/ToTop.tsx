'use client';

import { useEffect, useState } from 'react';

export default function ToTop() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const aoRolar = () => setOn(window.scrollY > 700);
    window.addEventListener('scroll', aoRolar, { passive: true });
    aoRolar();
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  return (
    <button
      className={`to-top${on ? ' on' : ''}`}
      id="toTop"
      type="button"
      aria-label="Voltar ao topo"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
