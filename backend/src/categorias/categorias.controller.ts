import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';


@Controller('usuarios/:usuarioId/categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  async create(
    @Param('usuarioId') usuarioId: number,
    @Body() createCategoriaDto: CreateCategoriaDto,
  ) {
    return this.categoriasService.create(usuarioId, createCategoriaDto);
  }

  @Get()
  async findAll(@Param('usuarioId') usuarioId: number) {
    return this.categoriasService.findAll(usuarioId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.categoriasService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
  //   return this.categoriasService.update(+id, updateCategoriaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.categoriasService.remove(+id);
  // }
}
