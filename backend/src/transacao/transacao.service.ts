import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransacaoDto } from './dto/create-transacoes.dto';
import { UpdateTransacaoDto } from './dto/update-transacao.dto';
import { Transacao } from './entities/transacao.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class TransacaoService {
  constructor(
    @InjectRepository(Transacao)
    private readonly transacaoRepository: Repository<Transacao>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(
    usuarioId: number,
    createTransacaoDto: CreateTransacaoDto,
  ): Promise<Transacao> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id: usuarioId },
      relations: ['transacoes'],
    });

    const novaMeta = new Transacao(createTransacaoDto);
    novaMeta.usuario = usuario;

    return this.transacaoRepository.save(novaMeta);
  }

  async findAll(usuarioId: number): Promise<Transacao[]> {
    return this.transacaoRepository.find({
      where: { usuario: { id: usuarioId } },
      relations: ['usuario'],
    });
  }

  async destroy(transacaoId: number): Promise<void> {
    try {
      const transacao = await this.transacaoRepository.findOneOrFail({
        where: { id: transacaoId },
      });
      await this.transacaoRepository.remove(transacao);
    } catch (error) {
      throw new NotFoundException(
        `Transação com ID ${transacaoId} não encontrada.`,
      );
    }
  }

  async update(
    transacaoId: number,
    updateTransacaoDto: UpdateTransacaoDto,
  ): Promise<Transacao> {
    try {
      const transacao = await this.transacaoRepository.findOneOrFail({
        where: { id: transacaoId },
      });

      // Atualizar as propriedades da transacao com base no DTO
      transacao.descricao = updateTransacaoDto.descricao;
      // ...

      // Salvar as alterações no banco de dados
      return await this.transacaoRepository.save(transacao);
    } catch (error) {
      throw new NotFoundException(
        `Transação com ID ${transacaoId} não encontrada.`,
      );
    }
  }
}
