import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';
import { loadEnv } from 'vite';

// Sem o WhatsApp real, todos os botões "Comprar" levariam a um número errado.
// Por isso o build falha sem um número válido; em `astro dev` só avisa.
const { PUBLIC_WHATSAPP_NUMBER: whatsapp } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), 'PUBLIC_');
if (!whatsapp || !/^55\d{10,11}$/.test(whatsapp) || whatsapp === '5511999999999') {
  const msg =
    'PUBLIC_WHATSAPP_NUMBER ausente ou inválido. Coloque o WhatsApp real do artista no .env ' +
    '(ou nas variáveis de ambiente do host), só números, com 55 + DDD. Ex.: 5511987654321.';
  if (process.argv.includes('build')) throw new Error(msg);
  console.warn(`\n⚠  ${msg}\n`);
}

// Troque pelo domínio final quando publicar (usado em URLs canônicas / Open Graph / sitemap)
export default defineConfig({
  site: 'https://jhonathamcosmo.com.br',
  // As páginas do site continuam estáticas; só o painel (/keystatic e /api/keystatic)
  // roda no servidor da Vercel.
  adapter: vercel(),
  integrations: [
    react(),
    keystatic(),
    sitemap({ filter: (pagina) => !pagina.includes('/keystatic') }),
  ],
});
