# Jhonatham Cosmo — Site de Arte Autoral

Site/portfólio de obras do artista e tatuador Jhonatham Cosmo, construído com **[Astro](https://astro.build)** (Node.js). Gera um site 100% estático: rápido, ótimo para SEO e grátis para hospedar.

## Requisitos
- Node.js 22.23.4+ (exigido pelo Astro 7)

## Rodando localmente
```bash
npm install
cp .env.example .env      # coloque o WhatsApp real do artista
npm run dev               # http://localhost:4321
```

## Build de produção
```bash
npm run build             # gera a pasta dist/ (e o sitemap)
npm run preview           # serve o build localmente
```

O build **falha de propósito** se `PUBLIC_WHATSAPP_NUMBER` estiver ausente, fora do formato
(55 + DDD + número) ou ainda for o número de exemplo, para o site nunca ir ao ar com os botões
"Comprar" apontando para o lugar errado. Em `npm run dev` aparece só um aviso.

## Estrutura
```
public/
  images/                 hero.jpg, sobre.jpg, contato.jpg
  images/obras/           fotos das obras
  favicon.svg
src/
  data/site.ts            nome, WhatsApp, redes sociais, menu, benefícios
  data/obras.ts           catálogo de obras (título, medidas, preço, imagem...)
  layouts/Base.astro      <head>, SEO/Open Graph, header + footer
  components/             Header (com menu do celular), Hero, ObraCard, ObrasGrid, Sobre, Beneficios, Contato, Footer, Icon (SVGs)
  pages/
    robots.txt.ts         robots.txt gerado, aponta para o sitemap
    index.astro           home
    obras/index.astro     /obras — galeria completa
    obras/[slug].astro    /obras/conexao etc. — página de cada obra
    404.astro
  styles/global.css       variáveis de cor, botões, tipografia base
```

## Tarefas comuns
| Quero... | Onde mexer |
|---|---|
| Trocar o WhatsApp | `.env` → `PUBLIC_WHATSAPP_NUMBER` (só números, com 55 + DDD) |
| Adicionar uma obra | imagem em `public/images/obras/` + item em `src/data/obras.ts` |
| Marcar obra como vendida | `disponivel: false` no item da obra |
| Tirar obra da home | `destaque: false` |
| Instagram / TikTok | `src/data/site.ts` → `redes` |
| Domínio do site | `astro.config.mjs` → `site` (canonical, Open Graph, sitemap e robots.txt usam ele) |

## Deploy
Qualquer host estático. Comando de build `npm run build`, pasta de saída `dist`.
- **Vercel / Netlify / Cloudflare Pages:** importar o repositório; detectam Astro automaticamente. Adicione `PUBLIC_WHATSAPP_NUMBER` nas variáveis de ambiente.

## Pendências antes de publicar
- [ ] WhatsApp real do artista
- [ ] Links reais de Instagram e TikTok
- [ ] **Fotos em alta resolução** — as imagens atuais foram extraídas do HTML original e são pequenas (~200–670 px). Substitua pelos originais mantendo os mesmos nomes de arquivo (ideal: obras ≥ 1200 px, hero ≥ 1920 px).
- [ ] Domínio final em `astro.config.mjs`
