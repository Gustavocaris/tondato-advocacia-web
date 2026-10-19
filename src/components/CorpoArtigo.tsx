import { PortableText, type PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';
import type { ImagemCorpo, Post } from '@/types/blog';

/* Texto do artigo vindo do Sanity (Portable Text). */

const componentes: PortableTextComponents = {
  types: {
    image: ({ value }: { value: ImagemCorpo }) =>
      value.url ? (
        <figure className="artigo-figura">
          <Image
            src={value.url}
            alt={value.alt ?? ''}
            width={value.dimensoes.width}
            height={value.dimensoes.height}
            sizes="(max-width: 980px) 100vw, 820px"
          />
          {value.legenda && <figcaption>{value.legenda}</figcaption>}
        </figure>
      ) : null,
  },
  marks: {
    highlight: ({ children }) => <mark>{children}</mark>,
    underline: ({ children }) => <u>{children}</u>,
    link: ({ value, children }) => {
      const href: string = value?.href ?? '';
      const externo = /^https?:\/\//.test(href);
      return (
        <a href={href} {...(externo && { target: '_blank', rel: 'noopener noreferrer' })}>
          {children}
        </a>
      );
    },
  },
};

export default function CorpoArtigo({ corpo }: { corpo: NonNullable<Post['corpo']> }) {
  return (
    <div className="artigo-corpo">
      <PortableText value={corpo} components={componentes} />
    </div>
  );
}
