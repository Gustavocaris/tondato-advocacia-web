'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { SITE } from '@/lib/site';

type Escolha = 'aceito' | 'recusado' | 'ciente';

const CHAVE = 'cookies';
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;
/** Disparado pelo botão "Preferências de cookies" do rodapé para reabrir o aviso. */
export const EVENTO_PREFERENCIAS = 'preferencias-cookies';

function lerEscolha(): Escolha | null {
  try {
    const v = localStorage.getItem(CHAVE);
    return v === 'aceito' || v === 'recusado' || v === 'ciente' ? v : null;
  } catch {
    return null;
  }
}

/*
 * Aviso de privacidade (LGPD). Sem NEXT_PUBLIC_CLARITY_ID é só informativo ("Entendi").
 * Com ele, pede consentimento: o Microsoft Clarity só é carregado depois de "Aceitar".
 */
export default function AvisoCookies() {
  const [escolha, setEscolha] = useState<Escolha | null>(null);
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    const salva = lerEscolha();
    // "ciente" não é consentimento: se o Clarity for ativado depois, o aviso volta a aparecer.
    if (salva && !(CLARITY_ID && salva === 'ciente')) setEscolha(salva);
    else setAberto(true);
    const reabrir = () => setAberto(true);
    window.addEventListener(EVENTO_PREFERENCIAS, reabrir);
    return () => window.removeEventListener(EVENTO_PREFERENCIAS, reabrir);
  }, []);

  const decidir = (nova: Escolha) => {
    try {
      localStorage.setItem(CHAVE, nova);
    } catch {}
    setAberto(false);
    // O Clarity já carregado só sai da página recarregando.
    if (escolha === 'aceito' && nova === 'recusado') return window.location.reload();
    setEscolha(nova);
  };

  const politica = (
    <a href={SITE.politicaPrivacidadeUrl} download>
      Política de Privacidade
    </a>
  );

  return (
    <>
      {CLARITY_ID && escolha === 'aceito' && (
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script",${JSON.stringify(CLARITY_ID)});window.clarity("consentv2",{ad_Storage:"denied",analytics_Storage:"granted"});`}
        </Script>
      )}
      {aberto && (
        <div className="aviso-cookies" role="region" aria-label="Aviso de privacidade">
          {CLARITY_ID ? (
            <p>
              Usamos cookies de análise (Microsoft Clarity) para entender como o site é usado e melhorá-lo. Eles só são
              ativados se você aceitar. Saiba mais na {politica}.
            </p>
          ) : (
            <p>
              Este site não usa cookies de rastreamento. Os dados enviados pelo formulário de contato são tratados
              conforme a nossa {politica}.
            </p>
          )}
          <div className="aviso-cookies-acoes">
            {CLARITY_ID ? (
              <>
                <button type="button" className="btn btn-ghost" onClick={() => decidir('recusado')}>
                  Recusar
                </button>
                <button type="button" className="btn btn-wine" onClick={() => decidir('aceito')}>
                  Aceitar
                </button>
              </>
            ) : (
              <button type="button" className="btn btn-wine" onClick={() => decidir('ciente')}>
                Entendi
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
