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

  buscarEnOficina = async (idUsuario, idOficina) => {
    const extisteEmpleado = await this.empleados.buscarId(idUsuario);
    if (!extisteEmpleado) {
      return { estado: false, mensaje: "No existe el empleado" };
    }
    return this.empleados.buscarEnOficina(idUsuario, idOficina);
  };

  crear = async (empleado) => {
    const existeUsuario = await this.usuariosService.buscarUsuarioPorMail(empleado.correoElectronico);
    if (existeUsuario) {
      return { estado: false, mensaje: "Ya existe un usuario con ese mail" };
    }
    const empleadoCreado = await this.empleados.crear(empleado);
    return { estado: true, data: empleadoCreado };
  };

  modificar = async (empleado) => {
    const extisteEmpleado = await this.empleados.buscarId(empleado.idUsuario);
    if (!extisteEmpleado) {
      return "No existe el empleado";
    }
    return this.empleados.modificar(empleado);
  };
}
