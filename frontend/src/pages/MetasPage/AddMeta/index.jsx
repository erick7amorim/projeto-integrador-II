import React, { useState, useEffect } from 'react';
import { getUsuarios, createMeta } from '../../../services/api';
import { redirect, useNavigate, Navigate, Link    } from "react-router-dom";

import './styles.css';

const MetasPage = () => {
  const [ newMetaNome, setNewMetaNome ] = useState('');
  const [ newMetaValor, setNewMetaValor ] = useState('');
  const [ newMetaData, setNewMetaData ] = useState('');
  const [ newMetaDescricao, setNewMetaDescricao ] = useState('');


  const [usuarios, setUsuarios] = useState([]);

  const loadData = async (query = '') => {
    const response = await getUsuarios('2');

    console.log(response.data);

    //setUsuarios(response.data);
  }

  // useEffect(() => {
  //   (async () => await loadData())();
  // }, []);

  const handleLogout = () => {
    console.log('logout');
  }

  const handleNewMeta = async (a, b, c, d) => {
    console.log('Metas');
    console.log('Nome: ' + a,'\nValor: ' + b,'\nData: ' + c,'\nDescrição: ' + d);
    try {
      await createMeta('1', a, b, c, d);
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

      <h1>Adicionar Metas</h1>
      <div id='add-meta'>
        <label htmlFor="add-meta-nome">Nome:</label>
        <input
          type="text"
          name='add-meta-nome'
          id="add-meta-nome"
          value={newMetaNome}
          onChange={(e) => setNewMetaNome(e.target.value)}/> <br></br><br></br>
        <label htmlFor="add-meta-valor">Valor:</label>
        <input type="number" name='add-meta-valor' id="add-meta-valor"
          value={newMetaValor}
          onChange={(e) => setNewMetaValor(e.target.value)}/> <br></br><br></br>
        <label htmlFor="add-meta-data">Data:</label>
        <input type="date" name='add-meta-data' id="add-meta-data"
          value={newMetaData}
          onChange={(e) => setNewMetaData(e.target.value)}/> <br></br><br></br>
        <label htmlFor="add-meta-descricao">Descrição:</label>
        <input type="text" name='add-meta-descricao' id="add-meta-descricao"
          value={newMetaDescricao}
          onChange={(e) => setNewMetaDescricao(e.target.value)}/> <br></br><br></br>
        <button onClick={() => handleNewMeta(newMetaNome, newMetaValor, newMetaData, newMetaDescricao)}>Adicionar</button>
        <Link to={`/metas`}>
          <button role="link">Voltar</button>
        </Link>

      </div>
    </div>
  )
}


export default MetasPage;
