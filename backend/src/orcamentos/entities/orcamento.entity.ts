import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity()
export class Orcamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  limite: number;

  @Column()
  data: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.orcamento)
  usuario: Usuario;

  constructor(orcamento: Partial<Orcamento>) {
    Object.assign(this, orcamento);
  }
}
