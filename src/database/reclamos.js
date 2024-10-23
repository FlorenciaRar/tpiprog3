import { conexion } from "./conexion.js";
import { enviarCorreo } from "../utils/enviarCorreo.js";

export default class Reclamos {
  buscarTodos = async ({ limite, desplazamiento }) => {
    let sql =
      "SELECT r.asunto, r.descripcion, r.fechaCreado, r.fechaFinalizado, r.fechaCancelado, re.descripcion AS 'reclamoEstado', rt.descripcion AS 'reclamoTipo' FROM reclamos AS r JOIN reclamos_estado AS re ON re.idReclamoEstado = r.idReclamoEstado JOIN reclamos_tipo AS rt ON r.idReclamoTipo = rt.idReclamoTipo ORDER BY r.idReclamo ASC";

    if (limite) {
      sql += " LIMIT ? OFFSET ?";
    }
    const [resultado] = await conexion.query(sql, [limite, desplazamiento]);
    return resultado;
  };

  buscarId = async (idReclamo) => {
    const sql =
      "SELECT r.asunto, r.descripcion, r.fechaCreado, r.fechaFinalizado, r.fechaCancelado,re.idReclamoEstado, re.descripcion AS 'reclamoEstado', rt.descripcion AS 'reclamoTipo', u.nombre AS 'usuarioCreador', u.correoElectronico FROM reclamos AS r JOIN reclamos_estado AS re ON re.idReclamoEstado = r.idReclamoEstado JOIN reclamos_tipo AS rt ON r.idReclamoTipo = rt.idReclamoTipo JOIN usuarios AS u ON r.idUsuarioCreador = u.idUsuario WHERE idReclamo = ?";
    const [resultado] = await conexion.query(sql, [idReclamo]);
    return resultado.length > 0 ? resultado[0] : null;
  };

  crear = async ({ asunto, descripcion, idReclamoTipo, idUsuarioCreador }) => {
    const sql =
      "INSERT INTO reclamos (asunto, descripcion, fechaCreado, fechaFinalizado, fechaCancelado, idReclamoEstado, idReclamoTipo, idUsuarioCreador, idUsuarioFinalizador) VALUES  (?, ?, NOW(), NULL, NULL, 1, ?, ?, NULL);";
    const [resultado] = await conexion.query(sql, [
      asunto,
      descripcion,
      idReclamoTipo,
      idUsuarioCreador,
    ]);

    if (resultado.affectedRows === 0) {
      return "Ocurrió un error creando el reclamo";
    }

    return this.buscarId(resultado.insertId);
  };

  modificar = async (idReclamo, datos) => {
    // Ver el tema del control sobre la modificacion
    // Esto debe ser autenticado y al where le falta "AND idUsuarioCreador = "
    const sql = "UPDATE reclamos SET ? WHERE idReclamo = ?;";
    const [resultado] = await conexion.query(sql, [datos, idReclamo]);

    if (resultado.affectedRows === 0) {
      return "Ocurrió un error modificando el reclamo";
    }

    return this.buscarId(idReclamo);
  };

  cancelar = async ({ idReclamo, idUsuario }) => {
    const sql =
      "UPDATE reclamos SET fechaCancelado = NOW(), idReclamoEstado = 3, idUsuarioFinalizador = ? WHERE idReclamo = ? AND idUsuarioCreador = ? AND idReclamoEstado =1;";
    const [resultado] = await conexion.query(sql, [
      idUsuario,
      idReclamo,
      idUsuario,
    ]);

    if (resultado.affectedRows === 0) {
      return "Ocurrió un error cancelando el reclamo, o el reclamo no tiene estado 'Creado'";
    }
    const reclamo = await this.buscarId(idReclamo);

    enviarCorreo(idReclamo, reclamo);

    return reclamo;
  };

  cambiarEstado = async ({ idReclamo, idUsuario, estado }) => {
    // le falta "AND idReclamoTipo = idReclamoTipo que atiende el empleado"
    const sql =
      "UPDATE reclamos SET idReclamoEstado = ?, fechaFinalizado = ?, idUsuarioFinalizador = ? WHERE idReclamo = ?";
    let fin = estado === 4 ? new Date().toISOString() : null;
    let usuario = estado === 4 ? idUsuario : null;
    const [resultado] = await conexion.query(sql, [
      estado,
      fin,
      usuario,
      idReclamo,
    ]);

    if (resultado.affectedRows === 0) {
      return "Ocurrió un error cambiando el estado del reclamo";
    }
    const buscarReclamo = await this.buscarId(idReclamo);

    enviarCorreo(idReclamo, buscarReclamo);

    return buscarReclamo;
  };

  buscarUsuario = async (idUsuario) => {
    const sql =
      "SELECT r.asunto, r.descripcion, r.fechaCreado, r.fechaFinalizado, r.fechaCancelado, re.descripcion AS 'reclamoEstado', rt.descripcion AS 'reclamoTipo', u.nombre AS 'usuarioCreador', u.correoElectronico FROM reclamos AS r JOIN reclamos_estado AS re ON re.idReclamoEstado = r.idReclamoEstado JOIN reclamos_tipo AS rt ON r.idReclamoTipo = rt.idReclamoTipo JOIN usuarios AS u ON r.idUsuarioCreador = u.idUsuario WHERE idUsuario = ?";
    const [resultado] = await conexion.query(sql, [idUsuario]);
    return resultado.length > 0 ? resultado : "Sin resultados";
  };

  buscarOficina = async (idUsuario) => {
    const sql =
      "SELECT r.idReclamo, r.asunto, r.descripcion, r.fechaCreado, r.fechaFinalizado, r.fechaCancelado, re.descripcion AS 'reclamoEstado', rt.descripcion AS 'reclamoTipo', o.nombre AS 'oficina' FROM reclamos AS r JOIN reclamos_estado AS re ON r.idReclamoEstado = re.idReclamoEstado JOIN reclamos_tipo AS rt ON r.idReclamoTipo = rt.idReclamoTipo JOIN oficinas AS o ON r.idReclamoTipo = o.idReclamoTipo JOIN usuarios_oficinas AS uo ON o.idOficina = uo.idOficina WHERE uo.idUsuario = ?;";
    const [resultado] = await conexion.query(sql, [idUsuario]);
    return resultado;
  };
}
