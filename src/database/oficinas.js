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
      return "Ocurrió un error creando la oficina";
    }

    return this.buscarId(resultado.insertId);
  };

  modificar = async (idOficina, datos) => {
    const sql = "UPDATE oficinas SET ? WHERE idOficina = ? AND activo = 1";
    const [resultado] = await conexion.query(sql, [datos, idOficina]);

    if (resultado.affectedRows === 0) {
      return "Ocurrió un error modificando la oficina";
    }

    return this.buscarId(idOficina);
  };

  buscarEmpleados = async (idOficina) => {
    const sql =
      "SELECT u.idUsuario, u.nombre, u.apellido, o.nombre AS 'oficina' FROM usuarios_oficinas AS uo JOIN oficinas AS o ON uo.idOficina = o.idOficina JOIN usuarios AS u ON uo.idUsuario = u.idUsuario WHERE uo.idOficina = ? AND uo.activo = 1  AND u.activo = 1";
    const [resultado] = await conexion.query(sql, [idOficina]);
    return resultado;
  };

  agregarEmpleados = async ({ idOficina, empleadosExistentes }) => {
    let empleadosAgregados = [];
    try {
      await conexion.beginTransaction();

      for (const empleado of empleadosExistentes) {
        const sql = `INSERT INTO usuarios_oficinas (idUsuario, idOficina, activo) VALUES (?,?, 1);`;
        const resultado = conexion.query(sql, [empleado.idUsuario, idOficina]);
        empleadosAgregados.push(empleado);
      }
      await conexion.commit();
      return { estado: true, mensaje: `${empleadosAgregados.length} empleados agregados` };
    } catch (error) {
      await conexion.rollback();
      return { estado: false, mensaje: "Ocurrió un error agregando empleados a la oficina" };
    }
  };

  quitarEmpleados = async ({ idOficina, empleadosExistentes }) => {
    let empleadosQuitados = 0;
    try {
      await conexion.beginTransaction();

      for (const empleado of empleadosExistentes) {
        const sql = `UPDATE usuarios_oficinas SET activo = 0 WHERE idUsuario = ? AND idOficina = ?;`;
        const resultado = conexion.query(sql, [empleado.idUsuario, idOficina]);
        empleadosQuitados += 1;
      }
      await conexion.commit();
      return { estado: true, mensaje: `${empleadosQuitados} empleados quitados con exito!` };
    } catch (error) {
      await conexion.rollback();
      console.log(error);
      return { estado: false, mensaje: "Ocurrió un error quitando empleados a la oficina" };
    }
  };
}
