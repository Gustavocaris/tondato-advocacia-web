# CI — Integração Contínua com GitHub Actions

Guia rápido de consulta sobre a pipeline do projeto. Arquivo: [`.github/workflows/ci.yml`](../.github/workflows/ci.yml).

## O que é e para que serve

**CI (Continuous Integration)** é verificar automaticamente cada mudança assim que ela chega ao repositório. Em vez de depender de lembrar de rodar os comandos na sua máquina, o GitHub sobe uma máquina limpa, instala o projeto do zero e confere se ele funciona.

Neste projeto não há testes nem linter, então o CI verifica:

1. **Tipos** (`npm run typecheck`): o TypeScript compila sem erros.
2. **Build** (`npm run build`): o Next.js gera todas as páginas sem erros.
3. **Avisos do build**: as mensagens `[seo]` (problemas de SEO nos posts) e `[equipe]` (campos `[PREENCHER]` pendentes) aparecem como avisos amarelos. Elas **não** reprovam o CI.

Se o passo 1 ou o 2 falhar, o CI fica vermelho ✗. Se tudo passar, fica verde ✓.

> O CI **não publica nada**. Quem publica o site é a Vercel, só a partir da `main`. O CI apenas confere.

## Quando roda (gatilhos)

| Gatilho | Quando |
|---|---|
| `push` | Qualquer push, em qualquer branch |
| `pull_request` | PRs abertos para a `staging` ou para a `main` |
| `workflow_dispatch` | Manualmente, pelo botão **Run workflow** na aba Actions |

## Onde ver o resultado

- **Aba Actions** do repositório no GitHub: a lista de execuções. Clique numa delas para ver os jobs e o log de cada passo.
- **Ícone ao lado do commit** (na lista de commits ou na página da branch): 🟡 rodando, ✓ passou, ✗ falhou.
- **No PR**: a seção "Checks" no fim da página.
- **Resumo**: na página da execução, abaixo dos jobs, fica a lista de avisos do build (o *job summary*).
- **Anotações**: os avisos `[seo]`/`[equipe]` também aparecem como "Annotations" amarelas na execução.

## O arquivo, bloco a bloco

```yaml
name: CI
```
O nome que aparece na aba Actions.

```yaml
on:
  push:
  pull_request:
    branches: [staging, main]
  workflow_dispatch:
```
Os **gatilhos** (veja a tabela acima). `push:` vazio quer dizer "todas as branches".

```yaml
concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true
```
Se você der dois pushes seguidos na mesma branch, a execução antiga é cancelada e só a mais nova continua, o que economiza minutos. `github.ref` é a branch, então branches diferentes não se cancelam.

```yaml
permissions:
  contents: read
```
**Mínimo privilégio**: o token que o GitHub entrega ao workflow só pode ler o código. Se alguém alterar o workflow por engano, ele não consegue fazer push nem mexer em releases.

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    timeout-minutes: 10
```
Um **job** é um conjunto de passos que roda numa máquina virtual nova (o *runner*), aqui um Ubuntu. Se travar, é morto depois de 10 minutos.

```yaml
    strategy:
      fail-fast: false
      matrix:
        node: [20, 22]
```
A **matriz** roda o mesmo job duas vezes, em paralelo: uma com Node 20 e outra com Node 22. O projeto exige Node ≥ 20.9, então assim garantimos que funciona na versão mínima e na atual. `fail-fast: false` faz um job continuar mesmo se o outro falhar, para você ver os dois resultados.

Os **passos** (`steps`), em ordem:

| Passo | O que faz |
|---|---|
| `actions/checkout@v4` | Baixa o código do commit no runner. |
| `actions/setup-node@v4` + `cache: npm` | Instala o Node da matriz e guarda em cache o download das dependências (baseado no `package-lock.json`), o que deixa as próximas execuções mais rápidas. |
| `npm ci` | Instala exatamente as versões do `package-lock.json`. Diferente do `npm install`, nunca altera o lock e falha se ele estiver dessincronizado com o `package.json`. |
| `npm run typecheck` | `tsc --noEmit`. |
| `npm run build` | Build de produção. O `tee build.log` mostra a saída e também a salva num arquivo. O `set -o pipefail` garante que, se o build falhar, o passo falhe, mesmo com o `tee` no meio. |
| Avisos do build | Procura `[seo]` e `[equipe]` no `build.log`, escreve no resumo e emite `::warning::`, o comando especial que o GitHub transforma em anotação. Tem `if: always()` para rodar mesmo se o build falhar. |

`uses:` executa uma **action** pronta, publicada por terceiros (aqui, as oficiais do GitHub). `run:` executa comandos de shell.

## Rodar manualmente

Aba **Actions** → **CI** (na lateral) → **Run workflow** → escolha a branch → **Run workflow**.

## Reproduzir na sua máquina

O mesmo que o CI faz:

```bash
npm ci && npm run typecheck && npm run build
```

> O `npm ci` apaga e reinstala o `node_modules`. Pare o `npm run dev` antes.

## Quando falhar

1. Abra a execução vermelha → clique no job (por exemplo, "Node 22") → o passo com ✗ abre o log.
2. Causas mais comuns:
   - **Verificar tipos**: um erro de TypeScript. O log mostra o arquivo e a linha (`src/...tsx(12,5): error TS...`).
   - **Build de produção**: um erro em um componente ou página durante a geração estática.
   - **Instalar dependências**: o `package-lock.json` está dessincronizado com o `package.json`. Rode `npm install` localmente e faça commit do lock.
   - **Só um Node falhou**: algo usado só existe na versão mais nova do Node.
3. Corrija, faça commit e dê push. O CI roda de novo sozinho.

## Próximos passos (ideias para estudar)

- **Exigir CI verde antes do merge**: GitHub → Settings → Branches → regra para `staging`/`main` → *Require status checks to pass* → selecione os jobs do CI.
- **Promoção `staging` → `main` por botão**: um workflow com `workflow_dispatch` que roda o CI, faz o merge na `main` e cria uma tag de versão. O push na `main` dispara o deploy da Vercel.
- **Dependabot**: PRs automáticos de atualização de dependências, validados por este CI.
- **Lighthouse CI**: notas de performance, acessibilidade e SEO a cada mudança.
