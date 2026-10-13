import type { Metadata, Viewport } from 'next';
import { Fraunces, Work_Sans } from 'next/font/google';
import type { ReactNode } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import JsonLd from '@/components/JsonLd';
import ToTop from '@/components/ToTop';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { EQUIPE } from '@/data/equipe';
import { temPendencias } from '@/lib/equipe';
import { SITE } from '@/lib/site';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-fraunces',
  display: 'swap',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `Advogado Previdenciário e Trabalhista em Toledo/PR | ${SITE.nome}`,
    template: `%s | ${SITE.nome}`,
  },
  description:
    'Tondato Advogados Associados, em Toledo/PR: advocacia em Direito Previdenciário (aposentadorias, auxílio-doença, BPC/LOAS, revisões e benefícios negados pelo INSS) e Direito Trabalhista.',
  keywords: [
    'advogado previdenciário Toledo',
    'advogado trabalhista Toledo',
    'advogada Toledo PR',
    'aposentadoria',
    'auxílio-doença',
    'BPC/LOAS',
    'revisão de benefício INSS',
    'benefício negado INSS',
    'direitos trabalhistas',
  ],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  formatDetection: { telephone: false },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
  }),
  icons: { icon: '/img/favicon.png', apple: '/img/apple-touch-icon.png' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: SITE.nome,
    title: `${SITE.nome} | Direito Previdenciário e Trabalhista em Toledo/PR`,
    description:
      'Advocacia previdenciária e trabalhista em Toledo/PR. Aposentadorias, auxílio-doença, BPC/LOAS, revisões e direitos do trabalhador.',
    images: [{ url: '/img/og-tondato.jpg', width: 1200, height: 630, alt: SITE.nome }],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#8F092A',
};

// Só entram no JSON-LD as advogadas com dados reais preenchidos.
const advogadas = EQUIPE.filter((a) => !temPendencias(a)).map((a) => ({
  '@type': 'Person',
  name: a.nome,
  jobTitle: 'Advogada',
}));

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  '@id': `${SITE.url}/#escritorio`,
  name: SITE.nome,
  description: 'Escritório de advocacia em Direito Previdenciário e Direito Trabalhista em Toledo/PR.',
  url: SITE.url,
  image: `${SITE.url}/img/og-tondato.jpg`,
  logo: `${SITE.url}/img/logo-tondato.png`,
  telephone: SITE.telefone,
  hasMap: SITE.endereco.mapaUrl,
  email: SITE.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.endereco.rua,
    addressLocality: SITE.endereco.cidade,
    addressRegion: SITE.endereco.uf,
    addressCountry: 'BR',
  },
  areaServed: ['Toledo', 'Oeste do Paraná'],
  knowsAbout: [
    'Direito Previdenciário',
    'Direito Trabalhista',
    'Aposentadoria',
    'Auxílio-doença',
    'BPC/LOAS',
    'Revisão de benefício do INSS',
  ],
  ...(advogadas.length > 0 && { employee: advogadas }),
};

const temaScript = `(function(){var d=document.documentElement;d.classList.add('js');var t;try{t=localStorage.getItem('tema')}catch(e){}if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t})()`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${workSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Antes da primeira pintura: ativa as animações de entrada (.js) e aplica o tema salvo ou o do sistema. */}
        <script dangerouslySetInnerHTML={{ __html: temaScript }} />
        <JsonLd dados={jsonLd} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <ToTop />
      </body>
    </html>
  );
}
