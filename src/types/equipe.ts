/**
 * Advogada da equipe. Espelha o schema `advogada` que será criado no Sanity.io.
 */
export interface Advogada {
  id: string;
  nome: string;
  /** Inscrição na OAB, ex.: "OAB/PR 12.345". */
  oab: string;
  formacao: string[];
  bio: string;
  foto: string;
  fotoAlt: string;
}
