export class CreateTransacaoDto {
  nome: string;
  descricao: string;
  valor: number;
  data: string;
  tipo: 'entrada' | 'saida';
  categoriaID: number;
}
