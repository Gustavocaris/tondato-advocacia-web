/**
 * Advogada da equipe. Os dados ficam em src/data/equipe.ts.
 */
export interface Advogada {
  id: string;
  nome: string;
  /** Inscrição na OAB, ex.: "OAB/PR 12.345". */
  oab: string;
  formacao: string[];
  bio: string;
  /** URL do perfil no Instagram (opcional). */
  instagram?: string;
  foto: string;
  fotoAlt: string;
}
