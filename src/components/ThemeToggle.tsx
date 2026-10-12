'use client';

import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

type Tema = 'light' | 'dark';

const CHAVE = 'tema';
const temaAtual = (): Tema => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

function lerEscolha(): Tema | null {
  try {
    const v = localStorage.getItem(CHAVE);
    return v === 'dark' || v === 'light' ? v : null;
  } catch {
    return null;
  }
}

/*
 * Alterna entre tema claro e escuro. O tema inicial é definido antes da pintura pelo
 * script inline do layout (escolha salva ou, na falta dela, o tema do sistema).
 */
export default function ThemeToggle() {
  const [tema, setTema] = useState<Tema | null>(null);

  useEffect(() => {
    setTema(temaAtual());
    // Sem escolha salva, acompanha mudanças do tema do sistema.
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const aoMudar = (e: MediaQueryListEvent) => {
      if (lerEscolha()) return;
      const novo: Tema = e.matches ? 'dark' : 'light';
      document.documentElement.dataset.theme = novo;
      setTema(novo);
    };
    mq.addEventListener('change', aoMudar);
    return () => mq.removeEventListener('change', aoMudar);
  }, []);

  const alternar = () => {
    const novo: Tema = temaAtual() === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem(CHAVE, novo);
    } catch {}
    const aplicar = () => {
      document.documentElement.dataset.theme = novo;
      flushSync(() => setTema(novo));
    };
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduzir && document.startViewTransition) document.startViewTransition(aplicar);
    else aplicar();
  };

  const escuro = tema === 'dark';
  return (
    <button
      type="button"
      className="tema-toggle"
      onClick={alternar}
      aria-label={tema === null ? 'Alternar tema' : escuro ? 'Ativar tema claro' : 'Ativar tema escuro'}
      aria-pressed={tema === null ? undefined : escuro}
    >
      <svg
        className="tema-lua"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      <svg
        className="tema-sol"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    </button>
  );
}
