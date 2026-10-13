'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MENU_LINKS, SITE } from '@/lib/site';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);
  const [overlayVisivel, setOverlayVisivel] = useState(false);
  const [overlayOn, setOverlayOn] = useState(false);
  const [rolou, setRolou] = useState(false);
  const [secaoAtiva, setSecaoAtiva] = useState<string | null>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const fecharMenu = useCallback(() => setAberto(false), []);

  /* ---------- Menu mobile: overlay com fade e trava de rolagem ---------- */
  useEffect(() => {
    if (aberto) {
      setOverlayVisivel(true);
      const raf = requestAnimationFrame(() => setOverlayOn(true));
      document.documentElement.style.overflow = 'hidden';
      return () => cancelAnimationFrame(raf);
    }
    setOverlayOn(false);
    document.documentElement.style.overflow = '';
    const t = setTimeout(() => setOverlayVisivel(false), 300);
    return () => clearTimeout(t);
  }, [aberto]);

  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        fecharMenu();
        burgerRef.current?.focus();
      }
    };
    const aoRedimensionar = () => {
      if (window.innerWidth > 980) fecharMenu();
    };
    document.addEventListener('keydown', aoTeclar);
    window.addEventListener('resize', aoRedimensionar);
    return () => {
      document.removeEventListener('keydown', aoTeclar);
      window.removeEventListener('resize', aoRedimensionar);
    };
  }, [aberto, fecharMenu]);

  /* ---------- Sombra do cabeçalho ao rolar ---------- */
  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 10);
    window.addEventListener('scroll', aoRolar, { passive: true });
    aoRolar();
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  /* ---------- Destaca no menu a seção visível (somente na home) ---------- */
  useEffect(() => {
    setSecaoAtiva(null);
    if (pathname !== '/' || !('IntersectionObserver' in window)) return;
    const secoes = MENU_LINKS.filter((l) => l.href.startsWith('/#'))
      .map((l) => document.getElementById(l.href.slice(2)))
      .filter((s): s is HTMLElement => s !== null);
    const obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((en) => {
          if (en.isIntersecting) setSecaoAtiva(en.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    secoes.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [pathname]);

  const estaAtivo = (href: string) =>
    href.startsWith('/#') ? pathname === '/' && secaoAtiva === href.slice(2) : pathname.startsWith(href);

  return (
    <>
      <header id="topo-header" className={rolou ? 'rolou' : undefined}>
        <div className="wrap nav">
          <Link href="/#topo" className="brand" aria-label={`${SITE.nome}, início`}>
            <Image src="/img/logo-tondato.png" alt={SITE.nome} width={600} height={357} priority />
          </Link>
          <nav className={`menu${aberto ? ' aberto' : ''}`} id="menu" aria-label="Menu principal">
            {MENU_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={estaAtivo(l.href) ? 'ativo' : undefined} onClick={fecharMenu}>
                {l.label}
              </Link>
            ))}
            <a className="btn btn-wine menu-cta" href={SITE.whatsappUrl} target="_blank" rel="noopener" onClick={fecharMenu}>
              Falar no WhatsApp
            </a>
          </nav>
          <div className="nav-acoes">
            <ThemeToggle />
            <a className="btn btn-wine nav-cta" href={SITE.whatsappUrl} target="_blank" rel="noopener">
              WhatsApp
            </a>
          </div>
          <button
            ref={burgerRef}
            className="burger"
            id="burger"
            type="button"
            aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={aberto}
            aria-controls="menu"
            onClick={() => setAberto((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
      <div className={`overlay${overlayOn ? ' on' : ''}`} id="overlay" hidden={!overlayVisivel} onClick={fecharMenu} />
    </>
  );
}
