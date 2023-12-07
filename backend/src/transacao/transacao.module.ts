import { Module } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { TransacaoController } from './transacao.controller';
import { Transacao } from './entities/transacao.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transacao, Usuario, Categoria])],
  controllers: [TransacaoController],
  providers: [TransacaoService],
})
export class TransacaoModule {}
