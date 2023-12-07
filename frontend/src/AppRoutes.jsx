import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Nav from "./pages/Nav";
import MainPage from "./pages/MainPage";
import MetasPage from "./pages/MetasPage";
import OrcamentosPage from "./pages/OrcamentosPage";
import TransacoesPage from "./pages/TransacoesPage";
import AddTransacao from "./pages/TransacoesPage/AddTransacao";
import AddMeta from "./pages/MetasPage/AddMeta";
import AddCategoria from "./pages/CategoriasPage/AddCategoria.jsx";
import GraficosPage from "./pages/GraficosPage/GraficosPage";

const AppRoutes = () => {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route exact path="/metas" element={<MetasPage />} />
          <Route exact path="/orcamentos" element={<OrcamentosPage />} />
          <Route exact path="/transacoes" element={<TransacoesPage />} />
          <Route
            exact
            path="/transacoes/adicionar-transacao"
            element={<AddTransacao />}
          />
          <Route exact path="/metas/adicionar-meta" element={<AddMeta />} />
          <Route
            exact
            path="/categorias/adicionar-categoria"
            element={<AddCategoria />}
          />
          <Route exact path="/graficos" element={<GraficosPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRoutes;
