import type { Metadata, Viewport } from 'next';
import { Fraunces, Work_Sans } from 'next/font/google';
import type { ReactNode } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ToTop from '@/components/ToTop';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { SITE } from '@/lib/site';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
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
  robots: { index: true, follow: true },
  icons: { icon: '/img/favicon.png', apple: '/img/apple-touch-icon.png' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: SITE.nome,
    title: `${SITE.nome} | Direito Previdenciário e Trabalhista em Toledo/PR`,
    description:
      'Advocacia previdenciária e trabalhista em Toledo/PR. Aposentadorias, auxílio-doença, BPC/LOAS, revisões e direitos do trabalhador.',
    images: ['/img/og-tondato.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#8F092A',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: SITE.nome,
  description: 'Escritório de advocacia em Direito Previdenciário e Direito Trabalhista em Toledo/PR.',
  url: SITE.url,
  image: `${SITE.url}/img/og-tondato.jpg`,
  logo: `${SITE.url}/img/logo-tondato.png`,
  telephone: SITE.telefone,
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
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${workSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Ativa as animações de entrada (.js .reveal) antes da primeira pintura. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
