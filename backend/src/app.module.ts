import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TransacaoModule } from './transacao/transacao.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, UsuariosModule, TransacaoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
