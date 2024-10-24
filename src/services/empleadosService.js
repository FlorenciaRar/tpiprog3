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

  crear = (usuario) => {
    const empleado = { ...usuario, idUsuarioTipo: 2 };
    return this.usuariosService.crear(empleado);
  };

  modificar = (empleado) => {
    return this.usuariosService.modificar(empleado);
  };
}
