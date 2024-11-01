import { conexion } from "./conexion.js";

export default class Empleados {
  buscarTodos = async () => {
    const sql = "SELECT idUsuario, nombre, apellido, correoElectronico FROM usuarios WHERE idUsuarioTipo = 2 AND activo = 1;";
    const [resultado] = await conexion.query(sql);
    return resultado;
  };

  buscarId = async (idUsuario) => {
    const sql =
      "SELECT idUsuario, nombre, apellido, correoElectronico, idUsuarioTipo FROM usuarios WHERE idUsuario = ? AND idUsuarioTipo = 2 AND activo = 1;";
    const [resultado] = await conexion.query(sql, [idUsuario]);
    return resultado.length > 0 ? resultado[0] : null;
  };

  buscarEnOficina = async ( idUsuario, idOficina ) => {
    const sql =
      "SELECT u.idUsuario, u.nombre, u.apellido, u.correoElectronico, u.idUsuarioTipo, o.idOficina, o.nombre AS 'oficina' FROM usuarios AS u JOIN usuarios_oficinas AS uo ON u.idUsuario = uo.idUsuario JOIN oficinas AS o ON uo.idOficina = o.idOficina WHERE uo.idUsuario = ? AND uo.idOficina = ? AND uo.activo = 1;";
    const [resultado] = await conexion.query(sql, [idUsuario, idOficina]);
    return resultado.length > 0 ? resultado[0] : null;
  };

  crear = async ({ nombre, apellido, correoElectronico, contrasenia, imagen }) => {
    const sql =
      "INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen, activo) VALUES  (?, ?, ?, SHA2(?, 256), 2, ?, 1);";
    const [resultado] = await conexion.query(sql, [nombre, apellido, correoElectronico, contrasenia, imagen]);
    if (resultado.affectedRows === 0) {
      return "Ocurrió un error creando el empleado";
    }
    return this.buscarId(resultado.insertId);
  };

  modificar = async ({ idUsuario, datos }) => {
    const sql = "UPDATE usuarios SET ? WHERE idUsuario = ? AND activo = 1";
    const [resultado] = await conexion.query(sql, [datos, idUsuario]);
    if (resultado.affectedRows === 0) {
      return "Ocurrió un error modificando el empleado";
    }
    return this.buscarId(idUsuario);
  };
}
