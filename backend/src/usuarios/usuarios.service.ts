import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { EntityManager, Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransacaoDto } from '../transacao/dto/create-transacoes.dto';
import { Transacao } from '../transacao/entities/transacao.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuario = new Usuario(createUsuarioDto);

    await this.entityManager.save(usuario);
  }

  async findAll() {
    return this.usuariosRepository.find({});
  }

  async findOne(id: number) {
    return this.usuariosRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuariosRepository.findOneBy({ id });
    usuario.nome = updateUsuarioDto.nome;
    usuario.saldo = updateUsuarioDto.saldo;
    await this.entityManager.save(usuario);
  }

  async remove(id: number) {
    await this.usuariosRepository.delete(id);
  }
}
