import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaEdit, FaTrash, FaMoneyBill, FaCalendarAlt, FaPlus } from 'react-icons/fa';
import { getOrcamentos, editOrcamentos, destroyOrcamentos, createOrcamentos } from '../../services/api';
import './Orcamentos.css';
import Nav from '../Nav';

Modal.setAppElement('#root');

const OrcamentosPage = () => {
  const [orcamentos, setOrcamentos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [orcamentoEditado, setOrcamentoEditado] = useState(null);
  const [novoLimite, setNovoLimite] = useState('');
  const [novaData, setNovaData] = useState('');
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [modalFormVisible, setModalFormVisible] = useState(false);

  useEffect(() => {
    const fetchOrcamentos = async () => {
      try {
        const response = await getOrcamentos('1');
        setOrcamentos(response.data);
      } catch (error) {
        console.error('Erro ao buscar orçamentos:', error);
      }
    };

    fetchOrcamentos();
  }, []);

  const openModal = (orcamento, event) => {
    setModalIsOpen(true);
    setOrcamentoEditado(orcamento);
    setNovoLimite(orcamento.limite);
    setNovaData(orcamento.data);
    if (event) {
      setModalPosition({ top: event.clientY, left: event.clientX });
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setOrcamentoEditado(null);
    setNovoLimite('');
    setNovaData('');
    setModalPosition({ top: 0, left: 0 });
    setModalFormVisible(false);
  };

  const openFormModal = () => {
    setModalFormVisible(true);
  };

  const handleEditar = async () => {
    try {
      const editedOrcamento = {
        limite: novoLimite,
        data: novaData,
      };

      await editOrcamentos('1', orcamentoEditado.id, editedOrcamento.limite, editedOrcamento.data);

      const novosOrcamentos = orcamentos.map((o) =>
        o.id === orcamentoEditado.id ? { ...o, ...editedOrcamento } : o
      );
      setOrcamentos(novosOrcamentos);

      console.log('Orçamento editado com sucesso!');
      closeModal();
    } catch (error) {
      console.error('Erro ao editar orçamento:', error);
    }
  };

  const handleApagar = async (orcamento) => {
    const confirmacao = true;

    if (confirmacao) {
      try {
        await destroyOrcamentos('1', orcamento.id);

        const novosOrcamentos = orcamentos.filter((o) => o.id !== orcamento.id);
        setOrcamentos(novosOrcamentos);

        console.log('Orçamento apagado com sucesso!');
      } catch (error) {
        console.error('Erro ao apagar orçamento:', error);
      }
    } else {
      console.log('Exclusão cancelada');
    }
  };

  const handleCriarNovo = async () => {
    try {
      const novoOrcamento = await createOrcamentos('1', novoLimite, novaData);
      setOrcamentos([...orcamentos, novoOrcamento.data]);

      console.log('Novo orçamento criado com sucesso!');
      closeModal();
    } catch (error) {
      console.error('Erro ao criar novo orçamento:', error);
    }
  };

  return (
    <div id="main">
      <div className="container">
        <h1>Orçamentos</h1>
        <div className="botoes-acoes">
          <button onClick={openFormModal}>
            <FaPlus />
            Criar Novo
          </button>
        </div>
        <div className="lista-orcamentos">
          {orcamentos.map((orcamento) => (
            <div key={orcamento.id} className="orcamento-item">
              <div className="item-info">
                <span className="icon"><FaMoneyBill /></span>
                <p>Limite: {orcamento.limite}</p>
              </div>
              <div className="item-info">
                <span className="icon"><FaCalendarAlt /></span>
                <p>Mês/Ano: {formatarMesAno(orcamento.data)}</p>
              </div>
              <div className="botoes-acoes">
                <button onClick={(event) => openModal(orcamento, event)}>
                  <FaEdit />
                </button>
                <button onClick={() => handleApagar(orcamento)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Editar Orçamento"
        className="modal-content"
        overlayClassName="modal-overlay"
        style={{
          top: modalPosition.top,
          left: modalPosition.left,
          transform: 'none',
        }}
      >
        <h2>Editar Orçamento</h2>
        <form>
          <label>
            Limite:
            <input
              type="text"
              value={novoLimite}
              onChange={(e) => setNovoLimite(e.target.value)}
            />
          </label>
          <label>
            Data:
            <input
              type="date"
              value={novaData}
              onChange={(e) => setNovaData(e.target.value)}
            />
          </label>
          <button type="button" onClick={handleEditar}>
            Salvar
          </button>
          <button type="button" onClick={closeModal}>
            Cancelar
          </button>
        </form>
      </Modal>
      <Modal
        isOpen={modalFormVisible}
        onRequestClose={closeModal}
        contentLabel="Criar Novo Orçamento"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>Criar Novo Orçamento</h2>
        <form>
          <label>
            Limite:
            <input
              type="text"
              value={novoLimite}
              onChange={(e) => setNovoLimite(e.target.value)}
            />
          </label>
          <label>
            Data:
            <input
              type="date"
              value={novaData}
              onChange={(e) => setNovaData(e.target.value)}
            />
          </label>
          <button type="button" onClick={handleCriarNovo}>
            Criar
          </button>
          <button type="button" onClick={closeModal}>
            Cancelar
          </button>
        </form>
      </Modal>
    </div>
  );
};

const formatarMesAno = (data) => {
  const dataObj = new Date(data);
  const mes = dataObj.toLocaleString('pt-BR', { month: 'long' });
  const ano = dataObj.getFullYear();
  return `${mes} ${ano}`;
};

export default OrcamentosPage;
