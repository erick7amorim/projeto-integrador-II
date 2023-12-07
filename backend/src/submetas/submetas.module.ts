import { Module } from '@nestjs/common';
import { SubmetasService } from './submetas.service';
import { SubmetasController } from './submetas.controller';
import { Meta } from 'src/metas/entities/meta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submeta } from './entities/submeta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meta, Submeta])],
  controllers: [SubmetasController],
  providers: [SubmetasService],
})
export class SubmetasModule {}
