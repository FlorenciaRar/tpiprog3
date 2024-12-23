import { conexion } from "./conexion.js";

export default class Usuarios {
  buscarTodos = async () => {
    const sql = "SELECT idUsuario,nombre, apellido, correoElectronico FROM usuarios WHERE activo = 1;";
    const [resultado] = await conexion.query(sql);
    return resultado;
  };

  buscarId = async (idUsuario) => {
    const sql = "SELECT idUsuario, nombre, apellido, correoElectronico, idUsuarioTipo FROM usuarios WHERE idUsuario = ? AND activo = 1;";
    const [resultado] = await conexion.query(sql, [idUsuario]);
    return resultado.length > 0 ? resultado[0] : null;
  };

  crear = async ({ nombre, apellido, correoElectronico, contrasenia, imagen }) => {
    const sql =
      "INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen, activo) VALUES  (?, ?, ?, SHA2(?, 256), 3, ?, 1);";
    const [resultado] = await conexion.query(sql, [nombre, apellido, correoElectronico, contrasenia, imagen]);

    if (resultado.affectedRows === 0) {
      return "Ocurrió un error creando el usuario";
    }

    return this.buscarId(resultado.insertId);
  };

  modificar = async ({ idUsuario, datos }) => {
    const sql = "UPDATE usuarios SET ? WHERE idUsuario = ? AND activo = 1";
    const [resultado] = await conexion.query(sql, [datos, idUsuario]);

    if (resultado.affectedRows === 0) {
      return "Ocurrió un error modificando el usuario";
    }
    return this.buscarId(idUsuario);
  };

  modificarContrasenia = async ({ datos, idUsuario }) => {
    const sql = "UPDATE usuarios SET contrasenia = SHA2(?, 256) WHERE idUsuario = ? AND activo = 1";
    const [resultado] = await conexion.query(sql, [datos, idUsuario]);

    if (resultado.affectedRows === 0) {
      return "Ocurrió un error modificando el usuario";
    }
    return this.buscarId(idUsuario);
  };

  buscarLogin = async ({ correo, contrasenia }) => {
    const sql =
      "SELECT idUsuario, nombre, apellido, correoElectronico, idUsuarioTipo, imagen FROM usuarios WHERE correoElectronico = ? AND contrasenia = SHA2(?, 256) AND activo = 1;";
    const [resultado] = await conexion.query(sql, [correo, contrasenia]);
    return resultado.length > 0 ? resultado[0] : null;
  };

  buscarImagen = async (idUsuario) => {
    const sql = "SELECT idUsuario, imagen FROM usuarios WHERE idUsuario = ? AND activo = 1;";
    const [resultado] = await conexion.query(sql, [idUsuario]);
    return resultado.length > 0 ? resultado[0] : null;
  };

  buscarUsuarioPorMail = async (correo) => {
    const sql = "SELECT idUsuario, nombre, apellido, correoElectronico, idUsuarioTipo FROM usuarios WHERE correoElectronico = ? AND activo = 1;";
    const [resultado] = await conexion.query(sql, [correo]);
    return resultado.length > 0 ? resultado[0] : null;
  };
}
