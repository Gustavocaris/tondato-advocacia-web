import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import { revalidateTag } from 'next/cache';

/*
 * Webhook do Sanity: quando um artigo é publicado, alterado ou removido,
 * invalida o cache das páginas que listam ou exibem artigos.
 * Configuração do webhook no painel do Sanity: ver studio/README.md.
 */

const TAGS = ['post'];

export async function POST(req: Request) {
  const segredo = process.env.SANITY_REVALIDATE_SECRET;
  if (!segredo) return new Response('SANITY_REVALIDATE_SECRET não configurado', { status: 500 });

  const corpo = await req.text();
  const assinatura = req.headers.get(SIGNATURE_HEADER_NAME) ?? '';
  if (!(await isValidSignature(corpo, assinatura, segredo))) {
    return new Response('Assinatura inválida', { status: 401 });
  }

  let tipo: unknown;
  try {
    tipo = (JSON.parse(corpo) as { _type?: unknown })._type;
  } catch {
    return new Response('Corpo inválido', { status: 400 });
  }
  if (typeof tipo !== 'string' || !TAGS.includes(tipo)) {
    return new Response('Tipo de documento ignorado', { status: 400 });
  }

  revalidateTag(tipo, { expire: 0 });
  return Response.json({ revalidado: tipo });
}
