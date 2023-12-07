import React, { useState, useEffect } from 'react';
import { createTransacao, getCategorias } from '../services/api';
import './styles.css';

const AddTransacaoModal = ({ onClose }) => {
  const [newTransacaoNome, setNewTransacaoNome] = useState('');
  const [newTransacaoValor, setNewTransacaoValor] = useState('');
  const [newTransacaoData, setNewTransacaoData] = useState('');
  const [newTransacaoTipo, setNewTransacaoTipo] = useState('');
  const [newTransacaoDescricao, setNewTransacaoDescricao] = useState('');
  const [reloadData, setReloadData] = useState(false);

  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState('');

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await getCategorias('1');
        setCategorias(response.data);
        setNewTransacaoTipo('entrada');
      } catch (error) {
        console.error('Erro ao obter categorias:', error);
      }
    };

    fetchCategorias();
  }, []);

  const handleTipoChange = (event) => {
    setNewTransacaoTipo(event.target.value);
  };

  const handleNewTransacao = async () => {
    try {
      // Utilizando parseFloat da biblioteca nativa para melhor precisão
      const valorNumerico = parseFloat(newTransacaoValor.replace(',', '.'));

      await createTransacao(
        '1',
        newTransacaoNome,
        valorNumerico, // Usar o valor convertido
        newTransacaoDescricao,
        newTransacaoData,
        newTransacaoTipo,
        selectedCategoria
      );

      onClose();
      setReloadData(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-transacao-modal-content">
      <span className="close" onClick={onClose}>
        &times;
      </span>

      <div>
        <h2>Adicionar Transação</h2>

        <label htmlFor="add-transacao-nome">Nome: </label>
        <input
          type="text"
          name="add-transacao-nome"
          id="add-transacao-nome"
          value={newTransacaoNome}
          onChange={(e) => setNewTransacaoNome(e.target.value)}
        />
        <br />
        <br />

        <label htmlFor="add-transacao-valor">Valor: </label>
        <input
          type="text"
          name="add-transacao-valor"
          id="add-transacao-valor"
          value={newTransacaoValor}
          onChange={(e) => setNewTransacaoValor(e.target.value)}
        />
        <br />
        <br />

        <label htmlFor="add-transacao-descricao">Descrição: </label>
        <input
          type="text"
          name="add-transacao-descricao"
          id="add-transacao-descricao"
          value={newTransacaoDescricao}
          onChange={(e) => setNewTransacaoDescricao(e.target.value)}
        />
        <br />
        <br />

        <label htmlFor="add-transacao-data">Data: </label>
        <input
          type="date"
          name="add-transacao-data"
          id="add-transacao-data"
          value={newTransacaoData}
          onChange={(e) => setNewTransacaoData(e.target.value)}
        />
        <br />
        <br />

        <label>
          Tipo:
          <select value={newTransacaoTipo} onChange={handleTipoChange}>
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </select>
        </label>
        <br />
        <br />

        <label>
          Categoria:
          <select
            value={selectedCategoria}
            onChange={(e) => setSelectedCategoria(e.target.value)}
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </label>
        <br />
        <br />

        <button onClick={handleNewTransacao}>Adicionar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default AddTransacaoModal;
