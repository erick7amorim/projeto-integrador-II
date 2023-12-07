// src/categoria/categoria.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Transacao } from '../../transacao/entities/transacao.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.categorias)
  usuario: Usuario;

  @OneToMany(() => Transacao, (transacao) => transacao.categoria)
  transacoes: Transacao[];
}
