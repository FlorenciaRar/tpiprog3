import ReclamosTipo from "../database/reclamosTipo.js";

export default class ReclamosTipoService {
  constructor() {
    this.reclamosTipo = new ReclamosTipo();
  }

  buscarTodos = () => {
    return this.reclamosTipo.buscarTodos();
  };

  buscarId = (reclamoTipo) => {
    this.reclamosTipo.buscarId(reclamoTipo);
  };

  crear = (reclamoTipo) => {
    this.reclamosTipo.crear(reclamoTipo);
  };

  modificar = (reclamoTipo) => {
    this.reclamosTipo.modificar(reclamoTipo);
  };

  eliminar = (reclamoTipo) => {
    this.reclamosTipo.eliminar(reclamoTipo);
  };
}
