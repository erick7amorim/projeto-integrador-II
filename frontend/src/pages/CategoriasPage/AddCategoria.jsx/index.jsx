import React, { useState, useEffect } from 'react';
import { getUsuarios, createMeta, createCategoria } from '../../../services/api';
import { redirect, useNavigate, Navigate, Link    } from "react-router-dom";
import Nav from '../../Nav';
import './styles.css';

const AddCategoria = () => {
  const [ newCategoriaNome, setNewCategoriaNome ] = useState('');
  const [ newCategoriaDescricao, setNewCategoriaDescricao ] = useState('');

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

  const handleNewCategoria = async (a, b) => {
    console.log('Metas');
    console.log('Nome: ' + a,'\nDescrição: ' + b);
    try {
      await createCategoria('1', a, b);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id='main'>
      <Nav />

      <h1>Adicionar Categorias</h1>
      <div id='add-meta'>
        <label htmlFor="add-meta-nome">Nome:</label>
        <input
          type="text"
          name='add-meta-nome'
          id="add-meta-nome"
          value={newCategoriaNome}
          onChange={(e) => setNewCategoriaNome(e.target.value)}/> <br></br><br></br>
        <label htmlFor="add-meta-valor">Descrição:</label>
        <input type="text" name='add-meta-valor' id="add-meta-valor"
          value={newCategoriaDescricao}
          onChange={(e) => setNewCategoriaDescricao(e.target.value)}/> <br></br><br></br>

        <button onClick={() => handleNewCategoria(newCategoriaNome, newCategoriaDescricao)}>Adicionar</button>
        <Link to={`/transacoes`}>
          <button role="link">Voltar</button>
        </Link>

      </div>
    </div>
  )
}


export default AddCategoria;
