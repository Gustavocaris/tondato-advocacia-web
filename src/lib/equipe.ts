import { EQUIPE } from '@/data/equipe';
import type { Advogada } from '@/types/equipe';
import { buscar, sanityAtivo } from './sanity';

/* Acesso aos dados da equipe — do Sanity.io quando configurado; senão, do arquivo local. */

const PENDENTE = '[PREENCHER]';

const QUERY = `*[_type == "advogada"] | order(ordem asc, nome asc) {
  "id": _id,
  nome,
  oab,
  "formacao": coalesce(formacao, []),
  bio,
  "foto": foto.asset->url,
  "fotoAlt": coalesce(foto.alt, "")
}`;

let pendenciasVerificadas = false;

/** Avisa no build de produção (uma vez) enquanto houver dados a preencher. */
function avisarPendencias(equipe: Advogada[]) {
  if (pendenciasVerificadas || process.env.NODE_ENV !== 'production') return;
  pendenciasVerificadas = true;
  if (equipe.some(temPendencias)) {
    const origem = sanityAtivo ? 'no Sanity' : 'em src/data/equipe.ts';
    console.warn(`[equipe] Há campos "${PENDENTE}" ${origem} — preencha antes de publicar.`);
  }
}

export async function getEquipe(): Promise<Advogada[]> {
  const equipe = sanityAtivo ? await buscar<Advogada[]>(QUERY, {}, ['advogada']) : EQUIPE;
  avisarPendencias(equipe);
  return equipe;
}

export function temPendencias(advogada: Advogada): boolean {
  return JSON.stringify(advogada).includes(PENDENTE);
}
