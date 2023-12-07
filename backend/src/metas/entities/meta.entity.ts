import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity()
export class Meta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  nome: string;

  @Column({ nullable: true })
  valor: number;

  @Column({ nullable: true })
  data: string;

  @Column({ nullable: true })
  descricao: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.metas)
  usuario: Usuario;

  constructor(meta: Partial<Meta>) {
    Object.assign(this, meta);
  }
}
