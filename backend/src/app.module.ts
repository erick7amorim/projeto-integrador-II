import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TransacaoModule } from './transacao/transacao.module';
import { MetasModule } from './metas/metas.module';
import { OrcamentosModule } from './orcamentos/orcamentos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { SubmetasModule } from './submetas/submetas.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, UsuariosModule, TransacaoModule, MetasModule, OrcamentosModule, CategoriasModule, SubmetasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
