# Sanity Studio — Tondato Advogados

Painel onde o escritório publica os artigos do blog. Os demais dados do site (equipe, OAB, contato) são mantidos pelos desenvolvedores, no código.
Projeto Sanity `2ousxa3t`, dataset `production`.

## Para quem edita o conteúdo

Acesse o Studio em **https://tondato.sanity.studio** e entre com a conta convidada.

**Novo artigo:** *Artigo* → **+** → preencha título, clique em **Generate** no endereço, escolha a categoria, escreva o resumo, envie a capa (com a descrição da imagem) e o texto. Na aba **SEO**, informe as palavras-chave (a primeira é a principal). Clique em **Publish**. O site é atualizado em poucos segundos.

**No texto do artigo**, a barra do editor tem negrito, itálico, sublinhado, destaque (marca-texto), link, listas, citação e imagem. Para criar um link, selecione o trecho e clique no ícone de corrente; links para outros sites abrem em nova aba.

**Avisos amarelos** não impedem a publicação: são dicas de SEO (título longo, resumo fora do tamanho ideal, palavra-chave principal fora do título/resumo). **Erros vermelhos** são campos obrigatórios.

Os textos devem seguir o Provimento 205/2021 da OAB: tom informativo, sem autopromoção nem promessa de resultado.

## Para quem desenvolve

```bash
npm install
npm run dev       # http://localhost:3333
npm run deploy    # publica o Studio em https://tondato.sanity.studio
```

Os schemas ficam em `schemaTypes/` e espelham os tipos do site (`../src/types`). As regras de SEO de `schemaTypes/seo.ts` são as mesmas de `../src/lib/seo.ts`; mude as duas juntas.

### Importar os dados de exemplo

Cria no dataset os posts de exemplo de `../src/data/posts.ts` (com as capas de `../public`). Pode rodar de novo sem duplicar.

```bash
npx sanity login
npx sanity exec scripts/importar-mocks.ts --with-user-token
```

### Webhook que atualiza o site

Em [sanity.io/manage](https://www.sanity.io/manage) → projeto → **API** → **Webhooks** → **Create webhook**:

| Campo | Valor |
|---|---|
| URL | `https://<domínio do site>/api/revalidate` |
| Dataset | `production` |
| Trigger on | Create, Update, Delete |
| Filter | `_type == "post"` |
| Projection | `{_type}` |
| HTTP method | POST |
| Secret | o mesmo valor de `SANITY_REVALIDATE_SECRET` na Vercel |

O dataset precisa ser **público** (leitura sem token), pois o site consulta a API sem credenciais.
