import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrcamentosService } from './orcamentos.service';
import { CreateOrcamentoDto } from './dto/create-orcamento.dto';
import { UpdateOrcamentoDto } from './dto/update-orcamento.dto';

@Controller('usuarios/:usuarioId/orcamento')
export class OrcamentosController {
  constructor(private readonly orcamentosService: OrcamentosService) {}

  @Post()
  async create(
    @Param('usuarioId') usuarioId: number,
    @Body() CreateOrcamentoDto: CreateOrcamentoDto,
  ) {
    return this.orcamentosService.create(usuarioId, CreateOrcamentoDto);
  }

  @Get()
  async findAll(@Param('usuarioId') usuarioId: number) {
    return this.orcamentosService.findAll(usuarioId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orcamentosService.findOne(+id);
  }

  @Patch(':orcamentoId')
  async update(
    @Param('orcamentoId') orcamentoId: number,
    @Body() updateOrcamentoDto: UpdateOrcamentoDto,
  ) {
    return this.orcamentosService.update(orcamentoId, updateOrcamentoDto);
  }

  @Delete(':orcamentoId')
  async destroy(@Param('orcamentoId') orcamentoId: number) {
    console.log('ID da Transação:', orcamentoId);
    return this.orcamentosService.destroy(orcamentoId);
  }
}
