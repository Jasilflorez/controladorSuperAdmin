import React from "react";
import { Link } from "react-router-dom";
import logo from './img/logo.png'
import TextLogo from './img/TextLogo.png'

export default function HeaderNav() {
  return (
    <nav className="header-nav">
      <div className="BoxLogoHeader">
      <img className="LogoHeader" src={logo} alt="" srcset="" />
      <div className="BoxTextoLogo">
      <img className="TextLogo" src={TextLogo} alt="" srcset="" />
      </div>
      </div>
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Iniciar Sesion
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
