import { PartialType } from '@nestjs/mapped-types';
import { CreateTransacaoDto } from './create-transacoes.dto';

export class UpdateTransacaoDto extends PartialType(CreateTransacaoDto) {}
