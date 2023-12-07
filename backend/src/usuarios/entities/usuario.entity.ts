/* eslint-disable prettier/prettier */
import { AbstractEntity } from 'src/database/abstract.entity';
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transacao } from '../../transacao/entities/transacao.entity';
import { Meta } from 'src/metas/entities/meta.entity';
import { Orcamento } from 'src/orcamentos/entities/orcamento.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  saldo: number;

  @OneToMany(() => Orcamento, (orcamento) => orcamento.usuario, { cascade: true })
  orcamento: Orcamento[];

  @OneToMany(() => Transacao, (transacao) => transacao.categoria)
  transacoes: Transacao[];

  @OneToMany(() => Categoria, (categoria) => categoria.usuario)
  categorias: Categoria[];

  @OneToMany(() => Meta, meta => meta.usuario)
  metas: Meta[];

  constructor(usuario: Partial<Usuario>) {
    Object.assign(this, usuario);
  }
}
