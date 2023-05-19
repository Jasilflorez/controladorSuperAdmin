import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Validacion from "./Validacion";
import OtraVista from "./OtraVista";
import Registrar from "./Registrar";
import Headernav from "./Components/Headernav";
import Vistausuario from "./Components/Vistausuario";
import "./App.css";
function App() {
  return (
    <Router>
      <Headernav />
      <div className="App">
        <Routes>
          <Route path="/" element={<Validacion />} />
          <Route path="/Registrar" element={<Registrar />} />
          <Route path="/admin" element={<OtraVista />} />
          <Route path="/Usuario" element={<Vistausuario />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
