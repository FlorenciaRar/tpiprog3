import { conexion } from "./conexion.js";
import { enviarCorreo } from "../utils/enviarCorreo.js";

export default class Reclamos {
  buscarTodos = async () => {
    const sql = "SELECT r.asunto, r.descripcion, r.fechaCreado, r.fechaFinalizado, r.fechaCancelado, re.descripcion AS 'reclamoEstado', rt.descripcion AS 'reclamoTipo' FROM reclamos AS r JOIN reclamos_estado AS re ON re.idReclamoEstado = r.idReclamoEstado JOIN reclamos_tipo AS rt ON r.idReclamoTipo = rt.idReclamoTipo";
    const [resultado] = await conexion.query(sql);
    return resultado;
  };

  buscarId = async (idReclamo) => {
    const sql = "SELECT r.asunto, r.descripcion, r.fechaCreado, r.fechaFinalizado, r.fechaCancelado, re.descripcion AS 'reclamoEstado', rt.descripcion AS 'reclamoTipo', u.nombre AS 'usuarioCreador', u.correoElectronico FROM reclamos AS r JOIN reclamos_estado AS re ON re.idReclamoEstado = r.idReclamoEstado JOIN reclamos_tipo AS rt ON r.idReclamoTipo = rt.idReclamoTipo JOIN usuarios AS u ON r.idUsuarioCreador = u.idUsuario WHERE idReclamo = ?";
    const [resultado] = await conexion.query(sql, [idReclamo]);
    return resultado.length > 0 ? resultado[0] : null;
  };

  crear = async ({ asunto, descripcion, idReclamoTipo, idUsuarioCreador }) => {
    const sql = "INSERT INTO reclamos (asunto, descripcion, fechaCreado, fechaFinalizado, fechaCancelado, idReclamoEstado, idReclamoTipo, idUsuarioCreador, idUsuarioFinalizador) VALUES  (?, ?, NOW(), NULL, NULL, 1, ?, ?, NULL);";
    const [resultado] = await conexion.query(sql, [asunto, descripcion, idReclamoTipo, idUsuarioCreador]);

    if (resultado.affectedRows === 0) {
      return res.status(400).json({
        mensaje: "Ocurrió un error creando el reclamo",
      });
    }

    return this.buscarId(resultado.insertId);
  };

  modificar = async (idReclamo, {asunto, descripcion}) => {
    // Ver el tema del control sobre la modificacion
    // Esto debe ser autenticado y al where le falta "AND idUsuarioCreador = "
    const sql = "UPDATE reclamos SET asunto ?, descripcion = ? WHERE idReclamo = ?;";
    const [resultado] = await conexion.query(sql, [asunto, descripcion, idReclamo]);

    if (resultado.affectedRows === 0) {
      return res.status(400).json({
        mensaje: "Ocurrió un error modificando el reclamo",
      });
    }

    return this.buscarId(idReclamo);
  };

  cancelar = async (idReclamo) => {
    // Esto debe ser autenticado y le falta el SET usuarioFinalizador y al where le falta "AND idUsuarioCreador = "
    const sql = "UPDATE reclamos SET fechaCancelado = NOW(), idReclamoEstado = 3 WHERE idReclamo = ?;";
    const [resultado] = await conexion.query(sql, [idReclamo]);

    if (resultado.affectedRows === 0) {
      return res.status(400).json({
        mensaje: "Ocurrió un error cancelando el reclamo",
      });
    }
    const reclamo = await this.buscarId(idReclamo);

    enviarCorreo(idReclamo, reclamo);

    return reclamo;
  };

  cambiarEstado = async (idReclamo, estado) => {
    // Esto debe ser autenticado y le falta el SET usuarioFinalizador y al where le falta "AND idReclamoTipo = idReclamoTipo que atiende el empleado"
    const sql = "UPDATE reclamos SET fechaFinalizado = NOW(), idReclamoEstado = ? WHERE idReclamo = ?;";
    const [resultado] = await conexion.query(sql, [estado, idReclamo]);

    if (resultado.affectedRows === 0) {
      return res.status(400).json({
        mensaje: "Ocurrió un error cancelando el reclamo",
      });
    }
    const reclamo = await this.buscarId(idReclamo);
    
    enviarCorreo(idReclamo, reclamo);

    return reclamo;
  };

  buscarUsuario = async (idUsuario) => {
    const sql = "SELECT r.asunto, r.descripcion, r.fechaCreado, r.fechaFinalizado, r.fechaCancelado, re.descripcion AS 'reclamoEstado', rt.descripcion AS 'reclamoTipo', u.nombre AS 'usuarioCreador', u.correoElectronico FROM reclamos AS r JOIN reclamos_estado AS re ON re.idReclamoEstado = r.idReclamoEstado JOIN reclamos_tipo AS rt ON r.idReclamoTipo = rt.idReclamoTipo JOIN usuarios AS u ON r.idUsuarioCreador = u.idUsuario WHERE idUsuario = ?";
    const [resultado] = await conexion.query(sql, [idUsuario]);
    return resultado.length > 0 ? resultado : "Sin resultados";
  };

  buscarOficina = async (idUsuario) => {
    const sql = "SELECT r.asunto FROM reclamos as r WHERE r.idReclamoTipo = (SELECT idReclamoTipo FROM oficinas as o JOIN usuarios_oficinas AS uo ON o.idOficina = uo.idOficina WHERE uo.idUsuario = ?);";
    const [resultado] = await conexion.query(sql, [idUsuario]);
    return resultado;
  };
}
