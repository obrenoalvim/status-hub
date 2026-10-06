<div align="center">

<img src=".github/logo.svg" alt="Logo do Status Hub" width="120" height="120">

# Status Hub

**O GitHub caiu, ou é só você?**<br>
Um grid só para toda página de status que você confere: GitHub, Cloudflare, OpenAI, Discord e mais de 50 outros, atualizado sozinho.

[![Demo ao vivo](https://img.shields.io/badge/Demo_ao_vivo-abrir-34D399?style=for-the-badge&logo=vercel&logoColor=white)](https://status-hub-kappa.vercel.app)

[![CI](https://github.com/obrenoalvim/status-hub/actions/workflows/ci.yml/badge.svg)](https://github.com/obrenoalvim/status-hub/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/obrenoalvim/status-hub?style=flat&logo=github&color=34d399)](https://github.com/obrenoalvim/status-hub/stargazers)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)](#como-funciona)

[English](README.md) · **Português**

[Como funciona](#como-funciona) · [Rodando localmente](#rodando-localmente) · [Adicionando um serviço](#adicionando-um-serviço) · [Perguntas frequentes](#perguntas-frequentes)

</div>

---

O Status Hub junta toda página de status que você confere num grid só: GitHub, Cloudflare, OpenAI, Discord e mais de 50 outros, atualizado sozinho.

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

## Variáveis de ambiente

`NEXT_PUBLIC_SITE_URL`: a origem real do deploy, usada pra montar URLs absolutas em
metadata, sitemap, `robots.txt`, imagem OG, JSON-LD e `llms.txt` (ver `lib/site.ts`).
Opcional; usa `https://status-hub.vercel.app` como padrão se não definida.

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

---

## Perguntas frequentes

**Precisa de conta ou de banco de dados?**
Não. A sua seleção fica salva no `localStorage`, então o painel lembra de você na próxima visita. Sem conta e sem banco de dados no back-end.

**De quanto em quanto tempo atualiza?**
O painel consulta a cada 12 segundos, e o fetch do servidor fica em cache por 10 segundos. A maioria dos provedores roda em Statuspage.io, cujo cache de borda só atualiza a cada 10 segundos.

**Por que o app chama a própria API em vez das páginas de status direto?**
O `/api/status` roda no servidor, o que evita CORS e mantém as URLs dos provedores fora do bundle do cliente.

**Posso adicionar um serviço?**
Pode. Inclua uma entrada em `PROVIDERS` no `lib/providers.ts`. Veja [Adicionando um serviço](#adicionando-um-serviço).

## Mais ferramentas web do mesmo autor

- [**diff-viewer**](https://github.com/obrenoalvim/diff-viewer): compare dois textos e veja o que mudou, no navegador.
- [**pdf-metadata-editor**](https://github.com/obrenoalvim/pdf-metadata-editor): edite título, autor e outros detalhes de um PDF no navegador.
- [**linkedin-insights**](https://github.com/obrenoalvim/linkedin-insights): transforme a exportação de analytics do LinkedIn num dashboard.

## Contribuindo

Conhece uma página de status que merece estar no grid? Abra uma issue ou um PR. Veja o [CONTRIBUTING.pt-BR.md](CONTRIBUTING.pt-BR.md) e o [changelog](CHANGELOG.md).

## Licença

[MIT](LICENSE)

---

<div align="center">

Se o Status Hub te mostrou que não era só você, uma ⭐ ajuda outras pessoas a encontrá-lo.

<sub>**Tópicos:** status-page · statuspage · uptime-monitoring · service-status · outage-tracker · monitoring · dashboard · nextjs · react · typescript · devtools</sub>

</div>
