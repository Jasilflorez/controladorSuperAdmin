import React from "react";
import { Link } from "react-router-dom";

export default function HeaderNav() {
  return (
    <nav className="header-nav">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/Login" className="nav-link">
            Iniciar Sesion 1
          </Link>
        </li> 

        <li className="nav-item">
          <Link to="/Registrar" className="nav-link">
            Registrar
          </Link>
        </li>
      </ul>
    </nav>
  );
}
