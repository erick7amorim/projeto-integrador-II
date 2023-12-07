import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuario } from './entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transacao } from '../transacao/entities/transacao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Transacao])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
