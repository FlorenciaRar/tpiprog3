import { conexion } from "./conexion.js";

export default class ReclamosEstado {
  buscarTodos = async () => {
    const sql = "SELECT idReclamoEstado, descripcion FROM reclamos_estado WHERE activo = 1";
    const [resultado] = await conexion.query(sql);
    return resultado;
  };

  buscarId = async (idReclamoTipo) => {
    const sql = "SELECT idReclamoEstado, descripcion FROM reclamos_estado WHERE idReclamoEstado = ? AND activo = 1";
    const [resultado] = await conexion.query(sql, [idReclamoTipo]);
    return resultado.length > 0 ? resultado[0] : null;
  };

  crear = async ({ descripcion }) => {
    const sql = "INSERT INTO reclamos_estado (descripcion, activo) VALUES (?, 1);";
    const [resultado] = await conexion.query(sql, [descripcion]);

    if (resultado.affectedRows === 0) {
      return "Ocurrió un error creando el estado del reclamo";
    }

    return this.buscarId(resultado.insertId);
  };

  modificar = async (idReclamoEstado, datos) => {
    const sql = "UPDATE reclamos_estado SET ? WHERE idReclamoEstado = ? AND activo = 1";
    const [resultado] = await conexion.query(sql, [datos, idReclamoEstado]);

    if (resultado.affectedRows === 0) {
      return "Ocurrió un error modificando el estado del reclamo";
    }

    return this.buscarId(idReclamoEstado);
  };
}
