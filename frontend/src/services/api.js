import axios from "axios";

export const api = axios.create({
  baseURL: 'http://localhost:5000'
});


export const getUsuarios = async(userId, query) => {
  let url = `/usuarios/${userId}`;

  return api.get(url);
}

export const atualizarSaldoMeta = async (usuarioId, novoValor, metaId) => {
  const response = await api.patch(`/usuarios/${usuarioId}/meta/${metaId}`, { valor: novoValor });
  return response.data;
};

// gastos do mês usuário
export const getGastosDoUsuarioMesAtual = async(userId, query) => {
  let url = `/usuarios/${userId}/gastos-saida-mes-atual`;

  return api.get(url);
}

// Metas
export const getMetas = async(userId) => {
  let url = `/usuarios/${userId}/meta`;

  return api.get(url);
}

export const createMeta = async(userId, a, b, c, d, e) => {
  let url = `/usuarios/${userId}/meta`;

  return api.post(url, { nome: a, valor: b, data: c, descricao: d, valorFinal: e});
}

export const destroyMeta = async (userId, id) => {
  let url = `usuarios/${userId}/meta/${id}`;

  return api.delete(url);
}

// Transação
export const createTransacao = async (userId, a, b, d, p, tipo, t) => {
  let url = `/usuarios/${userId}/transacao`;

  // Atualizar o saldo do usuário com base no tipo de transação
  const { data: usuario } = await getUsuarios(userId);

  let novoSaldo = usuario.saldo;

  if (tipo === 'entrada') {
    novoSaldo += parseFloat(b);
  }

  await api.post(url, { nome: a, valor: b, descricao: d, data: p, tipo, categoriaID: t });

  // Atualizar o saldo do usuário após a transação
  await api.patch(`/usuarios/${userId}`, { saldo: novoSaldo });
}


export const getTransacaoEspecifica = async(userId, id) => {
  let url = `/usuarios/${userId}/transacao/${id}`;

  return api.get(url);
}


export const getTransacoes = async(userId) => {
  let url = `/usuarios/${userId}/transacao`;

  return api.get(url);
}

export const destroyTransacao = async (userId, id) => {
  let url = `usuarios/${userId}/transacao/${id}`;

  return api.delete(url);
}

// Categorias
export const getCategorias = async(userId) => {
  let url = `/usuarios/${userId}/categorias`;

  return api.get(url);
}

export const createCategoria = async(userId, a, b) => {
  let url = `/usuarios/${userId}/categorias`;

  return api.post(url, { nome: a, descricao: b });
}

// Orçamentos
export const getOrcamentos = async(userId) => {
  let url = `/usuarios/${userId}/orcamento`;

  return api.get(url);
}

export const editOrcamentos = async(userId, id, novoLimite, novaData) => {
  let url = `/usuarios/${userId}/orcamento/${id}`;

  return api.patch(url, { limite: novoLimite, data: novaData });
}

export const atualizarSaldoUsuario = async (userId, novoSaldo) => {
  try {
    const url = `/usuarios/${userId}`;
    // Faz a requisição PATCH para atualizar o saldo
    await api.patch(url, { saldo: novoSaldo });
  } catch (error) {
    console.error('Erro ao atualizar saldo do usuário:', error);
    throw error;
  }
};

export const createOrcamentos = async(userId, a, b) => {
  let url = `/usuarios/${userId}/orcamento`;

  return api.post(url, { limite: a, data: b });
}

export const destroyOrcamentos = async(userId, id) => {
  let url = `/usuarios/${userId}/orcamento/${id}`;

  return api.delete(url);
}

// Categorias
export const getCategoriasXValorTodos = async(userId) => {
  let url = `/usuarios/${userId}/soma-valores-por-categoria`;

  return api.get(url);
}

export const getCategoriasXValorEntradas = async(userId) => {
  let url = `/usuarios/${userId}/soma-valores-entrada-por-categoria`;

  return api.get(url);
}

export const getCategoriasXValorSaidas = async(userId) => {
  let url = `/usuarios/${userId}/soma-valores-saida-por-categoria`;

  return api.get(url);
}

// export const getSubmetas = async(userId, a, b) => {
//   let url = `/usuarios/${userId}/categorias`;

//   return api.post(url, { nome: a, descricao: b });
// }

export const submetasApi = {
  getSubmetas: async (userId, metaId) => {
    let url = `/metas/${metaId}/submeta`;
    return api.get(url);
  },

  createSubmeta: async (userId, metaId, submetaData) => {
    let url = `/metas/${metaId}/submeta`;
    return api.post(url, submetaData);
  },

  updateSubmeta: async (userId, metaId, submetaId, submetaData) => {
    let url = `/metas/${metaId}/submeta/${submetaId}`;
    return api.patch(url, submetaData);
  },

  deleteSubmeta: async (userId, metaId, submetaId) => {
    let url = `/metas/${metaId}/submeta/${submetaId}`;
    return api.delete(url);
  },
};
