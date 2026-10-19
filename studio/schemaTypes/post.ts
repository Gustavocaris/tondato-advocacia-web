import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {type CamposSeo, DESCRICAO_MAX, DESCRICAO_MIN, TITULO_MAX, usaPalavraChave} from './seo'

/* Artigo do blog. Os campos espelham src/types/blog.ts no site. */

export const CATEGORIAS = ['Previdenciário', 'Trabalhista'] as const

export const post = defineType({
  name: 'post',
  title: 'Artigo',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'conteudo', title: 'Conteúdo', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      group: 'conteudo',
      validation: (rule) => [
        rule.required(),
        rule.custom((titulo, {document}) =>
          !document?.seoTitulo && titulo && titulo.length > TITULO_MAX
            ? `Título com ${titulo.length} caracteres: o Google corta depois de ${TITULO_MAX}. Preencha o "Título para o Google" na aba SEO.`
            : true,
        ).warning(),
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Endereço (slug)',
      description: 'Parte final do link do artigo. Clique em "Generate" para criar a partir do título.',
      type: 'slug',
      group: 'conteudo',
      options: {source: 'titulo', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categoria',
      title: 'Categoria',
      type: 'string',
      group: 'conteudo',
      options: {list: [...CATEGORIAS], layout: 'radio', direction: 'horizontal'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data de publicação',
      type: 'date',
      group: 'conteudo',
      options: {dateFormat: 'DD/MM/YYYY'},
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'resumo',
      title: 'Resumo',
      description: 'Aparece na lista do blog e abaixo do título do artigo.',
      type: 'text',
      rows: 3,
      group: 'conteudo',
      validation: (rule) => [
        rule.required(),
        rule.custom((resumo, {document}) => {
          if (document?.seoDescricao || !resumo) return true
          return resumo.length < DESCRICAO_MIN || resumo.length > DESCRICAO_MAX
            ? `Resumo com ${resumo.length} caracteres: o ideal para o Google é entre ${DESCRICAO_MIN} e ${DESCRICAO_MAX}. Ajuste o texto ou preencha a "Descrição para o Google" na aba SEO.`
            : true
        }).warning(),
      ],
    }),
    defineField({
      name: 'capa',
      title: 'Imagem de capa',
      type: 'image',
      group: 'conteudo',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Descrição da imagem',
          description: 'O que aparece na foto. Usado por leitores de tela e pelo Google Imagens.',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'corpo',
      title: 'Texto do artigo',
      type: 'array',
      group: 'conteudo',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Parágrafo', value: 'normal'},
            {title: 'Subtítulo', value: 'h2'},
            {title: 'Subtítulo menor', value: 'h3'},
            {title: 'Citação', value: 'blockquote'},
          ],
          lists: [
            {title: 'Marcadores', value: 'bullet'},
            {title: 'Numerada', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Negrito', value: 'strong'},
              {title: 'Itálico', value: 'em'},
            ],
            annotations: [
              defineArrayMember({
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'Endereço',
                    type: 'url',
                    validation: (rule) => rule.required().uri({scheme: ['http', 'https', 'mailto', 'tel'], allowRelative: true}),
                  }),
                ],
              }),
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Descrição da imagem',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'legenda', title: 'Legenda', type: 'string'}),
          ],
        }),
      ],
    }),
    defineField({
      name: 'palavrasChave',
      title: 'Palavras-chave',
      description: 'A primeira é a principal: ela deve aparecer no título, no endereço ou no resumo.',
      type: 'array',
      group: 'seo',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
      validation: (rule) => [
        rule.required().min(1),
        rule.custom((palavras, {document}) => {
          const principal = (palavras as string[] | undefined)?.[0]?.trim()
          if (!principal || !document) return true
          return usaPalavraChave(document as CamposSeo, principal)
            ? true
            : `A palavra-chave principal "${principal}" não aparece no título, no endereço nem no resumo.`
        }).warning(),
      ],
    }),
    defineField({
      name: 'seoTitulo',
      title: 'Título para o Google',
      description: `Opcional. Use quando o título passar de ${TITULO_MAX} caracteres.`,
      type: 'string',
      group: 'seo',
      validation: (rule) => rule.max(TITULO_MAX).warning(`O Google corta títulos com mais de ${TITULO_MAX} caracteres.`),
    }),
    defineField({
      name: 'seoDescricao',
      title: 'Descrição para o Google',
      description: `Opcional. Se vazio, usa o resumo. Ideal: ${DESCRICAO_MIN}–${DESCRICAO_MAX} caracteres.`,
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (rule) => [
        rule.min(DESCRICAO_MIN).warning(`Curta demais: o ideal é a partir de ${DESCRICAO_MIN} caracteres.`),
        rule.max(DESCRICAO_MAX).warning(`Longa demais: o Google corta depois de ${DESCRICAO_MAX} caracteres.`),
      ],
    }),
  ],
  orderings: [
    {title: 'Mais recentes', name: 'publicacaoDesc', by: [{field: 'publishedAt', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'titulo', categoria: 'categoria', data: 'publishedAt', media: 'capa'},
    prepare: ({title, categoria, data, media}) => ({
      title,
      subtitle: [categoria, data?.split('-').reverse().join('/')].filter(Boolean).join(' · '),
      media,
    }),
  },
})
