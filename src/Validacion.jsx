import React, { useState, useEffect } from "react";
import "./App.css";
import swal from "sweetalert";
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { FiTwitter } from "react-icons/fi";
export default function Validacion() {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [formulariosGuardados, setFormulariosGuardados] = useState([]);

  useEffect(() => {
    const storedFormularios = localStorage.getItem("formularios");

    if (storedFormularios) {
      try {
        const parsedFormularios = JSON.parse(storedFormularios);
        setFormulariosGuardados(parsedFormularios);
      } catch (error) {
        console.error("Error parsing stored formularios:", error);
      }
    }
  }, []);

  const handleCorreoChange = e => {
    setCorreo(e.target.value);
  };

  const handleClaveChange = e => {
    setClave(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Verificar si el inicio de sesión es exitoso y el rol es válido
    const usuarioValido = formulariosGuardados.some(
      formulario =>
        formulario.correo === correo &&
        formulario.clave === clave &&
        formulario.rol === "admin"
    );

    const usuarioValido2 = formulariosGuardados.some(
      formulario =>
        formulario.correo === correo &&
        formulario.clave === clave &&
        formulario.rol !== "admin"
    );

    if (usuarioValido) {
      // Inicio de sesión exitoso
      swal("Inicio de sesión exitoso", "You clicked the button!", "success");
      // Redireccionar a otra vista o realizar alguna acción
      window.location.href = "/admin";
    }
    if (usuarioValido2) {
      window.location.href = "/usuario";
    } else {
      swal("Inicio de sesión fallido", "You clicked the button!", "error");
    }
    setCorreo("");
    setClave("");
  };

  return (
    <div className="formulario2">
      <h1 className="TituloFormulario">Iniciar</h1>
      <form className="Cart_formulario" onSubmit={handleSubmit}>
        <input
          className="input_valor"
          type="email"
          value={correo}
          onChange={handleCorreoChange}
          placeholder="Correo"
        />
        <input
          className="input_valor"
          type="password"
          value={clave}
          onChange={handleClaveChange}
          placeholder="Clave"
        />
        <button className="BT_enviar" type="submit">
          Iniciar
        </button>
      </form>
      <div className="FooterFormulario">
            <BsFacebook className="LinkRedSocilia" />
            <FiTwitter className="LinkRedSocilia" />

            <BsInstagram className="LinkRedSocilia" />
        </div>
    </div>
  );
}
