import Oficinas from "../database/oficinas.js";

export default class OficinasService {
  constructor() {
    this.oficinas = new Oficinas();
  }

  buscarTodos = () => {
    return this.oficinas.buscarTodos();
  };

  buscarId = (oficina) => {
    return this.oficinas.buscarId(oficina);
    
  };

  crear = (oficina) => {
    return this.oficinas.crear(oficina);
  };

  modificar = (idOficina, oficina) => {
    return this.oficinas.modificar(idOficina, oficina);
  };

  // eliminar = (reclamoTipo) => {
  //   this.reclamosTipo.eliminar(reclamoTipo);
  // };
}
