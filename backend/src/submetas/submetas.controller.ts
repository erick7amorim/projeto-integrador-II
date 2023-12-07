// submetas.controller.ts

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubmetasService } from './submetas.service';
import { CreateSubmetaDto } from './dto/create-submeta.dto';
import { UpdateSubmetaDto } from './dto/update-submeta.dto';

@Controller('metas/:metaId/submeta')
export class SubmetasController {
  constructor(private readonly submetaService: SubmetasService) {}

  @Post()
  async create(
    @Param('metaId') metaId: number,
    @Body() createSubmetaDto: CreateSubmetaDto,
  ) {
    return this.submetaService.create(metaId, createSubmetaDto);
  }

  @Get()
  async findAll(@Param('metaId') metaId: number) {
    return this.submetaService.findAll(metaId);
  }

  @Patch(':submetaId')
  async update(
    @Param('metaId') metaId: number,
    @Param('submetaId') submetaId: number,
    @Body() updateSubmetaDto: UpdateSubmetaDto,
  ) {
    return this.submetaService.update(metaId, submetaId, updateSubmetaDto);
  }

  @Delete(':submetaId')
  async destroy(@Param('submetaId') submetaId: number) {
    return this.submetaService.destroy(submetaId);
  }
}
