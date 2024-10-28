import { conexion } from "./conexion.js";

export default class ReclamosTipo {
  buscarTodos = async () => {
    const sql = "SELECT idReclamoTipo, descripcion FROM reclamos_tipo WHERE activo = 1";
    const [resultado] = await conexion.query(sql);
    return resultado;
  };

  buscarId = async (idReclamoTipo) => {
    const sql = "SELECT idReclamoTipo, descripcion FROM reclamos_tipo WHERE idReclamoTipo = ? AND activo = 1";
    const [resultado] = await conexion.query(sql, [idReclamoTipo]);
    return resultado.length > 0 ? resultado[0] : null;
  };

  crear = async ({ descripcion }) => {
    const sql = "INSERT INTO reclamos_tipo (descripcion, activo) VALUES (?, 1);";
    const [resultado] = await conexion.query(sql, [descripcion]);

    if (resultado.affectedRows === 0) {
      return "Ocurrió un error creando el tipo de reclamo";
    }

    return this.buscarId(resultado.insertId);
  };

  modificar = async (idReclamoTipo, datos) => {
    const sql = "UPDATE reclamos_tipo SET ? WHERE idReclamoTipo = ? AND activo = 1";
    const [resultado] = await conexion.query(sql, [datos, idReclamoTipo]);

    if (resultado.affectedRows === 0) {
      return "Ocurrió un error modificando el tipo de reclamo";
    }

    return this.buscarId(idReclamoTipo);
  };
}
