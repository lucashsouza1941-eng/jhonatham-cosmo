// Painel do administrador (Keystatic), em /keystatic.
// Em desenvolvimento salva direto nos arquivos do projeto; publicado (Vercel),
// salva no repositório do GitHub e a Vercel republica o site sozinha.
import { config, collection, singleton, fields } from '@keystatic/core';

const imagem = (label: string, pasta: string, description?: string) =>
  fields.image({
    label,
    description,
    directory: `public/images/${pasta}`,
    publicPath: `/images/${pasta}/`,
    validation: { isRequired: true },
  });

export default config({
  // PUBLIC_KEYSTATIC_MODO=github força o modo GitHub também em dev: é assim que se
  // faz a configuração inicial do app do GitHub (passo a passo no README).
  storage:
    import.meta.env.PROD || import.meta.env.PUBLIC_KEYSTATIC_MODO === 'github'
      ? { kind: 'github', repo: 'lucashsouza1941-eng/jhonatham-cosmo' }
      : { kind: 'local' },

  ui: {
    brand: { name: 'Jhonatham Cosmo' },
    navigation: {
      Loja: ['obras'],
      'Páginas do site': ['inicio', 'sobre', 'contato'],
      Configurações: ['config'],
    },
  },

  collections: {
    obras: collection({
      label: 'Obras',
      slugField: 'titulo',
      path: 'src/content/obras/*',
      format: { data: 'yaml' },
      columns: ['titulo', 'preco'],
      schema: {
        titulo: fields.slug({
          name: { label: 'Título', validation: { isRequired: true } },
          slug: { label: 'Endereço da página', description: 'Aparece em /obras/<endereço>. Gerado a partir do título.' },
        }),
        imagem: imagem('Foto da obra', 'obras', 'Quadrada de preferência, com pelo menos 1200 px de lado.'),
        tecnica: fields.text({ label: 'Técnica', defaultValue: 'Original · Tela' }),
        dimensoes: fields.text({ label: 'Dimensões', description: 'Ex.: 100 × 70 cm', validation: { isRequired: true } }),
        preco: fields.number({ label: 'Preço (R$)', validation: { isRequired: true, min: 0 } }),
        disponivel: fields.checkbox({ label: 'Disponível para venda', description: 'Desmarque quando for vendida: o card passa a mostrar "Vendida".', defaultValue: true }),
        destaque: fields.checkbox({ label: 'Mostrar na página inicial', description: 'A página inicial mostra até 4 obras em destaque.', defaultValue: false }),
        ordem: fields.integer({ label: 'Ordem', description: 'Menor aparece primeiro na galeria.', defaultValue: 100 }),
        descricao: fields.text({ label: 'Descrição', multiline: true, description: 'Opcional. Aparece na página da obra.' }),
      },
    }),
  },

  singletons: {
    inicio: singleton({
      label: 'Página inicial',
      path: 'src/content/inicio',
      format: { data: 'yaml' },
      schema: {
        eyebrow: fields.text({ label: 'Linha acima do nome', validation: { isRequired: true } }),
        slogan: fields.text({ label: 'Frase de apresentação', multiline: true, validation: { isRequired: true } }),
        imagem: imagem('Foto de fundo', 'inicio', 'Horizontal, com pelo menos 1920 px de largura.'),
      },
    }),
    sobre: singleton({
      label: 'Sobre',
      path: 'src/content/sobre',
      format: { data: 'yaml' },
      schema: {
        eyebrow: fields.text({ label: 'Linha acima do título', validation: { isRequired: true } }),
        titulo: fields.text({ label: 'Título', validation: { isRequired: true } }),
        paragrafos: fields.array(fields.text({ label: 'Parágrafo', multiline: true }), {
          label: 'Texto',
          itemLabel: (p) => p.value.slice(0, 60) || 'Parágrafo',
        }),
        fraseFoto: fields.text({ label: 'Frase sobre a foto', multiline: true, description: 'Uma palavra ou expressão por linha.' }),
        foto: imagem('Foto', 'sobre'),
      },
    }),
    contato: singleton({
      label: 'Contato',
      path: 'src/content/contato',
      format: { data: 'yaml' },
      schema: {
        titulo: fields.text({ label: 'Título', validation: { isRequired: true } }),
        texto: fields.text({ label: 'Texto', multiline: true, validation: { isRequired: true } }),
        imagem: imagem('Foto de fundo', 'contato'),
        motivos: fields.array(
          fields.object({
            titulo: fields.text({ label: 'Título', validation: { isRequired: true } }),
            texto: fields.text({ label: 'Descrição', multiline: true }),
            mensagem: fields.text({ label: 'Mensagem pronta no WhatsApp', multiline: true, validation: { isRequired: true } }),
          }),
          { label: 'Motivos de contato', itemLabel: (m) => m.fields.titulo.value || 'Motivo' },
        ),
      },
    }),
    config: singleton({
      label: 'Configurações gerais',
      path: 'src/content/config',
      format: { data: 'yaml' },
      schema: {
        nome: fields.text({ label: 'Nome do artista', validation: { isRequired: true } }),
        descricao: fields.text({ label: 'Descrição do site (Google e redes sociais)', multiline: true, validation: { isRequired: true } }),
        instagram: fields.url({ label: 'Link do Instagram' }),
        tiktok: fields.url({ label: 'Link do TikTok' }),
        beneficios: fields.array(
          fields.object({
            simbolo: fields.select({
              label: 'Ícone',
              options: [
                { label: '♢ Losango', value: '♢' },
                { label: '◇ Losango vazado', value: '◇' },
                { label: '↗ Seta', value: '↗' },
                { label: '◉ Círculo', value: '◉' },
              ],
              defaultValue: '◇',
            }),
            titulo: fields.text({ label: 'Título', validation: { isRequired: true } }),
            texto: fields.text({ label: 'Texto' }),
          }),
          { label: 'Benefícios (faixa com 4 itens)', itemLabel: (b) => b.fields.titulo.value || 'Benefício' },
        ),
      },
    }),
  },
});
