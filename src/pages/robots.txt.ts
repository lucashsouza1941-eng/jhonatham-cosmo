import type { APIRoute } from 'astro';

// Gerado a partir do `site` do astro.config.mjs, para o endereço do sitemap acompanhar o domínio.
export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site)}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
