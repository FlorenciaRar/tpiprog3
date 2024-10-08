import { conexion } from "./conexion.js";

export default class Oficinas {
  buscarTodos = async ({ limite, desplazamiento }) => {
    let sql =
      "SELECT o.idOficina, o.nombre, rt.descripcion FROM oficinas as o JOIN reclamos_tipo as rt ON o.idReclamoTipo = rt.idReclamoTipo WHERE o.activo = 1 ORDER BY o.nombre ASC";

    if (limite) {
      sql += " LIMIT ? OFFSET ?";
    }
    const [resultado] = await conexion.query(sql, [limite, desplazamiento]);
    return resultado;
  };

  buscarId = async (idOficina) => {
    const sql =
      "SELECT o.idOficina, o.nombre, rt.descripcion FROM oficinas as o JOIN reclamos_tipo as rt ON o.idReclamoTipo = rt.idReclamoTipo WHERE o.idOficina = ? AND o.activo = 1";
    const [resultado] = await conexion.query(sql, [idOficina]);
    return resultado.length > 0 ? resultado[0] : null;
  };

  crear = async ({ nombre, idReclamoTipo }) => {
    const sql = "INSERT INTO oficinas (nombre, idReclamoTipo, activo) VALUES  (?, ?, 1);";
    const [resultado] = await conexion.query(sql, [nombre, idReclamoTipo]);

    if (resultado.affectedRows === 0) {
      return res.status(400).json({
        mensaje: "Ocurrió un error creando la oficina",
      });
    }

    return this.buscarId(resultado.insertId);
  };

  modificar = async (idOficina, { nombre, idReclamoTipo, activo }) => {
    const sql = "UPDATE oficinas SET nombre= ?, idReclamoTipo = ?, activo= ? WHERE idOficina = ?";
    const [resultado] = await conexion.query(sql, [nombre, idReclamoTipo, activo, idOficina]);

    if (resultado.affectedRows === 0) {
      return res.status(400).json({
        mensaje: "Ocurrió un error modificando la oficina",
      });
    }

    return this.buscarId(idOficina);
  };

  buscarEmpleados = async (idOficina) => {
    const sql =
      "SELECT u.nombre, u.apellido, o.nombre AS 'oficina' FROM usuarios_oficinas AS uo JOIN oficinas AS o ON uo.idOficina = o.idOficina JOIN usuarios AS u ON uo.idUsuario = u.idUsuario WHERE uo.idOficina = ? AND uo.activo = 1";
    const [resultado] = await conexion.query(sql, [idOficina]);
    return resultado;
  };
}
