import { conexion } from "./conexion.js";

export default class Empleados {
  buscarTodos = async () => {
    const sql = "SELECT nombre, apellido, correoElectronico FROM usuarios WHERE idUsuarioTipo = 2 AND activo = 1;";
    const [resultado] = await conexion.query(sql);
    return resultado;
  };

  buscarId = async (idUsuario) => {
    const sql = "SELECT nombre, apellido, correoElectronico, idUsuarioTipo FROM usuarios WHERE idUsuario = ? AND idUsuarioTipo = 2 AND activo = 1;";
    const [resultado] = await conexion.query(sql, [idUsuario]);
    return resultado.length > 0 ? resultado[0] : null;
  };
}
