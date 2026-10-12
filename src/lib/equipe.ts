import { EQUIPE } from '@/data/equipe';
import type { Advogada } from '@/types/equipe';

/* Acesso aos dados da equipe — hoje do arquivo local; na integração, consulta ao Sanity. */

const PENDENTE = '[PREENCHER]';

export async function getEquipe(): Promise<Advogada[]> {
  if (process.env.NODE_ENV === 'production' && EQUIPE.some(temPendencias)) {
    console.warn(`[equipe] Há campos "${PENDENTE}" em src/data/equipe.ts — preencha antes de publicar.`);
  }
  return EQUIPE;
}

export function temPendencias(advogada: Advogada): boolean {
  return JSON.stringify(advogada).includes(PENDENTE);
}
