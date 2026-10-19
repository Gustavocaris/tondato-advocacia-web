/*
 * Regras de SEO dos artigos, iguais às de src/lib/seo.ts no site: o Studio mostra
 * como aviso (sem impedir a publicação) o mesmo que o build do site avisa.
 */

export const TITULO_MAX = 60
export const DESCRICAO_MIN = 70
export const DESCRICAO_MAX = 160

/** Minúsculas, sem acentos e só letras/números separados por espaço. */
function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

export interface CamposSeo {
  titulo?: string
  slug?: {current?: string}
  resumo?: string
  seoTitulo?: string
  seoDescricao?: string
}

/**
 * A palavra-chave principal conta como usada quando todas as suas palavras significativas
 * (3+ letras) aparecem no título, no slug ou na descrição.
 */
export function usaPalavraChave(post: CamposSeo, palavraChave: string): boolean {
  const campos = [post.seoTitulo, post.titulo, post.slug?.current, post.seoDescricao, post.resumo]
  const texto = ` ${normalizar(campos.filter(Boolean).join(' '))} `
  const palavras = normalizar(palavraChave)
    .split(' ')
    .filter((p) => p.length >= 3)
  return palavras.length > 0 && palavras.every((p) => texto.includes(` ${p} `))
}
