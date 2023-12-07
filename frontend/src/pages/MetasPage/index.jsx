import React, { useState, useEffect } from 'react';
import { destroyMeta, getMetas, createMeta } from '../../services/api';
import './styles.css';
import { FaTrash } from 'react-icons/fa';
import { submetasApi } from '../../services/api';
import Modal from 'react-modal';
import { atualizarSaldoMeta } from '../../services/api';

const MetasPage = () => {
  const [metas, setMetas] = useState([]);
  const [currentMetaId, setCurrentMetaId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const [submetas, setSubmetas] = useState([]);
  const [novoValorAcumulado, setNovoValorAcumulado] = useState(0);
  const [isAtualizarModalOpen, setIsAtualizarModalOpen] = useState(false);
  const [currentMeta, setCurrentMeta] = useState(null);
  const [showSubmetaModal, setShowSubmetaModal] = useState(false);
  const [isAddSubmetaModalOpen, setIsAddSubmetaModalOpen] = useState(false);
  const [submetaData, setSubmetaData] = useState({
    nome: '',
    descricao: '',
    valor: 0,
    valorFinal: 0,
    dataFinal: '',
  });
  const [editedSubmeta, setEditedSubmeta] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [metaData, setMetaData] = useState({
    nome: '',
    descricao: '',
    valor: 0,
    data: '',
  });

  const formatDataExtensa = (data) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(data).toLocaleDateString('pt-BR', options);
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await getMetas('1');
      setMetas(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoadingError(true);
    }
  };

  const handleShowSubmetas = async (metaId) => {
    try {
      setCurrentMetaId(metaId);
      const selectedMeta = metas.find((meta) => meta.id === metaId);

      // Garanta que a meta atual está definida corretamente
      setCurrentMeta(selectedMeta || null);

      const response = await submetasApi.getSubmetas('1', metaId);
      setSubmetas(response.data);
      setShowSubmetaModal(true);
    } catch (error) {
      console.error('Erro ao obter submetas:', error);
    }
  };



  const handleDeleteMeta = async (meta) => {
    try {
      await destroyMeta('1', meta.id);
      console.log('Meta excluída com sucesso:', meta.id);

      // Remova a meta da lista local sem recarregar a página
      setMetas((prevMetas) => prevMetas.filter((item) => item.id !== meta.id));
      setCurrentMetaId(null);
setCurrentMeta(null);
    } catch (error) {
      console.error('Erro ao excluir meta:', error);
      // Exiba uma mensagem de erro ao usuário, se necessário
      alert('Erro ao excluir meta. Verifique o console para mais detalhes.');
    }
  };

  const handleDeleteSubmeta = async (submeta) => {
    try {
      await submetasApi.deleteSubmeta('1', currentMetaId, submeta.id);
      console.log('Submeta excluída com sucesso:', submeta.id);

      // Remova a submeta da lista local sem recarregar a página
      setSubmetas((prevSubmetas) => prevSubmetas.filter((item) => item.id !== submeta.id));
    } catch (error) {
      console.error('Erro ao excluir submeta:', error);
      // Exiba uma mensagem de erro ao usuário, se necessário
      alert('Erro ao excluir submeta. Verifique o console para mais detalhes.');
    }
  };

  const handleAtualizarValorAcumulado = async () => {
    try {
      console.log('ID da Meta Atual:', currentMetaId);

      if (!currentMetaId) {
        console.error('ID da meta não definido.');
        return;
      }

      // Chame sua função de atualização aqui com o novo valor acumulado e o ID da meta
      await atualizarSaldoMeta('1', novoValorAcumulado, currentMetaId);

      // Feche o modal após a atualização
      setIsAtualizarModalOpen(false);

      // Recarregue as metas após a atualização do valor acumulado
      loadData();
    } catch (error) {
      console.error('Erro ao atualizar valor acumulado:', error);
    }
  };


  const handleEditSubmeta = (submeta) => {
    setEditedSubmeta(submeta);
    setIsEditModalOpen(true);
  };

  const handleUpdateSubmeta = async () => {
    try {
      if (currentMetaId !== null && currentMetaId !== undefined) {
        await submetasApi.updateSubmeta('1', currentMetaId, editedSubmeta.id, editedSubmeta);
        setSubmetas((prevSubmetas) =>
          prevSubmetas.map((item) => (item.id === editedSubmeta.id ? editedSubmeta : item))
        );

        // Feche o modal de edição
        setIsEditModalOpen(false);
      } else {
        console.error('ID da meta não definido');
      }
    } catch (error) {
      console.error('Erro ao atualizar submeta:', error);
    }
  };

  const handleAddSubmeta = () => {
    // Abra a janela modal para adicionar submeta
    setIsAddSubmetaModalOpen(true);
  };

  const handleCreateSubmeta = async () => {
    try {
      if (currentMetaId !== null && currentMetaId !== undefined) {
        // Lógica para criar uma nova submeta utilizando submetaData
        await submetasApi.createSubmeta('1', currentMetaId, submetaData);

        // Recarregue as submetas após a criação da nova submeta
        const response = await submetasApi.getSubmetas('1', currentMetaId);
        setSubmetas(response.data);

        // Feche o modal de adição
        setIsAddSubmetaModalOpen(false);
      } else {
        console.error('ID da meta não definido');
      }
    } catch (error) {
      console.error('Erro ao criar submeta:', error);
    }
  };

  const handleOpenAtualizarModal = (metaId) => {
    setCurrentMetaId(metaId);
    setIsAtualizarModalOpen(true);
  };



  const handleAddMeta = () => {
    // Abra a janela modal para adicionar meta
    setIsAddModalOpen(true);
  };

  const handleCreateMeta = async () => {
    try {
      console.log(metaData);
      // Lógica para criar uma nova meta utilizando metaData
      await createMeta('1', metaData.nome, metaData.valor, metaData.data, metaData.descricao, metaData.valorDesejado);

      // Recarregue as metas após a criação da nova meta
      loadData();

      // Feche o modal de adição
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Erro ao criar meta:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div id="main">
      <h1>Metas</h1>
      <button onClick={() => handleAddMeta()}>Adicionar Meta</button>
      {loading && <p>Carregando metas...</p>}
      {loadingError && <p>Erro ao carregar metas.</p>}
      {!loading && !loadingError && (
        <div className="meta-list">
          {metas.map((meta) => (
            <div key={meta.id} className="meta-item">
              <div className="meta-content">
                <h2>{meta.nome}</h2>
                <p className="valor-meta">Valor Desejado: R$ {meta.valorFinal}</p> <br></br>
                <p className="valor-meta">Valor Acumulado: R$ {meta.valor}</p>
                <p>Data: {formatDataExtensa(meta.data)}</p>
                <button onClick={() => handleOpenAtualizarModal(meta.id)}>Atualizar Valor Acumulado</button>
                <button onClick={() => handleShowSubmetas(meta.id)}>Ver Submetas</button>
                <button onClick={() => handleDeleteMeta(meta)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showSubmetaModal && (
        <div className="submeta-modal">
          <div className="submeta-content">
            <h2>Submetas da Meta {currentMeta?.nome}</h2>
            <ul>
              {submetas.map((submeta) => (
                <li key={submeta.id} className="submeta-item">
                  <div className="submeta-details">
                    <span className="submeta-name">{submeta.nome}</span><br></br>
                    <span>Valor Atual: R$ {submeta.valor}</span> <br></br>
                    <span>Valor Alvo: R$ {submeta.valorFinal}</span><br></br>
                    <span>Data: {formatDataExtensa(submeta.dataFinal)}</span>
                    <div className="submeta-progress">
                      <span>Progresso: {((submeta.valor / submeta.valorFinal) * 100).toFixed(2)}%</span>
                      <progress max="100" value={(submeta.valor / submeta.valorFinal) * 100}></progress>
                    </div>
                  </div>
                  <div className="submeta-actions">
                    <button onClick={() => handleEditSubmeta(submeta)}>Editar</button>
                    <button onClick={() => handleDeleteSubmeta(submeta)}>Excluir</button>
                  </div>
                </li>
              ))}
            </ul>
            <button onClick={handleAddSubmeta}>Adicionar Submeta</button>
            <button onClick={() => setShowSubmetaModal(false)}>Fechar Submetas</button>
          </div>
        </div>
      )}

      {/* Modal de Edição */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        contentLabel="Editar Submeta"
      >
        <h2>Editar Submeta</h2>
        <label htmlFor="edit-nome">Nome:</label>
        <input
          type="text"
          id="edit-nome"
          value={editedSubmeta?.nome || ''}
          onChange={(e) => setEditedSubmeta({ ...editedSubmeta, nome: e.target.value })}
        />
        <label htmlFor="edit-valor">Valor:</label>
        <input
          type="text"
          id="edit-valor"
          value={editedSubmeta?.valor || 0}
          onChange={(e) => setEditedSubmeta({ ...editedSubmeta, valor: Number(e.target.value) })}
        />
        <label htmlFor="edit-valorFinal">Valor Final:</label>
        <input
          type="text"
          id="edit-valorFinal"
          value={editedSubmeta?.valorFinal || 0}
          onChange={(e) => setEditedSubmeta({ ...editedSubmeta, valorFinal: Number(e.target.value) })}
        />
        <label htmlFor="edit-dataFinal">Data Final:</label>
        <input
          type="text"
          id="edit-dataFinal"
          value={editedSubmeta?.dataFinal || ''}
          onChange={(e) => setEditedSubmeta({ ...editedSubmeta, dataFinal: e.target.value })}
        />
        <button onClick={handleUpdateSubmeta}>Salvar</button>
        <button onClick={() => setIsEditModalOpen(false)}>Cancelar</button>
      </Modal>

      <Modal
        isOpen={isAtualizarModalOpen}
        onRequestClose={() => setIsAtualizarModalOpen(false)}
        contentLabel="Atualizar Valor Acumulado"
      >
        <h2>Atualizar Valor Acumulado</h2>
        <label htmlFor="novo-valor-acumulado">Novo Valor Acumulado:</label>
        <input
          type="text"
          id="novo-valor-acumulado"
          value={novoValorAcumulado}
          onChange={(e) => setNovoValorAcumulado(Number(e.target.value))}
        />
        <button onClick={() => handleAtualizarValorAcumulado(metas)}>Atualizar</button>
        <button onClick={() => setIsAtualizarModalOpen(false)}>Cancelar</button>
      </Modal>

{/* Modal de Adição de Submeta */}
<Modal
  isOpen={isAddSubmetaModalOpen}
  onRequestClose={() => setIsAddSubmetaModalOpen(false)}
  contentLabel="Adicionar Submeta"
>
  <h2>Adicionar Submeta</h2>
  <form>
    <label htmlFor="add-submeta-nome">Nome:</label>
    <input
      type="text"
      id="add-submeta-nome"
      value={submetaData.nome}
      onChange={(e) => setSubmetaData({ ...submetaData, nome: e.target.value })}
    />
    <label htmlFor="add-submeta-valor">Valor:</label>
    <input
      type="text"
      id="add-submeta-valor"
      value={submetaData.valor}
      onChange={(e) => setSubmetaData({ ...submetaData, valor: Number(e.target.value) })}
    />
    <label htmlFor="add-submeta-valorFinal">Valor Final:</label>
    <input
      type="text"
      id="add-submeta-valorFinal"
      value={submetaData.valorFinal}
      onChange={(e) => setSubmetaData({ ...submetaData, valorFinal: Number(e.target.value) })}
    />
    <label htmlFor="add-submeta-dataFinal">Data Final:</label>
    <input
      type="date"
      id="add-submeta-dataFinal"
      value={submetaData.dataFinal}
      onChange={(e) => setSubmetaData({ ...submetaData, dataFinal: e.target.value })}
    />
    <button type="button" onClick={handleCreateSubmeta}>
      Salvar
    </button>
    <button type="button" onClick={() => setIsAddSubmetaModalOpen(false)}>
      Cancelar
    </button>
  </form>
</Modal>

      {/* Modal de Adição de Meta */}
      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        contentLabel="Adicionar Meta"
      >
        <h2>Adicionar Meta</h2>
        <label htmlFor="add-nome">Nome:</label>
        <input
          type="text"
          id="add-nome"
          value={metaData.nome}
          onChange={(e) => setMetaData({ ...metaData, nome: e.target.value })}
        />
        <label htmlFor="add-valor">Valor:</label>
        <input
          type="text"
          id="add-valor"
          value={metaData.valor}
          onChange={(e) => setMetaData({ ...metaData, valor: Number(e.target.value) })}
        />
                <label htmlFor="add-valor">Valor Desejado:</label>
        <input
          type="text"
          id="add-valor"
          value={metaData.valorDesejado}
          onChange={(e) => setMetaData({ ...metaData, valorDesejado: Number(e.target.value) })}
        />
        <label htmlFor="add-data">Data:</label>
        <input
          type="date"
          id="add-data"
          value={metaData.data}
          onChange={(e) => setMetaData({ ...metaData, data: e.target.value })}
        />
        <button onClick={handleCreateMeta}>Salvar</button>
        <button onClick={() => setIsAddModalOpen(false)}>Cancelar</button>
      </Modal>
    </div>
  );
};

export default MetasPage;
