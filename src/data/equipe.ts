import type { Advogada } from '@/types/equipe';

/*
 * Dados das advogadas. Substitua todo trecho "[PREENCHER]" pelas informações reais
 * antes de publicar — o build de produção avisa enquanto houver pendências.
 * Fotos: retrato vertical 3:4 em public/img/equipe/ (ideal ≥ 900×1200px).
 */
export const EQUIPE: Advogada[] = [
  {
    id: 'advogada-1',
    nome: '[PREENCHER] Nome da advogada',
    oab: 'OAB/PR [PREENCHER]',
    formacao: ['[PREENCHER] Graduação em Direito — instituição', '[PREENCHER] Pós-graduação — área e instituição'],
    bio: '[PREENCHER] Breve trajetória profissional: áreas de atuação, tempo de experiência e forma de trabalho com os clientes.',
    foto: '/img/equipe/advogada-1.jpg',
    fotoAlt: 'Advogada da Tondato Advogados Associados',
  },
  {
    id: 'advogada-2',
    nome: '[PREENCHER] Nome da advogada',
    oab: 'OAB/PR [PREENCHER]',
    formacao: ['[PREENCHER] Graduação em Direito — instituição', '[PREENCHER] Pós-graduação — área e instituição'],
    bio: '[PREENCHER] Breve trajetória profissional: áreas de atuação, tempo de experiência e forma de trabalho com os clientes.',
    foto: '/img/equipe/advogada-2.jpg',
    fotoAlt: 'Advogada da Tondato Advogados Associados',
  },
];
