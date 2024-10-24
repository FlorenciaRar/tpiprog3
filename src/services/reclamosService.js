import Reclamos from "../database/reclamos.js";
import { enviarCorreo } from "../utils/enviarCorreo.js";
import UsuariosService from "./usuariosService.js";

export default class ReclamosService {
  constructor() {
    this.reclamos = new Reclamos();
    this.usuariosService = new UsuariosService();
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

  modificar = (idReclamo, reclamo) => {
    return this.reclamos.modificar(idReclamo, reclamo);
  };

  cancelar = async ({ idReclamo, idUsuario }) => {
    const existeReclamo = await this.reclamos.buscarId(idReclamo);
    if (existeReclamo === null || existeReclamo.idReclamoEstado !== 1) {
      return { estado: false, mensaje: "El reclamo no existe o no se puede cancelar" };
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
    //chequear la ofi
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

  buscarUsuario = (idUsuario) => {
    return this.reclamos.buscarUsuario(idUsuario);
  };

  buscarOficina = (idUsuario) => {
    return this.reclamos.buscarOficina(idUsuario);
  };
}
