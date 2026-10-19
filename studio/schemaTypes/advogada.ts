import {UserIcon} from '@sanity/icons/User'
import {defineArrayMember, defineField, defineType} from 'sanity'

/*
 * Advogada da equipe. Os campos espelham src/types/equipe.ts no site.
 * Textos seguem o Provimento 205/2021 da OAB: tom informativo, sem autopromoção.
 */

export const advogada = defineType({
  name: 'advogada',
  title: 'Advogada',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({name: 'nome', title: 'Nome', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'oab',
      title: 'Inscrição na OAB',
      description: 'Ex.: OAB/PR 12.345',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'formacao',
      title: 'Formação',
      description: 'Um item por curso (graduação, pós-graduação…).',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'bio',
      title: 'Trajetória profissional',
      description: 'Tom informativo, sem promessa de resultado (regras da OAB).',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'foto',
      title: 'Foto',
      description: 'Retrato vertical 3:4 (ideal a partir de 900×1200px).',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Descrição da foto',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ordem',
      title: 'Ordem de exibição',
      description: 'Menor número aparece primeiro.',
      type: 'number',
      initialValue: 1,
    }),
  ],
  orderings: [{title: 'Ordem de exibição', name: 'ordemAsc', by: [{field: 'ordem', direction: 'asc'}]}],
  preview: {
    select: {title: 'nome', subtitle: 'oab', media: 'foto'},
  },
})
