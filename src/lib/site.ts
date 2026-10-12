/* Dados de contato e informações do escritório usados em todo o site. */

export const SITE = {
  nome: 'Tondato Advogados Associados',
  descricaoCurta: 'Direito Previdenciário e Trabalhista · Toledo/PR',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  whatsappUrl: 'https://wa.me/5545999561146',
  whatsappExibicao: '(45) 99956-1146',
  telefone: '+55 45 99956-1146',
  email: 'tondatoadvocacia@gmail.com',
  endereco: {
    rua: 'Rua Barão do Rio Branco, 2242',
    cidade: 'Toledo',
    uf: 'PR',
    mapaUrl:
      'https://www.google.com/maps/search/?api=1&query=Rua+Bar%C3%A3o+do+Rio+Branco%2C+2242%2C+Toledo+PR',
  },
} as const;

/* Links do menu principal. `href` com "/#" funciona tanto na home quanto nas demais páginas. */
export const MENU_LINKS = [
  { href: '/#areas', label: 'Áreas de Atuação' },
  { href: '/#diferenciais', label: 'Por que a Tondato' },
  { href: '/#equipe', label: 'Equipe' },
  { href: '/#duvidas', label: 'Dúvidas' },
  { href: '/blog', label: 'Blog' },
  { href: '/#contato', label: 'Contato' },
] as const;
