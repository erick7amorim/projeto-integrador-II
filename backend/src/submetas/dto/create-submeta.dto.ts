export class CreateSubmetaDto {
  nome: string;
  descricao: string;
  valor: number;
  valorFinal: number;
  dataFinal: string;
  metaId: number; // Referência ao ID da meta à qual a submeta está associada
}
