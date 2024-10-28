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

  buscarEnOficina = async (idUsuario) => {
    const extisteEmpleado = await this.empleados.buscarId(idUsuario);
    if (!extisteEmpleado) {
      return { estado: false, mensaje: "No existe el empleado" };
    }
    return this.empleados.buscarEnOficina(idUsuario);
  };

  crear = (empleado) => {
    return this.empleados.crear(empleado);
  };

  modificar = async (empleado) => {
    const extisteEmpleado = await this.empleados.buscarId(empleado.idUsuario);
    if (!extisteEmpleado) {
      return "No existe el empleado";
    }
    return this.empleados.modificar(empleado);
  };
}
