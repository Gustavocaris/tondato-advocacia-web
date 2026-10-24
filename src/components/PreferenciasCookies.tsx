'use client';

import { EVENTO_PREFERENCIAS } from './AvisoCookies';

/* Botão do rodapé que reabre o aviso de cookies para o visitante mudar a escolha. */
export default function PreferenciasCookies() {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(EVENTO_PREFERENCIAS))}>
      Preferências de cookies
    </button>
  );
}
