import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Validacion from "./Validacion";
import OtraVista from "./OtraVista";
import Registrar from "./Registrar";
import Headernav from "./Components/Headernav";
import "./App.css";
function App() {
  return (
    <Router>
      <Headernav />
      <div className="App">
        <Routes>
          <Route path="/Login" element={<Validacion />} />
          <Route path="/Registrar" element={<Registrar />} />
          <Route path="/otra-vista" element={<OtraVista />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
