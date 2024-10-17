import Oficinas from "../database/oficinas.js";

export default class OficinasService {
  constructor() {
    this.oficinas = new Oficinas();
  }

  buscarTodos = (oficinaQuerys) => {
    return this.oficinas.buscarTodos(oficinaQuerys);
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

  buscarEmpleados = (idOficina) => {
    return this.oficinas.buscarEmpleados(idOficina);
  };
}
