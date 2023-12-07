/* eslint-disable prettier/prettier */
import { AbstractEntity } from 'src/database/abstract.entity';
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transacao } from '../../transacao/entities/transacao.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  saldo: number;

  @OneToMany(() => Transacao, (transacao) => transacao.usuario, { cascade: true })
  transacoes: Transacao[];


  constructor(usuario: Partial<Usuario>) {
    Object.assign(this, usuario);
  }
}
