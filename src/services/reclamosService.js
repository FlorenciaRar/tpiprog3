import Reclamos from "../database/reclamos.js";
import { enviarCorreo } from "../utils/enviarCorreo.js";
import EmpleadosService from "./empleadosService.js";
import UsuariosService from "./usuariosService.js";
import InformeService from "./informeService.js";
import OficinasService from "./oficinasService.js";

export default class ReclamosService {
  constructor() {
    this.reclamos = new Reclamos();
    this.usuariosService = new UsuariosService();
    this.empleadosService = new EmpleadosService();
    this.oficinasService = new OficinasService();
    this.informes = new InformeService();
  }

  buscarTodos = (reclamoQuerys) => {
    return this.reclamos.buscarTodos(reclamoQuerys);
  };

  buscarId = (reclamo) => {
    return this.reclamos.buscarId(reclamo);
  };

  crear = (reclamo) => {
    return this.reclamos.crear(reclamo);
  };

  modificar = async (idReclamo, reclamo) => {
    const existeReclamo = await this.reclamos.buscarId(idReclamo);
    if (existeReclamo === null) {
      return { estado: false, mensaje: "El reclamo no existe" };
    }
    return this.reclamos.modificar(idReclamo, reclamo);
  };

  cancelar = async ({ idReclamo, idUsuario }) => {
    const existeReclamo = await this.reclamos.buscarId(idReclamo);

    if (existeReclamo === null) {
      return { estado: false, mensaje: "El reclamo no existe" };
    }

    if (existeReclamo.idUsuarioCreador !== idUsuario) {
      return { estado: false, mensaje: "El reclamo no es propio" };
    }

    if (existeReclamo.idReclamoEstado !== 1) {
      return { estado: false, mensaje: "El reclamo no se puede cancelar" };
    }

    let datos = {
      fechaCancelado: new Date(),
      idReclamoEstado: 3,
      idUsuarioFinalizador: idUsuario,
    };

    const modificarReclamo = await this.reclamos.modificar(idReclamo, datos);
    if (!modificarReclamo) {
      return { estado: false, mensaje: "El reclamo no se pudo modificar" };
    }

    const usuario = await this.usuariosService.buscarId(idUsuario);
    if (!usuario) {
      return {
        estado: false,
        mensaje: "No se encontraron los datos del usuario",
      };
    }

    return this.reclamos.buscarId(idReclamo), enviarCorreo(modificarReclamo);
  };

  cambiarEstado = async ({ idReclamo, idUsuario, estado }) => {
    const reclamo = await this.reclamos.buscarId(idReclamo);
    if (
      reclamo === null ||
      reclamo.idReclamoEstado === 3 ||
      reclamo.idReclamoEstado === 4
    ) {
      return {
        estado: false,
        mensaje: "El reclamo no existe o no se puede cambiar su estado",
      };
    }

    const oficina = await this.oficinasService.buscarOficinaPorReclamoTipo(
      reclamo.idReclamoTipo
    );

    const empleado = await this.empleadosService.buscarEnOficina(
      idUsuario,
      oficina.idOficina
    );

    if (!empleado) {
      return {
        estado: false,
        mensaje: "El empleado no puede modificar este reclamo",
      };
    }

    let datos = {
      fechaCancelado: estado !== 4 ? null : new Date(),
      idReclamoEstado: estado,
      idUsuarioFinalizador: estado !== 4 ? null : idUsuario,
    };

    const modificarReclamo = await this.reclamos.modificar(idReclamo, datos);
    if (!modificarReclamo) {
      return { estado: false, mensaje: "El reclamo no se pudo modificar" };
    }

    const usuario = await this.usuariosService.buscarId(
      modificarReclamo.idUsuarioCreador
    );
    if (!usuario) {
      return {
        estado: false,
        mensaje: "No se encontraron los datos del usuario",
      };
    }

    return this.reclamos.buscarId(idReclamo), enviarCorreo(modificarReclamo);
  };

  buscarReclamosUsuario = async (idUsuario) => {
    const existeUsuario = await this.usuariosService.buscarId(idUsuario);
    if (existeUsuario === null) {
      return { estado: false, mensaje: "El usuario no existe" };
    }
    return this.reclamos.buscarReclamosUsuario(idUsuario);
  };

  buscarReclamosOficina = async (idUsuario) => {
    const existeUsuario = await this.empleadosService.buscarId(idUsuario);
    if (existeUsuario === null) {
      return { estado: false, mensaje: "El usuario no existe" };
    }
    return this.reclamos.buscarReclamosOficina(idUsuario);
  };

  generarInforme = async (formato) => {
    if (formato === "pdf") {
      return await this.reportePdf();
    } else if (formato === "csv") {
      return await this.reporteCsv();
    }
  };

  reportePdf = async (formato) => {
    const datosReporte = await this.reclamos.buscarDatosReportePdf();

    if (!datosReporte || datosReporte.length === 0) {
      return { estado: false, mensaje: "Sin datos para el reporte" };
    }

    const pdf = await this.informes.informeReclamoPdf(datosReporte);

    return {
      //datos binarios del archivo pdf
      buffer: pdf,
      //cabecera de respuesta al cliente
      headers: {
        "Content-Type": "application/pdf",

        //inline significa que el cliente va a intentar abrir el pdf
        "Content-Disposition": 'inline; filename="reporte.pdf"',
      },
    };
  };

  reporteCsv = async () => {
    const datosReporte = await this.reclamos.buscarDatosReporteCsv();

    if (!datosReporte || datosReporte.length === 0) {
      return { estado: false, mensaje: "Sin datos para el reporte" };
    }

    const csv = await this.informes.informeReclamoCsv(datosReporte);

    return {
      path: csv,
      headers: {
        "Content-Type": "text/csv",
        //En este caso se va a descargar el archivo, no abrirse
        "Content-Disposition": 'attachment; filename="reporte.csv"',
      },
    };
  };
}
