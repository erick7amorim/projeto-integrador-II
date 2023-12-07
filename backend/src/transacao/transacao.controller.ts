import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { CreateTransacaoDto } from './dto/create-transacoes.dto';
import { UpdateTransacaoDto } from './dto/update-transacao.dto';

@Controller('usuarios/:usuarioId/transacao')
export class TransacaoController {
  constructor(private readonly transacaoService: TransacaoService) {}

  @Post()
  async create(
    @Param('usuarioId') usuarioId: number,
    @Body() createTransacaoDto: CreateTransacaoDto,
  ) {
    return this.transacaoService.create(usuarioId, createTransacaoDto);
  }

  @Get()
  async findAll(@Param('usuarioId') usuarioId: number) {
    return this.transacaoService.findAll(usuarioId);
  }

  @Patch(':transacaoId')
  async update(
    @Param('transacaoId') transacaoId: number,
    @Body() updateTransacaoDto: UpdateTransacaoDto,
  ) {
    return this.transacaoService.update(transacaoId, updateTransacaoDto);
  }

  @Delete(':transacaoId')
  async destroy(@Param('transacaoId') transacaoId: number) {
    console.log('ID da Transação:', transacaoId);
    return this.transacaoService.destroy(transacaoId);
  }
}
