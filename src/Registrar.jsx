import React, { useState, useEffect } from "react";
import "./App.css";
import swal from "sweetalert";

export default function Registro() {
  const [formulario, setFormulario] = useState({ correo: "", clave: "" });
  const [formulariosGuardados, setFormulariosGuardados] = useState();

  useEffect(() => {
    const storedFormularios = localStorage.getItem("formularios");

    if (storedFormularios) {
      // Verificar si el valor almacenado no es undefined
      if (storedFormularios !== "undefined") {
        try {
          const parsedFormularios = JSON.parse(storedFormularios);
          setFormulariosGuardados(parsedFormularios);
        } catch (error) {
          console.error("Error al analizar JSON:", error);
        }
      } else {
        console.log("El valor almacenado es undefined");
      }
    }
  }, []);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormulario(prevFormulario => ({
      ...prevFormulario,
      [name]: value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    // Validar campos vacíos
    if (formulario.correo === "" || formulario.clave === "") {
      swal(
        "Por favor, complete todos los campos",
        "You clicked the button!",
        "error"
      );
      return;
    }

    // Validar correo existente
    const correoExistente = formulariosGuardados?.find(
      form => form.correo === formulario.correo
    );
    if (correoExistente) {
      swal(
        "El correo ya está registrado. Intente con otro.",
        "You clicked the button!",
        "error"
      );
      return;
    }

    setFormulariosGuardados(prevFormularios => [
      ...(prevFormularios || []),
      formulario,
    ]);
    setFormulario({ correo: "", clave: "" });
  };

  useEffect(() => {
    localStorage.setItem("formularios", JSON.stringify(formulariosGuardados));
  }, [formulariosGuardados]);

  return (
    <div className="formulario">
      <h1>Registrar</h1>
      <form className="Cart_formulario" onSubmit={handleSubmit}>
        <input
          type="email"
          className="input_valor"
          name="correo"
          placeholder="Correo"
          value={formulario.correo}
          onChange={handleInputChange}
        />
        <input
          type="password"
          className="input_valor"
          name="clave"
          placeholder="Contraseña"
          value={formulario.clave}
          onChange={handleInputChange}
        />
        <button className="BT_enviar" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}
