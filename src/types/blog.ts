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
  /** Descrição da imagem de capa (acessibilidade e Google Imagens). */
  capaAlt: string;
  categoria: Categoria;
  /**
   * Palavras-chave do artigo; a primeira é a principal. Ela deve aparecer no título,
   * no slug ou no resumo — o build avisa quando não aparece (ver src/lib/seo.ts).
   */
  palavrasChave: string[];
  /** Título para o Google (até ~60 caracteres). Se vazio, usa `titulo`. */
  seoTitulo?: string;
  /** Descrição para o Google (70–160 caracteres). Se vazio, usa `resumo`. */
  seoDescricao?: string;
  /** Data da última atualização em ISO 8601. */
  atualizadoEm?: string;
}
