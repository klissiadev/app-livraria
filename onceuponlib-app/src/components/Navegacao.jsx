// Navegacao.js
import React from "react";
import { NavLink } from "react-router-dom";

const linkCorrente =({isActive}) => ({
  color:isActive ? "#4d3d2fff" : "#f8f2f2",
  fontWeight: isActive ? "700" : "600",
});

const Navegacao = () => (
  <nav aria-label="Navegação principal">
    <ul style={{
      listStyle: "none",
      padding:0,
      display: "flex",
      gap: "1rem",
      margin: 0
    }}>
      <li>
        <NavLink
          to='/'
          style={linkCorrente}
          end
          aria-current='page'
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/frontend'
          style={linkCorrente}          
        >
          Frontend
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/programacao'
          style={linkCorrente}          
        >
          Programação
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/design'
          style={linkCorrente}          
        >
          Design
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/catalogo'
          style={linkCorrente}          
        >
          Catálogo
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/carrinho'
          style={linkCorrente}
        >
          Carrinho
        </NavLink>
      </li>
    </ul>
  </nav>
);


export default Navegacao;