import { Module } from '@nestjs/common';
import { OrcamentosService } from './orcamentos.service';
import { OrcamentosController } from './orcamentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Orcamento } from './entities/orcamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Orcamento])],
  controllers: [OrcamentosController],
  providers: [OrcamentosService],
})
export class OrcamentosModule {}
