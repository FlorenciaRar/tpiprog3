import Oficinas from "../database/oficinas.js";
import EmpleadosService from "./empleadosService.js";

export default class OficinasService {
  constructor() {
    this.oficinas = new Oficinas();
    this.empleadosService = new EmpleadosService();
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

  modificar = async (idOficina, oficina) => {
    const extisteOficina = await this.oficinas.buscarId(idOficina);
    if (!extisteOficina) {
      return { estado: false, mensaje: "No existe la oficina" };
    }
    return this.oficinas.modificar(idOficina, oficina);
  };

  buscarEmpleados = async (idOficina) => {
    const extisteOficina = await this.oficinas.buscarId(idOficina);
    if (!extisteOficina) {
      return { estado: false, mensaje: "No existe la oficina" };
    }
    return this.oficinas.buscarEmpleados(idOficina);
  };

  agregarEmpleados = async ({ idOficina, empleados }) => {
    const extisteOficina = await this.oficinas.buscarId(idOficina);
    if (!extisteOficina) {
      return { estado: false, mensaje: "No existe la oficina" };
    }
    let empleadosExistentes = [];
    for (const empleado of empleados) {
      const existe = await this.empleadosService.buscarId(empleado.idUsuario);
      if (existe) {
        empleadosExistentes.push(empleado);
      }
    }

    return await this.oficinas.agregarEmpleados({ idOficina, empleadosExistentes });
  };

  quitarEmpleados = async ({ idOficina, empleados }) => {
    const extisteOficina = await this.oficinas.buscarId(idOficina);
    if (!extisteOficina) {
      return { estado: false, mensaje: "No existe la oficina" };
    }
    let empleadosExistentes = [];
    for (const empleado of empleados) {
      const existe = await this.empleadosService.buscarId(empleado.idUsuario);
      if (existe) {
        empleadosExistentes.push(empleado);
      }
    }

    return await this.oficinas.quitarEmpleados({ idOficina, empleadosExistentes });
  };
}
