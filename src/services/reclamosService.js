import Reclamos from "../database/reclamos.js";
import { enviarCorreo } from "../utils/enviarCorreo.js";
import EmpleadosService from "./empleadosService.js";
import UsuariosService from "./usuariosService.js";

export default class ReclamosService {
  constructor() {
    this.reclamos = new Reclamos();
    this.usuariosService = new UsuariosService();
    this.empleadosService = new EmpleadosService();
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
      return { estado: false, mensaje: "El reclamo no se peude cancelar" };
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
      return { estado: false, mensaje: "No se encontraron los datos del usuario" };
    }

    return this.reclamos.buscarId(idReclamo), enviarCorreo(modificarReclamo);
  };

  cambiarEstado = async ({ idReclamo, idUsuario, estado }) => {
    const existeReclamo = await this.reclamos.buscarId(idReclamo);
    if (existeReclamo === null || existeReclamo.idReclamoEstado === 3 || existeReclamo.idReclamoEstado === 4) {
      return { estado: false, mensaje: "El reclamo no existe o no se puede cambiar su estado" };
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

    const usuario = await this.usuariosService.buscarId(modificarReclamo.idUsuarioCreador);
    if (!usuario) {
      return { estado: false, mensaje: "No se encontraron los datos del usuario" };
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
}
