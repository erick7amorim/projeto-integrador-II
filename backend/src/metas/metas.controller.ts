import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MetasService } from './metas.service';
import { CreateMetaDto } from './dto/create-meta.dto';
import { UpdateMetaDto } from './dto/update-meta.dto';

@Controller('usuarios/:usuarioId/meta')
export class MetasController {
  constructor(private readonly metaService: MetasService) {}

  @Post()
  async create(
    @Param('usuarioId') usuarioId: number,
    @Body() createMetaDto: CreateMetaDto,
  ) {
    return this.metaService.create(usuarioId, createMetaDto);
  }

  @Get()
  async findAll(@Param('usuarioId') usuarioId: number) {
    return this.metaService.findAll(usuarioId);
  }

  @Patch(':metaId')
  async update(
    @Param('usuarioId') usuarioId: number,
    @Param('metaId') metaId: number,
    @Body() updateMetaDto: UpdateMetaDto,
  ) {
    return this.metaService.update(usuarioId, metaId, updateMetaDto);
  }

  @Delete(':metaId')
  async destroy(@Param('metaId') metaId: number) {
    console.log('ID da Transação:', metaId);
    return this.metaService.destroy(metaId);
  }
}
