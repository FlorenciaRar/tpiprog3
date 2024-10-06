import Reclamos from "../database/reclamos.js";

export default class ReclamosService {
  constructor() {
    this.reclamos = new Reclamos();
  }

  buscarTodos = (querys) => {
    return this.reclamos.buscarTodos(querys);
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

  cancelar = (idReclamo) => {
    return this.reclamos.cancelar(idReclamo);
  };

  cambiarEstado = (idReclamo, estado) => {
    return this.reclamos.cambiarEstado(idReclamo, estado);
  };

  buscarUsuario = (idUsuario) => {
    return this.reclamos.buscarUsuario(idUsuario);
  };

  buscarOficina = (idUsuario) => {
    return this.reclamos.buscarOficina(idUsuario);
    
  };
}
