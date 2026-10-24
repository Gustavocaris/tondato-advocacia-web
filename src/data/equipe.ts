import type { Advogada } from '@/types/equipe';

/*
 * Dados das advogadas, fornecidos pelo escritório. Use "[PREENCHER]" em campos ainda sem
 * informação real — o build de produção avisa e a advogada fica fora do JSON-LD.
 * Fotos: retrato vertical 3:4 em public/img/equipe/ (ideal ≥ 900×1200px).
 */
export const EQUIPE: Advogada[] = [
  {
    id: 'diana-stela-schneider',
    nome: 'Diana Stela Schneider',
    oab: 'OAB/PR 108.888',
    formacao: [
      'Graduação em Direito pela Pontifícia Universidade Católica do Paraná (PUC/PR)',
      'Pós-graduação em Direito do Agronegócio pelo Centro Universitário Assis Gurgacz',
      'Pós-graduação em Regime Próprio de Previdência Social (RPPS) e Previdência Complementar pela Legale Educacional',
    ],
    bio: 'Advogada com atuação nas diversas áreas do Direito Previdenciário. Formada em Direito pela Pontifícia Universidade Católica do Paraná (PUC/PR), é pós-graduada em Direito do Agronegócio pelo Centro Universitário Assis Gurgacz e em Regime Próprio de Previdência Social (RPPS) e Previdência Complementar pela Legale Educacional.',
    instagram: 'https://www.instagram.com/dianastelaadvogada/',
    foto: '/img/equipe/advogada-1.jpg',
    fotoAlt: 'Diana Stela Schneider, advogada da Tondato Advogados Associados',
  },
  {
    id: 'maria-gabriela-tondato',
    nome: 'Maria Gabriela Tondato',
    oab: 'OAB/PR 102.955',
    formacao: [
      'Graduação em Direito pela Universidade Estadual do Oeste do Paraná (Unioeste)',
      'Pós-graduação em Direito do Trabalho pela EBRADI',
      'Pós-graduação em Direito Público, com ênfase em Direito Previdenciário, pela ESMAFE/RS',
      'Pós-graduação em Direito Tributário pela PUC/RS',
    ],
    bio: 'Advogada à frente do Tondato Advogados Associados, com atuação voltada ao Direito Previdenciário e ao Direito do Trabalho. Dedica-se especialmente a casos de acidentes de trabalho, doenças ocupacionais, auxílio-acidente e indenizações decorrentes de sequelas e incapacidades, atendendo principalmente trabalhadores da indústria, de frigoríficos e da área rural do Oeste do Paraná. Atua também em aposentadorias programadas, urbanas e rurais, e em demandas trabalhistas como insalubridade, periculosidade e reconhecimento de vínculo empregatício. Seu trabalho une análise técnica e atendimento humano, para que cada pessoa conheça os caminhos jurídicos disponíveis para garantir seus direitos. Atendimento presencial em Toledo/PR e on-line.',
    instagram: 'https://www.instagram.com/advmariatondato',
    foto: '/img/equipe/advogada-2.jpg',
    fotoAlt: 'Maria Gabriela Tondato, advogada da Tondato Advogados Associados',
  },
];
