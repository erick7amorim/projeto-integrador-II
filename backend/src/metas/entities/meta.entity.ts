import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Submeta } from 'src/submetas/entities/submeta.entity';

@Entity()
export class Meta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  nome: string;

  @Column({ nullable: true })
  valor: number;

  @Column({ nullable: true })
  valorFinal: number;

  @Column({ nullable: true })
  data: string;

  @Column({ nullable: true })
  descricao: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.metas)
  usuario: Usuario;

  @OneToMany(() => Submeta, (submeta) => submeta.meta, {
    cascade: true,
  })
  submetas: Submeta[];

  constructor(meta: Partial<Meta>) {
    Object.assign(this, meta);
  }
}
