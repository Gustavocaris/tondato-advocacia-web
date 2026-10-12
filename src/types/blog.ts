/**
 * Formato de um post do blog.
 * Espelha o schema `post` que será criado no Sanity.io — a query GROQ
 * deve projetar os campos com estes mesmos nomes (ver src/lib/blog.ts).
 */
export type Categoria = 'Previdenciário' | 'Trabalhista';

export interface Post {
  id: string;
  titulo: string;
  slug: string;
  resumo: string;
  /** Data de publicação em ISO 8601 (ex.: "2026-09-18"). */
  data: string;
  capaUrl: string;
  categoria: Categoria;
}
