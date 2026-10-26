# Jhonatham Cosmo — Site de Arte Autoral

Site/portfólio de obras do artista e tatuador Jhonatham Cosmo, construído com **[Astro](https://astro.build)** (Node.js), com painel de administração **[Keystatic](https://keystatic.com)** em `/keystatic`. As páginas do site são estáticas (rápidas e ótimas para SEO); só o painel roda no servidor.

## Requisitos
- Node.js 22.23.4+ (exigido pelo Astro 7)

## Rodando localmente
```bash
npm install
cp .env.example .env      # coloque o WhatsApp real do artista
npm run dev               # site em http://localhost:4321, painel em http://localhost:4321/keystatic
```

Em desenvolvimento o painel salva direto nos arquivos do projeto (`src/content/` e `public/images/`), sem login.

## Build de produção
```bash
npm run build             # gera .vercel/output/ (site estático + função do painel)
```

O build **falha de propósito** se `PUBLIC_WHATSAPP_NUMBER` estiver ausente, fora do formato
(55 + DDD + número) ou ainda for o número de exemplo, para o site nunca ir ao ar com os botões
"Comprar" apontando para o lugar errado. Em `npm run dev` aparece só um aviso.

## Painel do administrador (`/keystatic`)
| Seção | O que dá para fazer |
|---|---|
| **Obras** | Cadastrar, editar e excluir obras: foto, título, técnica, dimensões, preço, disponível/vendida, destaque na página inicial, ordem e descrição |
| **Página inicial** | Linha acima do nome, frase de apresentação e foto de fundo |
| **Sobre** | Título, texto (parágrafos), frase sobre a foto e foto |
| **Contato** | Título, texto, foto de fundo e os cartões "sobre o que vamos falar" (com a mensagem pronta do WhatsApp) |
| **Configurações gerais** | Nome, descrição para Google/redes, links do Instagram e TikTok, faixa de benefícios |

Publicado na Vercel, cada "Save" vira um commit no GitHub e a Vercel republica o site sozinha (cerca de 1 minuto).
O WhatsApp fica fora do painel: é a variável `PUBLIC_WHATSAPP_NUMBER`.

## Estrutura
```
keystatic.config.ts       campos do painel (o que o administrador pode editar)
public/
  images/obras/<obra>/    foto de cada obra (imagem.jpg)
  images/inicio|sobre|contato/   fotos das páginas
  favicon.svg
src/
  content/                conteúdo editado pelo painel (YAML)
    obras/*.yaml          uma obra por arquivo
    inicio.yaml, sobre.yaml, contato.yaml, config.yaml
  data/conteudo.ts        lê o conteúdo do painel no build
  data/obras.ts           monta e ordena o catálogo
  data/site.ts            WhatsApp, menu
  layouts/Base.astro      <head>, SEO/Open Graph, header + footer
  components/             Header (menu + item ativo + tema), Hero, ObraCard, ObrasGrid, Sobre, Beneficios, Footer, Icon (SVGs)
  pages/
    robots.txt.ts         robots.txt gerado, aponta para o sitemap
    index.astro           início: hero, obras em destaque e benefícios
    sobre.astro           /sobre
    contato.astro         /contato
    obras/index.astro     /obras — galeria completa
    obras/[slug].astro    /obras/conexao etc. — página de cada obra
    404.astro
  styles/global.css       cores dos temas escuro/claro, botões, tipografia base
```

## Publicar na Vercel (com o painel)
1. Na Vercel, **Add New → Project** e importe o repositório `lucashsouza1941-eng/jhonatham-cosmo`. Em *Environment Variables*, adicione `PUBLIC_WHATSAPP_NUMBER`. Faça o deploy e anote o endereço (ex.: `https://jhonatham-cosmo.vercel.app`).
2. **Criar o app do GitHub que dá login ao painel** (uma vez só), no computador:
   ```bash
   PUBLIC_KEYSTATIC_MODO=github npm run dev
   ```
   Abra `http://127.0.0.1:4321/keystatic`, siga o botão para criar o GitHub App e instale-o **só** no repositório `jhonatham-cosmo`. O Keystatic grava no `.env` quatro variáveis: `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET` e `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`.
3. No GitHub (*Settings → Developer settings → GitHub Apps →* o app criado), em **Callback URL** adicione `https://<endereço-da-vercel>/api/keystatic/github/oauth/callback`.
4. Copie as quatro variáveis do `.env` para a Vercel (*Settings → Environment Variables*) e faça um novo deploy.
5. Adicione o Jhonatham como **colaborador** do repositório no GitHub (*Settings → Collaborators*). Ele entra em `https://<endereço>/keystatic` com a conta GitHub dele; só quem tem acesso ao repositório consegue salvar.

## Tarefas comuns
| Quero... | Onde mexer |
|---|---|
| Obras, textos, fotos, redes | Painel `/keystatic` |
| Trocar o WhatsApp | `.env` → `PUBLIC_WHATSAPP_NUMBER` (só números, com 55 + DDD); na Vercel, nas variáveis de ambiente |
| Domínio do site | `astro.config.mjs` → `site` (canonical, Open Graph, sitemap e robots.txt usam ele) |
| Campos do painel | `keystatic.config.ts` |

## Pendências antes de publicar
- [ ] Links reais de Instagram e TikTok (painel → Configurações gerais)
- [ ] **Fotos em alta resolução** — as atuais foram extraídas do HTML original e são pequenas (~200–670 px). Troque pelo painel (ideal: obras ≥ 1200 px, fundo da página inicial ≥ 1920 px).
- [ ] Domínio final em `astro.config.mjs`
