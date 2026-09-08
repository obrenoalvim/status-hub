[English](README.md) | Português

# Status Hub

[![CI](https://github.com/obrenoalvim/status-hub/actions/workflows/ci.yml/badge.svg)](https://github.com/obrenoalvim/status-hub/actions/workflows/ci.yml) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

O GitHub caiu, ou é só você? O Status Hub junta toda página de status que você confere num grid só: GitHub, Cloudflare, OpenAI, Discord e mais de 50 outros, atualizado sozinho.

Escolha os serviços que te interessam uma vez; a seleção fica salva no `localStorage`, então
o painel lembra de você na próxima visita. Sem conta, sem banco de dados.

![Dashboard do Status Hub](docs/screenshot.jpg)

## Como funciona

- `lib/providers.ts`: o catálogo dos serviços suportados (nome, categoria, slug do Simple
  Icons e o endpoint público de status a consultar).
- `app/api/status/route.ts`: um proxy server-side (`GET /api/status?ids=a,b,c`) que busca
  o status de cada provedor e normaliza tudo num formato só. Rodar no servidor evita CORS
  e mantém as URLs dos provedores fora do bundle do cliente.
- `lib/normalize.ts`: adaptadores que convertem o formato nativo de cada provedor
  (o `api/v2/status.json` do Statuspage.io, ou o `incidents.json` do Google Cloud) num
  formato comum `{ indicator, description, updatedAt }`.
- `lib/useSelectedProviders.ts`: um hook baseado em `useSyncExternalStore` que lê e escreve
  a seleção no `localStorage`, sincronizado entre abas.

A maioria dos provedores aqui roda em Statuspage.io, cujo cache de borda só atualiza a cada
10 segundos (`s-maxage=10`). O painel consulta a cada 12 segundos e o fetch do servidor fica
em cache por 10 segundos, suficiente pra manter tudo atual sem martelar origens que não ganham
nada sendo consultadas com mais frequência.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). Sem nada selecionado ainda, você cai
na tela de escolha em `/select`.

## Scripts

```bash
npm run dev      # inicia o servidor de desenvolvimento
npm run build    # build de produção
npm run lint     # eslint
npm run test     # roda a suíte de testes uma vez
npm run test:watch
```

## Adicionando um serviço

A maioria das páginas de status roda em Statuspage.io e expõe um endpoint público, sem
autenticação, em `https://<host>/api/v2/status.json`. Pra adicionar um, inclua uma entrada
em `PROVIDERS` no `lib/providers.ts` com `id`, `name`, `category`, `type: "statuspage"`,
o `baseUrl` e um slug do [Simple Icons](https://simpleicons.org) que corresponda ao ícone
do card (se o slug não existir, o ícone cai pra um avatar com a letra do nome). Confirme que
o endpoint realmente devolve JSON antes de adicionar: algumas páginas de status migraram
pra SPAs próprias que não servem mais um JSON puro nesse caminho.
