// Configurações gerais do site — edite aqui, não nos componentes.

export const site = {
  nome: 'Jhonatham Cosmo',
  titulo: 'Jhonatham Cosmo — Arte Autoral',
  descricao: 'Obras autorais e arte de Jhonatham Cosmo, tatuador e artista.',
  slogan: 'Obras que carregam identidade.',
  eyebrow: 'Arte autoral · Tattoo · Quadros',
  whatsapp: import.meta.env.PUBLIC_WHATSAPP_NUMBER ?? '5511999999999',
  redes: {
    instagram: 'https://instagram.com/',
    tiktok: 'https://tiktok.com/',
  },
};

export const nav = [
  { label: 'Início', href: '/#inicio' },
  { label: 'Obras', href: '/obras' },
  { label: 'Sobre', href: '/#sobre' },
  { label: 'Contato', href: '/#contato' },
];

export const beneficios = [
  { simbolo: '♢', titulo: 'Compra segura', texto: 'Atendimento personalizado' },
  { simbolo: '↗', titulo: 'Entrega para todo o Brasil', texto: 'Consulte prazos e valores' },
  { simbolo: '◇', titulo: 'Obras autorais', texto: 'Arte com identidade própria' },
  { simbolo: '◉', titulo: 'Contato direto', texto: 'Converse com o artista' },
];

export function whatsappUrl(mensagem: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}
