import Reclamos from "../database/reclamos.js";

export default class ReclamosService {
  constructor() {
    this.reclamos = new Reclamos();
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

  cancelar = (reclamo) => {
    return this.reclamos.cancelar(reclamo);
  };

  cambiarEstado = (reclamo) => {
    return this.reclamos.cambiarEstado(reclamo);
  };

  buscarUsuario = (idUsuario) => {
    return this.reclamos.buscarUsuario(idUsuario);
  };

  buscarOficina = (idUsuario) => {
    return this.reclamos.buscarOficina(idUsuario);
  };
}
