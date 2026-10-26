// Catálogo de obras. As obras são cadastradas no painel (/keystatic → Obras)
// e ficam em src/content/obras/*.yaml.
import { lerObras } from './conteudo';

export interface Obra {
  slug: string;
  titulo: string;
  tecnica: string;       // ex.: "Original · Tela"
  dimensoes: string;     // ex.: "100 × 70 cm"
  preco: number;         // em reais
  imagem: string;        // caminho a partir de /public
  destaque: boolean;     // aparece na home
  disponivel: boolean;   // false = "Vendida"
  descricao?: string;
}

// Ordenadas pelo campo "Ordem" do painel (menor primeiro), depois pelo título.
export async function carregarObras(): Promise<Obra[]> {
  const entradas = await lerObras();
  return entradas
    .map(({ slug, entry }) => ({
      slug,
      titulo: entry.titulo,
      tecnica: entry.tecnica,
      dimensoes: entry.dimensoes,
      preco: entry.preco ?? 0,
      imagem: entry.imagem,
      destaque: entry.destaque,
      disponivel: entry.disponivel,
      descricao: entry.descricao || undefined,
      ordem: entry.ordem ?? 100,
    }))
    .sort((a, b) => a.ordem - b.ordem || a.titulo.localeCompare(b.titulo, 'pt-BR'))
    .map(({ ordem: _, ...obra }) => obra);
}

export const formatarPreco = (valor: number) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
