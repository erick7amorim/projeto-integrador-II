import React from "react";

const Transacoes = ({trasancoes, onDelete }) => {
    return (
        <div className="transacoes">
                <h2 className="title">Suas Transações</h2>

                <ul className="list">
                    {
                        trasancoes.map((transacao) => (
                            <li className="item"  key={transacao._id}>
                            <div className="info">
                                <div className="own"></div>
                                <div className="name">Nome: {transacao.nome}</div>
                                <div className="name">Descrição: {transacao.descricao}</div>
                                <div className="name">Valor: {transacao.valor}</div>
                                <div className="name">Data: {transacao.data}</div>
                                <div className="name">Tipo: {transacao.tipo}</div>
                            </div>
                            <button onClick={() => onDelete(transacao)}>Apagar</button>
                            </li>
                        ))
                    }

                </ul>
            </div>
    );
}

export default Transacoes;
