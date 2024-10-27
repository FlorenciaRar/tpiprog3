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

  buscarEnOficina = async ({ idUsuario, idOficina }) => {
    const sql =
      "SELECT u.idUsuario, u.nombre, u.apellido, u.correoElectronico, u.idUsuarioTipo FROM usuarios AS u JOIN usuarios_oficinas AS uo ON u.idUsuario = uo.idUsuario JOIN oficinas AS o ON uo.idOficina = o.idOficina WHERE u.idUsuario = ? AND uo.idOficina = ? AND uo.activo = 1;";
    const [resultado] = await conexion.query(sql, [idUsuario, idOficina]);
    return resultado.length > 0 ? resultado[0] : null;
  };
}
