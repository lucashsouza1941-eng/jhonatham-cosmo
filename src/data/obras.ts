// Catálogo de obras. Para adicionar uma obra: coloque a imagem em
// public/images/obras/ e acrescente um item nesta lista.

export interface Obra {
  slug: string;
  titulo: string;
  tecnica: string;       // ex.: "Original · Tela"
  dimensoes: string;     // ex.: "100 × 70 cm"
  preco: number;         // em reais
  imagem: string;        // caminho a partir de /public
  destaque?: boolean;    // aparece na home
  disponivel?: boolean;  // false = "Vendida"
  descricao?: string;
}

export const obras: Obra[] = [
  {
    slug: 'conexao',
    titulo: 'Conexão',
    tecnica: 'Original · Tela',
    dimensoes: '100 × 70 cm',
    preco: 3500,
    imagem: '/images/obras/conexao.jpg',
    destaque: true,
    disponivel: true,
  },
  {
    slug: 'essencia',
    titulo: 'Essência',
    tecnica: 'Original · Tela',
    dimensoes: '120 × 80 cm',
    preco: 4200,
    imagem: '/images/obras/essencia.jpg',
    destaque: true,
    disponivel: true,
  },
  {
    slug: 'observador',
    titulo: 'Observador',
    tecnica: 'Original · Tela',
    dimensoes: '90 × 60 cm',
    preco: 2800,
    imagem: '/images/obras/observador.jpg',
    destaque: true,
    disponivel: true,
  },
  {
    slug: 'conflito',
    titulo: 'Conflito',
    tecnica: 'Original · Tela',
    dimensoes: '100 × 70 cm',
    preco: 3200,
    imagem: '/images/obras/conflito.jpg',
    destaque: true,
    disponivel: true,
  },
];

export const formatarPreco = (valor: number) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
