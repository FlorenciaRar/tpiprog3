import ReclamosEstado from "../database/reclamosEstado.js";

export default class ReclamosEstadoService {
  constructor() {
    this.reclamosEstado = new ReclamosEstado();
  }

  buscarTodos = () => {
    return this.reclamosEstado.buscarTodos();
  };

  buscarId = (reclamoEstado) => {
    return this.reclamosEstado.buscarId(reclamoEstado);
  };

  crear = (reclamoEstado) => {
    return this.reclamosEstado.crear(reclamoEstado);
  };

  modificar = async (idReclamoEstado, reclamoEstado) => {
    const extisteReclamoEstado = await this.oficinas.buscarId(idReclamoEstado);
    if (!extisteReclamoEstado) {
      return { estado: false, mensaje: "No existe el reclamo estado" };
    }
    return this.reclamosEstado.modificar(idReclamoEstado, reclamoEstado);
  };
}
