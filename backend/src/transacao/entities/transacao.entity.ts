import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity()
export class Transacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.transacoes, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;

  constructor(transacao: Partial<Transacao>) {
    Object.assign(this, transacao);
  }
}
