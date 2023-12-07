// submeta.entity.ts

import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Meta } from 'src/metas/entities/meta.entity';

@Entity()
export class Submeta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  nome: string;

  @Column({ nullable: true })
  descricao: string;

  @Column({ nullable: true })
  valor: number;

  @Column({ nullable: true })
  valorFinal: number;

  @Column({ nullable: true })
  dataFinal: string;

  @ManyToOne(() => Meta, (meta) => meta.submetas, { nullable: true })
  meta: Meta;

  constructor(submeta: Partial<Submeta>) {
    Object.assign(this, submeta);
  }
}
