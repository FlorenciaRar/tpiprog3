import { conexion } from "./conexion.js";
import { enviarCorreo } from "../utils/enviarCorreo.js";

export default class Reclamos {
  buscarTodos = async ({ limite, desplazamiento }) => {
    let sql =
      "SELECT r.idReclamo, r.asunto, r.descripcion, r.fechaCreado, r.fechaFinalizado, r.fechaCancelado, " +
      "re.descripcion AS 'reclamoEstado', rt.descripcion AS 'reclamoTipo' " +
      "FROM reclamos AS r " +
      "JOIN reclamos_estado AS re ON re.idReclamoEstado = r.idReclamoEstado " +
      "JOIN reclamos_tipo AS rt ON r.idReclamoTipo = rt.idReclamoTipo " +
      "ORDER BY r.idReclamo ASC";

    const params = [];
    if (limite && desplazamiento >= 0) {
      sql += " LIMIT ? OFFSET ?";
      params.push(limite, desplazamiento);
    }

    const [resultado] = await conexion.query(sql, params);
    return resultado;
  };

  buscarId = async (idReclamo) => {
    const sql =
      "SELECT r.idReclamo, r.asunto, r.descripcion, r.fechaCreado, r.fechaFinalizado, r.fechaCancelado,re.idReclamoEstado, re.descripcion AS 'reclamoEstado', rt.idReclamoTipo, rt.descripcion AS 'reclamoTipo', r.idUsuarioCreador, u.nombre AS 'usuarioCreador', u.correoElectronico FROM reclamos AS r JOIN reclamos_estado AS re ON re.idReclamoEstado = r.idReclamoEstado JOIN reclamos_tipo AS rt ON r.idReclamoTipo = rt.idReclamoTipo JOIN usuarios AS u ON r.idUsuarioCreador = u.idUsuario WHERE idReclamo = ?";
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
    const sql = "UPDATE reclamos SET ? WHERE idReclamo = ?;";
    const [resultado] = await conexion.query(sql, [datos, idReclamo]);

    if (resultado.affectedRows === 0) {
      return "Ocurrió un error modificando el reclamo";
    }
    return this.buscarId(idReclamo);
  };

  buscarReclamosUsuario = async (idUsuario) => {
    const sql =
      "SELECT r.idReclamo, r.asunto, r.descripcion, r.fechaCreado, r.fechaFinalizado, r.fechaCancelado, re.descripcion AS 'reclamoEstado', rt.descripcion AS 'reclamoTipo', u.nombre AS 'usuarioCreador', u.correoElectronico FROM reclamos AS r JOIN reclamos_estado AS re ON re.idReclamoEstado = r.idReclamoEstado JOIN reclamos_tipo AS rt ON r.idReclamoTipo = rt.idReclamoTipo JOIN usuarios AS u ON r.idUsuarioCreador = u.idUsuario WHERE idUsuario = ?";
    const [resultado] = await conexion.query(sql, [idUsuario]);
    return resultado.length > 0 ? resultado : "Sin resultados";
  };

  buscarReclamosOficina = async (idUsuario) => {
    const sql =
      "SELECT r.idReclamo, r.asunto, r.descripcion, r.fechaCreado, r.fechaFinalizado, r.fechaCancelado, re.descripcion AS 'reclamoEstado', rt.descripcion AS 'reclamoTipo', o.nombre AS 'oficina' FROM reclamos AS r JOIN reclamos_estado AS re ON r.idReclamoEstado = re.idReclamoEstado JOIN reclamos_tipo AS rt ON r.idReclamoTipo = rt.idReclamoTipo JOIN oficinas AS o ON r.idReclamoTipo = o.idReclamoTipo JOIN usuarios_oficinas AS uo ON o.idOficina = uo.idOficina WHERE uo.idUsuario = ?;";
    const [resultado] = await conexion.query(sql, [idUsuario]);
    return resultado;
  };

  buscarDatosReportePdf = async () => {
    const sql = "CALL `datosPDF`()";

    const [result] = await conexion.query(sql);

    const datosReporte = {
      reclamosTotales: result[0][0].reclamosTotales,
      reclamosNoFinalizados: result[0][0].reclamosNoFinalizados,
      reclamosFinalizados: result[0][0].reclamosFinalizados,
      descripcionTipoReclamoFrecuente:
        result[0][0].descripcionTipoRreclamoFrecuente, //modificado para que coincida con el nombre de la bd
      cantidadTipoReclamoFrecuente: result[0][0].cantidadTipoRreclamoFrecuente, //modificado para que coincida con el nombre de la bd
    };

    return datosReporte;
  };

  buscarDatosReporteCsv = async () => {
    const sql = `SELECT r.idReclamo AS 'reclamo', 
                  rt.descripcion AS 'tipo', 
                  re.descripcion AS 'estado', 
                  DATE_FORMAT(r.fechaCreado, '%Y-%m-%d %H:%i:%s') AS 'fechaCreado', 
                  CONCAT(u.nombre, ' ', u.apellido) AS 'cliente'
                  FROM reclamos AS r
                  INNER JOIN reclamos_tipo AS rt ON rt.idReclamoTipo = r.idReclamoTipo
                  INNER JOIN reclamos_estado AS re ON re.idReclamoEstado = r.idReclamoEstado
                  INNER JOIN usuarios AS u ON u.idUsuario = r.idUsuarioCreador
                  WHERE r.idReclamoEstado <> 4;`;

    const [result] = await conexion.query(sql);

    return result;
  };
}
