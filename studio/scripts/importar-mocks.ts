import {createReadStream} from 'node:fs'
import {basename, resolve} from 'node:path'
import {getCliClient} from 'sanity/cli'
import {EQUIPE} from '../../src/data/equipe'
import {POSTS_MOCK} from '../../src/data/posts'

/*
 * Importa para o dataset os posts e a equipe de src/data (dados de exemplo do site).
 * Pode rodar mais de uma vez: pula artigos com slug já existente e advogadas com a mesma ordem.
 *
 *   cd studio && npx sanity exec scripts/importar-mocks.ts --with-user-token
 */

const client = getCliClient({apiVersion: '2026-10-01'})
// O comando roda de dentro de studio/.
const PUBLIC = resolve(process.cwd(), '../public')

const enviadas = new Map<string, string>()

/** Sobe uma imagem de public/ (uma vez por arquivo) e devolve o _id do asset. */
async function enviarImagem(caminho: string): Promise<string> {
  const existente = enviadas.get(caminho)
  if (existente) return existente
  const asset = await client.assets.upload('image', createReadStream(resolve(PUBLIC, `.${caminho}`)), {
    filename: basename(caminho),
  })
  enviadas.set(caminho, asset._id)
  return asset._id
}

function imagem(assetId: string, alt: string) {
  return {_type: 'image', asset: {_type: 'reference', _ref: assetId}, alt}
}

async function importarPosts() {
  for (const post of POSTS_MOCK) {
    const existe = await client.fetch<boolean>(`count(*[_type == "post" && slug.current == $slug]) > 0`, {
      slug: post.slug,
    })
    if (existe) {
      console.log(`- artigo já existe: ${post.slug}`)
      continue
    }
    const capa = await enviarImagem(post.capaUrl)
    await client.create({
      _type: 'post',
      titulo: post.titulo,
      slug: {_type: 'slug', current: post.slug},
      categoria: post.categoria,
      publishedAt: post.data,
      resumo: post.resumo,
      capa: imagem(capa, post.capaAlt),
      palavrasChave: post.palavrasChave,
      ...(post.seoTitulo && {seoTitulo: post.seoTitulo}),
      ...(post.seoDescricao && {seoDescricao: post.seoDescricao}),
    })
    console.log(`+ artigo criado: ${post.slug}`)
  }
}

async function importarEquipe() {
  for (const [i, advogada] of EQUIPE.entries()) {
    const ordem = i + 1
    const existe = await client.fetch<boolean>(`count(*[_type == "advogada" && ordem == $ordem]) > 0`, {ordem})
    if (existe) {
      console.log(`- advogada já existe na posição ${ordem}`)
      continue
    }
    const foto = await enviarImagem(advogada.foto)
    await client.create({
      _type: 'advogada',
      nome: advogada.nome,
      oab: advogada.oab,
      formacao: advogada.formacao,
      bio: advogada.bio,
      foto: imagem(foto, advogada.fotoAlt),
      ordem,
    })
    console.log(`+ advogada criada na posição ${ordem}`)
  }
}

importarPosts()
  .then(importarEquipe)
  .catch((erro) => {
    console.error(erro)
    process.exit(1)
  })
