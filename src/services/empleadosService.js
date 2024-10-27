import Empleados from "../database/empleados.js";
import UsuariosService from "./usuariosService.js";

export default class EmpleadosService {
  constructor() {
    this.empleados = new Empleados();
    this.usuariosService = new UsuariosService();
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

  crear = (usuario) => {
    const empleado = { ...usuario, idUsuarioTipo: 2 };
    return this.usuariosService.crear(empleado);
  };

  modificar = async (empleado) => {
    const extisteEmpleado = await this.empleados.buscarId(empleado.idUsuario);
    if (!extisteEmpleado) {
      return { estado: false, mensaje: "No existe el empleado" };
    }
    return this.usuariosService.modificar(empleado);
  };
}
