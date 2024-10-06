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

  modificar = (idReclamoTipo, reclamoTipo) => {
    return this.reclamosTipo.modificar(idReclamoTipo, reclamoTipo);
  };
}
