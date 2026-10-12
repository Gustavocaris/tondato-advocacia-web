import type { Post } from '@/types/blog';

/* Posts de exemplo enquanto o blog não está conectado ao Sanity.io. */
export const POSTS_MOCK: Post[] = [
  {
    id: 'mock-1',
    titulo: 'O INSS negou meu benefício: quais são os próximos passos?',
    slug: 'inss-negou-meu-beneficio',
    resumo:
      'Entenda a diferença entre o recurso administrativo e a ação judicial, os prazos envolvidos e quais documentos reunir antes de recorrer.',
    data: '2026-09-18',
    capaUrl: '/img/reuniao-tondato.jpg',
    categoria: 'Previdenciário',
  },
  {
    id: 'mock-2',
    titulo: 'Aposentadoria híbrida: como somar o tempo rural e o urbano',
    slug: 'aposentadoria-hibrida-tempo-rural-e-urbano',
    resumo:
      'Quem trabalhou parte da vida no campo e parte na cidade pode usar os dois períodos para completar a carência. Veja como funciona.',
    data: '2026-08-27',
    capaUrl: '/img/socias-tondato.jpg',
    categoria: 'Previdenciário',
  },
  {
    id: 'mock-3',
    titulo: 'BPC/LOAS: quem tem direito e como fazer o pedido',
    slug: 'bpc-loas-quem-tem-direito',
    resumo:
      'O benefício assistencial não exige contribuição ao INSS. Conheça os requisitos de idade, deficiência e renda familiar.',
    data: '2026-08-05',
    capaUrl: '/img/equipe-tondato.jpg',
    categoria: 'Previdenciário',
  },
  {
    id: 'mock-4',
    titulo: 'Prazo para ação trabalhista: o que muda depois que o contrato termina',
    slug: 'prazo-para-acao-trabalhista',
    resumo:
      'São 2 anos para entrar com a ação e até 5 anos de direitos que podem ser cobrados. Saiba como os prazos são contados.',
    data: '2026-07-14',
    capaUrl: '/img/og-tondato.jpg',
    categoria: 'Trabalhista',
  },
];
