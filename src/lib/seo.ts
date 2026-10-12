import type { Post } from '@/types/blog';

/* Checagens de SEO dos artigos do blog — o build de produção avisa sobre cada problema. */

const TITULO_MAX = 60;
const DESCRICAO_MIN = 70;
const DESCRICAO_MAX = 160;

export function seoTitulo(post: Post): string {
  return post.seoTitulo?.trim() || post.titulo;
}

export function seoDescricao(post: Post): string {
  return post.seoDescricao?.trim() || post.resumo;
}

/** Minúsculas, sem acentos e só letras/números separados por espaço. */
function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/**
 * A palavra-chave principal conta como usada quando todas as suas palavras significativas
 * (3+ letras) aparecem no título, no slug ou na descrição.
 */
function usaPalavraChave(post: Post, palavraChave: string): boolean {
  const texto = ` ${normalizar(`${seoTitulo(post)} ${post.titulo} ${post.slug} ${seoDescricao(post)}`)} `;
  const palavras = normalizar(palavraChave)
    .split(' ')
    .filter((p) => p.length >= 3);
  return palavras.length > 0 && palavras.every((p) => texto.includes(` ${p} `));
}

export function verificarSeoPost(post: Post): string[] {
  const avisos: string[] = [];
  const titulo = seoTitulo(post);
  const descricao = seoDescricao(post);
  const principal = post.palavrasChave[0]?.trim();

  if (!principal) {
    avisos.push('sem palavras-chave (palavrasChave)');
  } else if (!usaPalavraChave(post, principal)) {
    avisos.push(`a palavra-chave principal "${principal}" não aparece no título, no slug nem no resumo`);
  }
  if (titulo.length > TITULO_MAX) {
    avisos.push(`título com ${titulo.length} caracteres (máx. ${TITULO_MAX}) — use seoTitulo`);
  }
  if (descricao.length < DESCRICAO_MIN || descricao.length > DESCRICAO_MAX) {
    avisos.push(`descrição com ${descricao.length} caracteres (ideal ${DESCRICAO_MIN}–${DESCRICAO_MAX}) — use seoDescricao`);
  }
  if (!post.capaAlt.trim()) {
    avisos.push('capa sem descrição (capaAlt)');
  }
  return avisos;
}
