import { Module } from '@nestjs/common';
import { MetasService } from './metas.service';
import { MetasController } from './metas.controller';
import { Meta } from './entities/meta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Submeta } from 'src/submetas/entities/submeta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meta, Usuario, Submeta])],
  controllers: [MetasController],
  providers: [MetasService],
})
export class MetasModule {}
