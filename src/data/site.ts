// Partes fixas do site. Textos, fotos, redes e benefícios são editados no
// painel (/keystatic) e lidos em src/data/conteudo.ts.

export const whatsapp = import.meta.env.PUBLIC_WHATSAPP_NUMBER; // validado no astro.config.mjs

export const nav = [
  { label: 'Início', href: '/' },
  { label: 'Obras', href: '/obras' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Contato', href: '/contato' },
];

// "Obras" fica marcada também nas páginas de cada obra (/obras/conexao...).
export function paginaAtual(href: string, pathname: string): boolean {
  const atual = pathname.replace(/\/+$/, '') || '/';
  return href === '/' ? atual === '/' : atual === href || atual.startsWith(`${href}/`);
}

export function whatsappUrl(mensagem: string): string {
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensagem)}`;
}
