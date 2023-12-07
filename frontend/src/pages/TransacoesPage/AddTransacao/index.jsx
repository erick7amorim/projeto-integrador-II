import React, { useState, useEffect } from 'react';
import './styles.css';
import { redirect, useNavigate, Navigate, Link    } from "react-router-dom";
import { createTransacao, getCategorias } from '../../../services/api';

const AddTransacao = () => {
  const [ newTransacaoNome, setNewTransacaoNome ] = useState('');
  const [ newTransacaoValor, setNewTransacaoValor ] = useState('');
  const [ newTransacaoData, setNewTransacaoData ] = useState('')
  const [ newTransacaoTipo, setNewTransacaoTipo ] = useState('')
  const [ newTransacaoDescricao, setNewTransacaoDescricao ] = useState('');

  //
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
    console.log(event.target.value);
    setNewTransacaoTipo(event.target.value);
  };

  const handleLogout = () => {
    console.log('logout');
  }

  const handleNewTransacao = async (a, b, d, p, batata) => {
    console.log('Transacao');
    console.log('Nome: ' + a);
    console.log('Valor: ' + b);
    console.log('Tipo: ' + batata);
    console.log('Descrição: ' + d);
    console.log('Data: ' + p);
    console.log('Categoria: ' + selectedCategoria);
    try {
      await createTransacao('1', a, b, d, p, batata, selectedCategoria);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id='main'>
      <div className='nav'>
        <h1 className='logo'>Finn App</h1>
        <button onClick={handleLogout}>Sair</button>
      </div>

      <h1>Adicionar Transação</h1>

      <label htmlFor="add-transacao-nome">Nome: </label>
        <input type="text" name='add-transacao-nome' id="add-transacao-nome"
          value={newTransacaoNome}
          onChange={(e) => setNewTransacaoNome(e.target.value)}/> <br></br><br></br>

      <label htmlFor="add-transacao-valor">Valor: </label>
        <input type="number" name='add-transacao-valor' id="add-transacao-valor"
          value={newTransacaoValor}
          onChange={(e) => setNewTransacaoValor(e.target.value)}/> <br></br><br></br>

      <label htmlFor="add-transacao-descricao">Descrição: </label>
        <input type="text" name='add-transacao-descricao' id="add-transacao-descricao"
          value={newTransacaoDescricao}
          onChange={(e) => setNewTransacaoDescricao(e.target.value)}/> <br></br><br></br>

        <label htmlFor="add-transacao-data">Data: </label>
        <input type="date" name='add-transacao-data' id="add-transacao-data"
          value={newTransacaoData}
          onChange={(e) => setNewTransacaoData(e.target.value)}/> <br></br><br></br>

       <label>
        Tipo:
        <select value={newTransacaoTipo} onChange={handleTipoChange}>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>
      </label> <br></br><br></br>

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
    </label><br></br><br></br>

        <button onClick={() => handleNewTransacao(newTransacaoNome, newTransacaoValor, newTransacaoDescricao, newTransacaoData, newTransacaoTipo, selectedCategoria)}>Adicionar</button>
        <Link to={`/transacoes`}>
          <button role="link">Voltar</button>
        </Link>
      </div>
  )
}


export default AddTransacao;
