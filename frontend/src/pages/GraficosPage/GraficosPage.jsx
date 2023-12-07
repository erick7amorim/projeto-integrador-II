import React, { useState, useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { getTransacoes, getCategoriasXValorEntradas, getCategoriasXValorSaidas, getCategoriasXValorTodos } from "../../services/api";
import { Chart, registerables } from "chart.js";
import Nav from '../Nav';
import './styles.css';
Chart.register(...registerables);

const GraficosPage = () => {
  const [dadosExemplo, setDadosExemplo] = useState([]);
  const [dadosCategorias, setDadosCategorias] = useState([]);
  const [dadosCategoriasSaidas, setDadosCategoriasSaidas] = useState([]);
  const [tipoFiltro, setTipoFiltro] = useState("ambos"); // Padrão para exibir ambos
  const [tipoFiltro2, setTipoFiltro2] = useState("ambos"); // Padrão para exibir ambos
  const [selectedFilter, setSelectedFilter] = useState("ambos");
  const [selectedFilter2, setSelectedFilter2] = useState("ambos");

  useEffect(() => {
    const carregarDadosTransacoes = async () => {
      try {
        const userId = "1";
        const response = await getTransacoes(userId);
        setDadosExemplo(response.data);
      } catch (error) {
        console.error("Erro ao carregar transações:", error);
      }
    };

    const carregarDadosCategorias = async () => {
      try {
        const userId = "1";
        let response;

        if (selectedFilter2 === "entrada") {
          response = await getCategoriasXValorEntradas(userId);
        } else if (selectedFilter2 === "saida") {
          response = await getCategoriasXValorSaidas(userId);
        } else {
          response = await getCategoriasXValorTodos(userId);
        }

        setDadosCategorias(response.data);
      } catch (error) {
        console.error("Erro ao carregar dados de categorias:", error);
      }
    };

    const carregarDadosCategoriasSaidas = async () => {
      try {
        const userId = "1";
        const response = await getCategoriasXValorSaidas(userId);
        setDadosCategoriasSaidas(response.data.slice(0, 3)); // Limita às 3 primeiras categorias
      } catch (error) {
        console.error("Erro ao carregar dados de categorias de saída:", error);
      }
    };

    carregarDadosTransacoes();
    carregarDadosCategorias();
    carregarDadosCategoriasSaidas();
  }, [selectedFilter, selectedFilter2]);

  function converterDataParaMesExtensivo(dados) {
    dados.forEach((item) => {
      const dataString = item.data;
      const data = new Date(dataString);
      const mesExtensivo = obterMesExtensivo(data.getMonth());
      item.mesExtensivo = mesExtensivo;
    });
  }

  function obterMesExtensivo(numeroMes) {
    const mesesExtensivos = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    return mesesExtensivos[numeroMes];
  }

  const mesesCompletos = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const calcularValoresPorTipo = (tipo) => {
    return mesesCompletos.map((mes) => {
      const valoresDoMes = dadosExemplo.filter(
        (item) => item.mesExtensivo === mes && (tipo === "ambos" || item.tipo === tipo)
      );
      const somaDosValores = valoresDoMes.reduce((total, item) => total + item.valor, 0);
      return somaDosValores;
    });
  };

  const dadosEntrada = calcularValoresPorTipo("entrada");
  const dadosSaida = calcularValoresPorTipo("saida");
  converterDataParaMesExtensivo(dadosExemplo);

  const handleTipoFiltroChange = (event) => {
    setTipoFiltro(event.target.value);
    setSelectedFilter(event.target.value);
  };

  const handleTipoFiltro2Change = (event) => {
    setTipoFiltro2(event.target.value);
    setSelectedFilter2(event.target.value);
  };

  const dataBar = {
    labels: mesesCompletos,
    datasets: [
      {
        label: "Entrada",
        data: dadosEntrada,
        backgroundColor: "rgba(92, 184, 92, 0.8)",
        borderColor: "rgba(92, 184, 92, 1)",
        borderWidth: 1,
        hidden: tipoFiltro === "saida",
      },
      {
        label: "Saída",
        data: dadosSaida,
        backgroundColor: "rgba(217, 83, 79, 0.8)",
        borderColor: "rgba(217, 83, 79, 1)",
        borderWidth: 1,
        hidden: tipoFiltro === "entrada",
      },
    ],
  };

  const optionsBar = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Valores",
        },
      },
      x: {
        title: {
          display: true,
          text: "Meses",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
    },
  };

  const dataDoughnut = {
    labels: dadosCategorias.map((categoria) => categoria.categoria),
    datasets: [
      {
        data: dadosCategorias.map((categoria) => categoria.soma),
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384", "#4BC0C0", "#9966FF", "#FF9F40", "#3F729B"],
        hoverBackgroundColor: ["#36A2EB", "#FFCE56", "#FF6384", "#4BC0C0", "#9966FF", "#FF9F40", "#3F729B"],
      },
    ],
  };

  const optionsDoughnut = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Título do Gráfico de Rosca",
      },
      legend: {
        display: true,
        position: "right",
      },
    },
    tooltips: {
      callbacks: {
        label: (context) => {
          const labelIndex = context.dataIndex;
          return `${context.label}: ${context.raw}`; // Mostra o valor na fatia
        },
      },
    },
  };

  const dataBarHorizontal = {
    labels: dadosCategoriasSaidas.map((categoria) => categoria.categoria),
    datasets: [
      {
        data: dadosCategoriasSaidas.map((categoria) => categoria.soma),
        backgroundColor: "rgba(217, 83, 79, 0.8)",
        borderColor: "rgba(217, 83, 79, 1)",
        borderWidth: 1,
      },
    ],
  };

  const optionsBarHorizontal = {
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Valores",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Top 3 Categorias Mais Gastas",
        position: "top", // Pode ajustar a posição conforme necessário
      },
      legend: {
        display: false,
      },
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
    },
  };

  return (
    <div>
      <h2>Dashboard Financeiro</h2>
      <div>
        {/* Filtro para o gráfico de barras */}
        <label>
          Filtrar:
          <select value={selectedFilter} onChange={handleTipoFiltroChange}>
            <option value="ambos">Ambos</option>
            <option value="entrada">Somente Entradas</option>
            <option value="saida">Somente Saídas</option>
          </select>
        </label>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ margin: "10px", minWidth: "800px", width: "70%", height: "300px" }}>
          <Bar data={dataBar} options={optionsBar} />
        </div>

        <div style={{ display: "flex", margin: "10px", alignItems: "flex-start" }}>
          {/* Filtro para o gráfico de Doughnut */}
          <div style={{ minWidth: "400px", width: "15%", marginRight: "10px", height: "300px" }}>
            <label>
              Filtrar:
              <select value={selectedFilter2} onChange={handleTipoFiltro2Change}>
                <option value="ambos">Ambos</option>
                <option value="entrada">Somente Entradas</option>
                <option value="saida">Somente Saídas</option>
              </select>
            </label>
            <div style={{ minWidth: "400px", width: "15%", marginRight: "10px", height: "300px" }}>
              <h2>Categorias x Valor</h2>
              <Doughnut data={dataDoughnut} options={optionsDoughnut} />
            </div>
          </div>

          {/* Gráfico de barras horizontal */}
          <div style={{ minWidth: "400px", width: "15%", height: "300px" }}>
            <h2>Top 3 Gastos Financeiros</h2>
            <Bar data={dataBarHorizontal} options={optionsBarHorizontal} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraficosPage;
