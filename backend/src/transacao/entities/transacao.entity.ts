import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Categoria } from '../../categorias/entities/categoria.entity';

@Entity()
export class Transacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  nome: string;

  @Column({ nullable: true })
  descricao: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor: number;

  @Column({ nullable: true })
  data: string;

  @Column({ type: 'enum', enum: ['entrada', 'saida'] })
  tipo: 'entrada' | 'saida';

  @ManyToOne(() => Usuario, (usuario) => usuario.transacoes, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;

  @ManyToOne(() => Categoria, (categoria) => categoria.transacoes)
  categoria: Categoria;

  constructor(transacao: Partial<Transacao>) {
    Object.assign(this, transacao);
  }
}
