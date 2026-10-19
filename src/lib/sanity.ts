import { createClient, type QueryParams } from '@sanity/client';

/*
 * Cliente do Sanity.io. Sem NEXT_PUBLIC_SANITY_PROJECT_ID o site continua lendo
 * os dados locais de src/data — assim o CI e o desenvolvimento rodam sem configuração.
 */

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export const sanityAtivo = Boolean(projectId);

const client = createClient({
  projectId: projectId ?? 'sem-projeto',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2026-10-01',
  // Sem CDN: as páginas são estáticas e só consultam a API no build ou após o webhook,
  // que chega antes de o CDN do Sanity atualizar.
  useCdn: false,
  perspective: 'published',
});

/** Rede de segurança: se um webhook falhar, o conteúdo se atualiza sozinho em até 1 hora. */
const REVALIDAR_A_CADA = 3600;

/**
 * Consulta GROQ com cache do Next. As tags são invalidadas pelo webhook do Sanity
 * (src/app/api/revalidate/route.ts) quando um documento é publicado.
 */
export function buscar<T>(query: string, params: QueryParams = {}, tags: string[] = []): Promise<T> {
  return client.fetch<T>(query, params, { next: { tags, revalidate: REVALIDAR_A_CADA } });
}
