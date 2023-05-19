import React, { useState } from "react";
import "./css/Vistas.css";
import Bot from "./Bot";

function Vistausuario() {
  const [backgroundColor, setBackgroundColor] = useState("");

  const handleBackgroundColorChange = color => {
    setBackgroundColor(color);
  };
  return (
    <div className="Box_VistaUsuario" style={{ backgroundColor }}>
      <Bot onColorChange={handleBackgroundColorChange} />
    </div>
  );
}

export default Vistausuario;
