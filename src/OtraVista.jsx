import React, { useState, useEffect } from "react";
import { TbEdit } from 'react-icons/tb';
import { AiFillDelete } from 'react-icons/ai';
import { BiSave } from 'react-icons/bi';
import { GiCancel } from 'react-icons/gi';
import swal from "sweetalert";

export default function OtraVista() {
  const [usuarios, setUsuarios] = useState([]);
  const [edicionUsuario, setEdicionUsuario] = useState(null);
  const [edicionCorreo, setEdicionCorreo] = useState("");
  const [edicionClave, setEdicionClave] = useState("");
  const [edicionRol, setEdicionRol] = useState("");

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
    setEdicionRol(usuario.rol);
  };

  const handleCancelarEdicion = () => {
    setEdicionUsuario(null);
    setEdicionCorreo("");
    setEdicionClave("");
    setEdicionRol("");
  };

  const handleGuardarEdicion = () => {
    if (
      edicionCorreo.trim() === "" ||
      edicionClave.trim() === "" ||
      edicionRol.trim() === ""
    ) {
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
        ? {
            ...usuario,
            correo: edicionCorreo,
            clave: edicionClave,
            rol: edicionRol,
          }
        : usuario
    );

    setUsuarios(nuevosUsuarios);
    localStorage.setItem("formularios", JSON.stringify(nuevosUsuarios));
    handleCancelarEdicion();
  };

  return (
    <div className="Vista_De_usuario">
      <h5 className="VistaTitutlo">Controlador Super Admin</h5>
      <table className="tabla-usuarios">
        <thead>
          <tr>
            <th>Correo</th>
            <th>Clave</th>
            <th>Rol</th>
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
                    <select
                      onChange={e => setEdicionRol(e.target.value)}
                      className="input_valor"
                    >
                      <option selected="true" disabled="disabled">
                        Selecciona un rol
                      </option>
                      <option value="admin">Admin</option>
                      <option value="usuario">Usuario</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn-editar"
                      onClick={handleGuardarEdicion}
                    >
                      {<BiSave/>}
                    </button>
                    <button
                      className="btn-eliminar"
                      onClick={handleCancelarEdicion}
                    >
                      {<GiCancel/>}
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{usuario.correo}</td>
                  <td>{usuario.clave}</td>
                  <td>{usuario.rol}</td>
                  <td>
                    <button
                      className="btn-editar"
                      onClick={() => handleEditarUsuario(usuario)}
                    >
                      {<TbEdit/>}
                    </button>
                    <button
                      className="btn-eliminar"
                      onClick={() => handleEliminarUsuario(usuario)}
                    >
                      {<AiFillDelete/>}
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
