import React, { useState, useEffect } from 'react';
import { createCategoria, getTransacoes, destroyTransacao, getUsuarios, getTransacaoEspecifica, atualizarSaldoUsuario } from '../../services/api';
import './styles.css';
import Saldos from '../Saldos';
import AddTransacaoModal from '../AddTransacaoModal';
import Nav from '../Nav';


const Modal = ({ isOpen, onClose, onSave }) => {
  const [categoriaNome, setCategoriaNome] = useState('');

  const handleSave = () => {
    onSave(categoriaNome);
    setCategoriaNome('');
  };

  return (
    <div className="modal" style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Nome da Categoria</h2>
        <input
          type="text"
          value={categoriaNome}
          onChange={(e) => setCategoriaNome(e.target.value)}
        />
        <button onClick={handleSave}>Criar Categoria</button>
      </div>
    </div>
  );
};

const MainPage = () => {
  const [transactionsData, setTransactionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleTransactions, setVisibleTransactions] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [addTransacaoModalOpen, setAddTransacaoModalOpen] = useState(false);
  const [key, setKey] = useState(0);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriaModalOpen, setCategoriaModalOpen] = useState(false);
  const [saldo, setSaldo] = useState(0); // Adicionando estado para o saldo
  const [novoSaldo, setNovoSaldo] = useState(0);
  const [modalCurrentPage, setModalCurrentPage] = useState(1);
  const [modalVisibleTransactions, setModalVisibleTransactions] = useState(5);

  const reloadPage = () => {
    window.location.reload();
    setKey((prevKey) => prevKey + 1);
  };

  const handleModalPageChange = (page) => {
    setModalCurrentPage(page);
  };

  const renderModalPagination = () => {
    const pages = [];
    for (let i = 1; i <= Math.ceil(transactionsData.length / modalVisibleTransactions); i++) {
      pages.push(
        <button key={i} onClick={() => handleModalPageChange(i)}>
          {i}
        </button>
      );
    }
    return pages;
  };

  const toggleFormModal = () => {
    setFormModalOpen(!formModalOpen);
  };

  const toggleAddTransacaoModal = () => {
    setAddTransacaoModalOpen(!addTransacaoModalOpen);
  };

  const toggleModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  const toggleCategoriaModal = () => {
    setCategoriaModalOpen(!categoriaModalOpen);
  };

  const handleCriarCategoria = async (nomeCategoria) => {
    try {
      const userId = '1';

      if (nomeCategoria) {
        // Chama o serviço para criar a categoria
        await createCategoria(userId, nomeCategoria, '');

        // Recarrega as transações ou realiza a ação desejada após criar a categoria
        reloadPage();
      } else {
        console.log('O nome da categoria é obrigatório.');
      }
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
    }
  };

  const formatDataExtensa = (data) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(data).toLocaleDateString('pt-BR', options);
  };

  const handleDeleteTransacao = async (transacaoId, tipo) => {
    try {
      const userId = '1';

      // Obtém os detalhes da transação que será excluída
      const response = await getTransacaoEspecifica(userId, transacaoId);
      const transacaoParaExcluir = response.data;

      // Chama o serviço para excluir a transação
      await destroyTransacao(userId, transacaoId);
      console.log((await getUsuarios('1')).data.saldo);
      // Se o tipo da transação for 'entrada', atualiza o saldo
      if (tipo === 'entrada') {
        const novoSaldo = (await getUsuarios('1')).data.saldo - transacaoParaExcluir.valor;
        setSaldo(novoSaldo);

        // Atualiza o saldo no backend
        await atualizarSaldoUsuario(userId, novoSaldo);
      }

      // Recarrega as transações após excluir
      await fetchTransactions();
      window.location.reload(true)
    } catch (error) {
      console.error('Erro ao excluir transação:', error);
    }
  };

  const recalculateSaldo = async () => {
    try {
      const userId = '1';

      // Chama o serviço para obter as transações do usuário
      const response = await getTransacoes(userId);

      // Calcula o saldo com base nas transações do usuário
      const novoSaldo = response.data.reduce((acc, transacao) => {
        return transacao.tipo === 'entrada' ? acc + transacao.valor : acc - transacao.valor;
      }, 0);

      // Atualiza o saldo no estado
      setSaldo(novoSaldo);
    } catch (error) {
      console.error('Erro ao recalcular saldo:', error);
    }
  };

  useEffect(() => {
    // Calcula o saldo inicial e carrega as transações ao montar o componente
    recalculateSaldo();
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const userId = '1';
      const response = await getTransacoes(userId);
      setTransactionsData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao obter transações:', error);
      setLoading(false);
    }
  };

  const isDateWithinCurrentMonth = (dateString) => {
    const currentDate = new Date();
    const inputDate = new Date(dateString);
    return (
      inputDate.getMonth() === currentDate.getMonth() &&
      inputDate.getFullYear() === currentDate.getFullYear()
    );
  };

  const transactionsThisMonth = transactionsData.filter((transaction) =>
    isDateWithinCurrentMonth(transaction.data)
  );

  const totalPages = Math.ceil(transactionsThisMonth.length / visibleTransactions);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button key={i} onClick={() => handlePageChange(i)}>
          {i}
        </button>
      );
    }
    return pages;
  };

  const sortedTransactions = transactionsThisMonth.sort((a, b) => {
    const dateA = new Date(a.data).getTime();
    const dateB = new Date(b.data).getTime();
    return dateB - dateA;
  });

  const paginatedTransactions = sortedTransactions.slice(
    (currentPage - 1) * visibleTransactions,
    currentPage * visibleTransactions
  );

  const handleAdicionarSaldo = async () => {
    try {
      const userId = '1';

      // Solicitar o novo saldo ao usuário
      const novoSaldoInput = prompt('Digite o novo saldo:');
      if (novoSaldoInput !== null) {
        const novoSaldoFloat = parseFloat(novoSaldoInput);

        // Validar se o valor digitado é um número
        if (!isNaN(novoSaldoFloat)) {
          // Atualizar o estado e enviar a requisição PATCH
          setNovoSaldo(novoSaldoFloat);
          await atualizarSaldoUsuario(userId, novoSaldoFloat);

          // Recalcular o saldo e atualizar o estado
          const { data: usuario } = await getUsuarios(userId);
          setSaldo(usuario.saldo);
        } else {
          alert('Por favor, digite um valor válido.');
        }
      }
      window.location.reload(true)
    } catch (error) {
      console.error('Erro ao adicionar saldo:', error);
    }
  };

  return (
    <div id='main'>
      <div className="main-content">
        <div className="content-left">
          <Saldos saldo={saldo} />
        </div>
        <div className="content-right">
          <h2 className="transactions-title">Últimas Movimentações</h2>
          <button onClick={toggleModalOpen}>Expandir</button>
          <button onClick={toggleAddTransacaoModal}>Adicionar Transação</button>
          <button onClick={toggleCategoriaModal}>Criar Categoria</button>

          <Modal isOpen={categoriaModalOpen} onClose={toggleCategoriaModal} onSave={handleCriarCategoria} />

          <div className="transactions-list">
            {paginatedTransactions.map((transaction) => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-details">
                  <div className="transaction-title">{transaction.nome}</div>
                  <div className="transaction-category">{transaction.categoria.nome}</div>
                  <div className="transaction-date">{formatDataExtensa(transaction.data)}</div>
                </div>
                <div className={`transaction-amount ${transaction.tipo === 'saida' ? 'saida' : 'entrada'}`}>
                  {transaction.tipo === 'saida' ? '-' : '+'} R$ {Math.abs(transaction.valor)}
                </div>

                <button onClick={() => handleDeleteTransacao(transaction.id, transaction.tipo)}>Deletar</button>
              </div>
            ))}
          </div>

          <div className="pagination">
            {renderPagination()}
          </div>
        </div>
      </div>

      {modalOpen && (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={toggleModalOpen}>
        &times;
      </span>
      <h2>Todas as Transações</h2>
      {transactionsData
        .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()) // Ordenação decrescente
        .slice((modalCurrentPage - 1) * modalVisibleTransactions, modalCurrentPage * modalVisibleTransactions)
        .map((transaction) => (
          <div key={transaction.id} className="transaction-item">
                <div className="transaction-details">
                  <div className="transaction-title">{transaction.nome}</div>
                  <div className="transaction-category">{transaction.categoria.nome}</div>
                  <div className="transaction-date">{formatDataExtensa(transaction.data)}</div>
                </div>
                <div className={`transaction-amount ${transaction.tipo === 'saida' ? 'saida' : 'entrada'}`}>
                  {transaction.tipo === 'saida' ? '-' : '+'} R$ {Math.abs(transaction.valor)}
                </div>
          </div>
        ))}
      <div className="pagination">
        {renderModalPagination()}
      </div>
    </div>
  </div>
)}


      {addTransacaoModalOpen && (
        <div className="add-transacao-modal">
          <AddTransacaoModal onClose={() => { toggleAddTransacaoModal(); reloadPage(); }} />
        </div>
      )}
    </div>
  );
};

export default MainPage;
