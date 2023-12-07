import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuario } from './entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transacao } from '../transacao/entities/transacao.entity';
import { Meta } from 'src/metas/entities/meta.entity';
import { Orcamento } from 'src/orcamentos/entities/orcamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Transacao, Meta, Orcamento])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
