import { LuWallet } from "react-icons/lu";
import React, { useState, useEffect } from 'react';
import { FaBalanceScale } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { RiAddCircleLine } from "react-icons/ri";
import Modal from 'react-modal';
import { getUsuarios, getOrcamentos, getGastosDoUsuarioMesAtual, atualizarSaldoUsuario } from "../services/api";

import './styles.css';

Modal.setAppElement('#root'); // Defina o elemento raiz do aplicativo para o modal

const Saldos = ({ saldo2 }) => {
  const [saldo, setSaldo] = useState([]);
  const [gastoMes, setGastoMes] = useState([]);
  const [limiteDisponivel, setLimiteDisponivel] = useState(0);
  const [novoSaldo, setNovoSaldo] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isDateWithinCurrentMonth = (dateString) => {
    const currentDate = new Date();
    const inputDate = new Date(dateString);
    return (
      inputDate.getMonth() === currentDate.getMonth() &&
      inputDate.getFullYear() === currentDate.getFullYear()
    );
  };

  const loadData = async () => {
    try {
      const response = await getUsuarios('1');
      const response2 = await getOrcamentos('1');
      const response3 = await getGastosDoUsuarioMesAtual('1');

      setSaldo(response.data.saldo);
      setGastoMes(response3.data);

      const dataAtual = new Date();

      if (response2.data && response2.data.length > 0) {
        for (const orcamentoItem of response2.data) {
          const dataOrcamento = new Date(orcamentoItem.data);
          if (isDateWithinCurrentMonth(orcamentoItem.data)) {
            setLimiteDisponivel(orcamentoItem.limite);
            break;
          } else {
            setLimiteDisponivel(null);
          }
        }
      } else {
        setLimiteDisponivel(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdicionarSaldo = () => {
    setIsModalOpen(true);
  };
  const handleCancelar = () => {
    setIsModalOpen(false);
  };

  const handleSalvarNovoSaldo = async () => {
    try {
      const userId = '1';

      if (!isNaN(novoSaldo)) {
        await atualizarSaldoUsuario(userId, novoSaldo);

        const { data: usuario } = await getUsuarios(userId);
        setSaldo(usuario.saldo);

        const response = await getGastosDoUsuarioMesAtual(userId);
        setGastoMes(response.data);

        setIsModalOpen(false);
      } else {
        alert('Por favor, digite um valor válido.');
      }
    } catch (error) {
      console.error('Erro ao adicionar saldo:', error);
    }
  };


  return (
    <div className="saldos-container">
      {/* Primeira div: Saldo */}
      <div className="saldo">
        <div className="info-container">
          <div className="icone">
            <LuWallet />
          </div>
          <div className="saldo-valor">R$ {saldo}</div>
        </div>
        <button className="adicionar-saldo" onClick={handleAdicionarSaldo}>
          Alterar
        </button>
      </div>

      {/* Segunda div: Gasto Mensal */}
      <div className="gasto-mensal">
        <div className="info-container">
          <div className="icone">
            <MdAttachMoney />
          </div>
          <div id="gastoMes" className="saldo-valor">R$ {gastoMes}</div>
        </div>
      </div>

      {/* Terceira div: Orçamento do Mês */}
      <div className="orcamento-mensal">
        <div className="info-container">
          <div className="icone">
            <FaBalanceScale />
          </div>
          <div className="saldo-valor">R$ {limiteDisponivel || 'N/A'}</div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Alterar Saldo"
      >
        <h2>Alterar Saldo</h2>
        <input
          type="number"
          value={novoSaldo}
          onChange={(e) => setNovoSaldo(parseFloat(e.target.value))}
        />
        <button onClick={handleSalvarNovoSaldo}>Salvar</button>
        <button onClick={handleCancelar}>Cancelar</button>
      </Modal>
    </div>
  );
};

export default Saldos;
