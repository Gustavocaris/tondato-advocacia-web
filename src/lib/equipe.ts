import { EQUIPE } from '@/data/equipe';
import type { Advogada } from '@/types/equipe';

/* Acesso aos dados da equipe — do arquivo local, editado por nós (não fica no Sanity). */

const PENDENTE = '[PREENCHER]';

let pendenciasVerificadas = false;

/** Avisa no build de produção (uma vez) enquanto houver dados a preencher. */
function avisarPendencias(equipe: Advogada[]) {
  if (pendenciasVerificadas || process.env.NODE_ENV !== 'production') return;
  pendenciasVerificadas = true;
  if (equipe.some(temPendencias)) {
    console.warn(`[equipe] Há campos "${PENDENTE}" em src/data/equipe.ts — preencha antes de publicar.`);
  }
}

export async function getEquipe(): Promise<Advogada[]> {
  avisarPendencias(EQUIPE);
  return EQUIPE;
}

export function temPendencias(advogada: Advogada): boolean {
  return JSON.stringify(advogada).includes(PENDENTE);
}
