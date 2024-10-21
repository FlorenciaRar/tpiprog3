import Empleados from "../database/empleados.js";

export default class EmpleadosService {
  constructor() {
    this.empleados = new Empleados();
  }

  buscarTodos = () => {
    return this.empleados.buscarTodos();
  };

  buscarId = (empleado) => {
    return this.empleados.buscarId(empleado);
  };

  crear = (empleado) => {
    return this.empleados.crear(empleado);
  };

  modificar = (empleado) => {
    return this.empleados.modificar(empleado);
  };
}
