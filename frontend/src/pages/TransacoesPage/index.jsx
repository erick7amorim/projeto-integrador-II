import React, { useState, useEffect } from 'react';
import './styles.css';
import { redirect, useNavigate, Navigate, Link    } from "react-router-dom";

import { getTransacoes, destroyTransacao } from '../../services/api';
import Transacoes from './Transacoes';

const TransacoesPage = () => {

  const handleLogout = () => {
    console.log('logout');
  }

  const handleDeleteHabit = async (transacao) => {
    try {
        await destroyTransacao('1', transacao.id);
        loadData();
    } catch (error) {
        console.error(error);
    }
  }

  const [transacoes, setTransacoes ] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  const loadData = async (query = '') => {
    try {
            setLoading(true);
            const response = await getTransacoes('1');
            console.log(response.data);
            setTransacoes(response.data);
            setLoading(false);
    } catch (error) {
        console.error(error);
        setLoadingError(true);
    }
}

useEffect(() => {
    (async () => await loadData())();
}, []);

  return (
    <div id='main'>
      <div className='nav'>
        <h1 className='logo'>Finn App</h1>
        <button onClick={handleLogout}>Sair</button>
      </div>
      <h1>Transações</h1>
      <div className="actions">
        <Link to={`adicionar-transacao`}>
          <button role="link">Adicionar Transação</button>
        </Link>
        <Link to={`/categorias/adicionar-categoria`}>
          <button role="link">Criar Categoria</button>
        </Link>
        <Link to={`/`}>
          <button role="link">Voltar</button>
        </Link>
        <Transacoes
        trasancoes={transacoes}
        onDelete={handleDeleteHabit} />
      </div>
    </div>
  )
}


export default TransacoesPage;
