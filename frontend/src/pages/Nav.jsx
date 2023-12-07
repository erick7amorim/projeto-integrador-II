import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='nav'>
    <h1 className='logo'>Finn App</h1>
    <Link to={`/`}>
          <button role="link">Home</button>
    </Link>
    <div className="dropdown">
      <button className="menu" onClick={() => setMenuOpen(!menuOpen)}>Menu</button>
      {menuOpen && (
        <div className="dropdown-content">
          <Link to={`/metas`}>
            <button onClick={() => setMenuOpen(false)}>Metas</button>
          </Link>
          <Link to={`/orcamentos`}>
            <button onClick={() => setMenuOpen(false)}>Orçamentos</button>
          </Link>
          <Link to={`/graficos`}>
            <button onClick={() => setMenuOpen(false)}>Ver Estatísticas</button>
          </Link>
          <button>Sair</button>
        </div>
      )}
    </div>
  </div>
  )
}

export default Nav;
