import React, { useState, useEffect } from "react";
import swal from "sweetalert";

export default function OtraVista() {
  const [usuarios, setUsuarios] = useState([]);
  const [edicionUsuario, setEdicionUsuario] = useState(null);
  const [edicionCorreo, setEdicionCorreo] = useState("");
  const [edicionClave, setEdicionClave] = useState("");

  useEffect(() => {
    const storedFormularios = localStorage.getItem("formularios");

    if (storedFormularios) {
      try {
        const parsedFormularios = JSON.parse(storedFormularios);
        setUsuarios(parsedFormularios);
      } catch (error) {
        console.error("Error al analizar JSON:", error);
      }
    }
  }, []);

  const handleEliminarUsuario = usuario => {
    const nuevosUsuarios = usuarios.filter(u => u.correo !== usuario.correo);
    setUsuarios(nuevosUsuarios);
    localStorage.setItem("formularios", JSON.stringify(nuevosUsuarios));
  };

  const handleEditarUsuario = usuario => {
    setEdicionUsuario(usuario);
    setEdicionCorreo(usuario.correo);
    setEdicionClave(usuario.clave);
  };

  const handleCancelarEdicion = () => {
    setEdicionUsuario(null);
    setEdicionCorreo("");
    setEdicionClave("");
  };

  const handleGuardarEdicion = () => {
    if (edicionCorreo.trim() === "" || edicionClave.trim() === "") {
      swal("Por favor, complete todos los campos", "error");
      return;
    }

    const correoExistente = usuarios.find(
      usuario => usuario.correo === edicionCorreo && usuario !== edicionUsuario
    );

    if (correoExistente) {
      swal("El correo ya está registrado. Intente con otro.", "error");
      return;
    }

    const nuevosUsuarios = usuarios.map(usuario =>
      usuario === edicionUsuario
        ? { ...usuario, correo: edicionCorreo, clave: edicionClave }
        : usuario
    );

    setUsuarios(nuevosUsuarios);
    localStorage.setItem("formularios", JSON.stringify(nuevosUsuarios));
    handleCancelarEdicion();
  };

  return (
    <div className="Vista_De_usuario">
      <h1>Usuarios de jasil</h1>
      <table className="tabla-usuarios">
        <thead>
          <tr>
            <th>Correo</th>
            <th>Clave</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.correo}>
              {edicionUsuario === usuario ? (
                <>
                  <td>
                    <input
                      className="input_valor"
                      type="email"
                      value={edicionCorreo}
                      onChange={e => setEdicionCorreo(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      className="input_valor"
                      type="password"
                      value={edicionClave}
                      onChange={e => setEdicionClave(e.target.value)}
                    />
                  </td>
                  <td>
                    <button
                      className="BT_Edicione"
                      onClick={handleGuardarEdicion}
                    >
                      Guardar
                    </button>
                    <button
                      className="BT_Edicione"
                      onClick={handleCancelarEdicion}
                    >
                      Cancelar
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{usuario.correo}</td>
                  <td>{usuario.clave}</td>
                  <td>
                    <button
                      className="btn-editar"
                      onClick={() => handleEditarUsuario(usuario)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-eliminar"
                      onClick={() => handleEliminarUsuario(usuario)}
                    >
                      Eliminar
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
