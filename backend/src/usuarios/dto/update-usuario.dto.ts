import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { CreateTransacaoDto } from '../../transacao/dto/create-transacoes.dto';

export class UpdateUsuarioDto {
  nome: string;
  saldo: number;
  transacoes: CreateTransacaoDto[];
}
