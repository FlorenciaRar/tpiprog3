import ReclamosTipo from "../database/reclamosTipo.js";

export default class ReclamosTipoService {
  constructor() {
    this.reclamosTipo = new ReclamosTipo();
  }

  buscarTodos = () => {
    return this.reclamosTipo.buscarTodos();
  };

  buscarId = (reclamoTipo) => {
    return this.reclamosTipo.buscarId(reclamoTipo);
  };

  crear = (reclamoTipo) => {
    return this.reclamosTipo.crear(reclamoTipo);
  };

  modificar = async (idReclamoTipo, reclamoTipo) => {
    const existeReclamoTipo = await this.reclamosTipo.buscarId(idReclamoTipo);
    if (existeReclamoTipo === null) {
      return { estado: false, mensaje: "El reclamo tipo no existe" };
    }

    const modificacionReclamoTipo = await this.reclamosTipo.modificar(idReclamoTipo, reclamoTipo);
    return { estado: true, data: modificacionReclamoTipo };
  };
}
