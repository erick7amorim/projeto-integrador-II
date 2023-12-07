import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { CreateTransacaoDto } from './dto/create-transacoes.dto';
import { UpdateTransacaoDto } from './dto/update-transacao.dto';
import { CreateCategoriaDto } from 'src/categorias/dto/create-categoria.dto';
import { Transacao } from './entities/transacao.entity';

@Controller('usuarios/:usuarioId')
export class TransacaoController {
  constructor(private readonly transacaoService: TransacaoService) {}

  @Post('transacao')
  async create(
    @Param('usuarioId') usuarioId: number,
    @Body() createTransacaoDto: CreateTransacaoDto,
  ) {
    console.log('Valor recebido no controlador:', createTransacaoDto.valor);

    return this.transacaoService.create(usuarioId, createTransacaoDto);
  }

  @Get('transacao')
  async findAll(@Param('usuarioId') usuarioId: number) {
    return this.transacaoService.findAll(usuarioId);
  }

  @Patch('transacao/:transacaoId')
  async update(
    @Param('transacaoId') transacaoId: number,
    @Body() updateTransacaoDto: UpdateTransacaoDto,
  ) {
    return this.transacaoService.update(transacaoId, updateTransacaoDto);
  }

  @Delete('transacao/:transacaoId')
  async destroy(@Param('transacaoId') transacaoId: number) {
    console.log('ID da Transação:', transacaoId);
    return this.transacaoService.destroy(transacaoId);
  }

  // Cálculos
  @Get('/gastos-saida-mes-atual')
  async obterGastosSaidaMesAtual(@Param('userId') userId: number): Promise<number> {
    // Obter o somatório dos gastos de saída dentro do mês atual
    const totalGastosSaida =
      await this.transacaoService.calcularGastosSaidaMesAtual(userId);
    return totalGastosSaida;
  }

  @Get('soma-valores-por-categoria')
  async obterSomaValoresPorCategoria(
    @Param('usuarioId') usuarioId: number,
  ): Promise<any[]> {
    return this.transacaoService.obterSomaValoresPorCategoria(usuarioId);
  }

  @Get('/soma-valores-entrada-por-categoria')
    async obterSomaValoresEntradaPorCategoria(
      @Param('usuarioId') usuarioId: number,
    ): Promise<any[]> {
      return this.transacaoService.calcularSomaValoresEntradaPorCategoria(
        usuarioId,
      );
  }

  @Get('/soma-valores-saida-por-categoria')
  async obterSomaValoresSaidaPorCategoria(
    @Param('usuarioId') usuarioId: number,
  ): Promise<any[]> {
    return this.transacaoService.calcularSomaValoresSaidaPorCategoria(usuarioId);
  }

  @Get('/soma-total-valores')
  async obterSomaTotalValores(@Param('usuarioId') usuarioId: number): Promise<number> {
    return this.transacaoService.calcularSomaTotalValores(usuarioId);
  }

  @Get('/soma-total-valores-saida')
  async obterSomaTotalValoresSaida(@Param('usuarioId') usuarioId: number): Promise<number> {
    return this.transacaoService.calcularSomaTotalValoresSaida(usuarioId);
  }

  @Get('/soma-total-valores-entrada')
  async obterSomaTotalValoresEntrada(@Param('usuarioId') usuarioId: number): Promise<number> {
    return this.transacaoService.calcularSomaTotalValoresEntrada(usuarioId);
  }

  @Get('transacao/:transacaoId')
  async obterTransacaoPorId(
    @Param('transacaoId', ParseIntPipe) transacaoId: number,
  ): Promise<Transacao> {
    return this.transacaoService.obterTransacaoPorId(transacaoId);
  }
}
