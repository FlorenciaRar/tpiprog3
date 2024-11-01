import EmpleadosService from "../services/empleadosService.js";

export default class EmpleadosController {
  constructor() {
    this.service = new EmpleadosService();
  }

  buscarTodos = async (req, res) => {
    try {
      const empleados = await this.service.buscarTodos();
      res.status(200).send({ estado: "OK", data: empleados });
    } catch (error) {
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };

  buscarId = async (req, res) => {
    const idEmpleado = req.params.idEmpleado;

    if (idEmpleado === undefined || idEmpleado === null) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Datos requeridos",
      });
    }
    try {
      const empleado = await this.service.buscarId(idEmpleado);

      if (!empleado) {
        res.status(404).send({ estado: "ERROR", mensaje: "Empleado no encontrado" });
      } else {
        res.status(200).send({ estado: "OK", data: empleado });
      }
    } catch (error) {
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };

  crear = async (req, res) => {
    const { nombre, apellido, correoElectronico, contrasenia, imagen } = req.body;
    try {
      const empleado = {
        nombre,
        apellido,
        correoElectronico,
        contrasenia,
        imagen,
      };
      const creacionEmpleado = await this.service.crear(empleado);

      res.status(201).send({
        estado: "OK",
        data: creacionEmpleado,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };

  modificar = async (req, res) => {
    const idUsuario = req.params.idEmpleado;
    const datos = req.body;

    if (!Object.keys(datos).length) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Debe modificar al menos un campo",
      });
    }

    if (idUsuario === undefined || idUsuario === null) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Id requerida",
      });
    }

    if (datos.contrasenia || datos.idUsuarioTipo) {
      return res.status(403).send({
        estado: "ERROR",
        mensaje: "Alguno de los campos no se puede modificar",
      });
    }

    try {
      const modificacionEmpleado = await this.service.modificar({
        idUsuario,
        datos,
      });
      if (!modificacionEmpleado) {
        res.status(404).send({ estado: "ERROR", mensaje: "El empleado no se pudo modificar" });
      } else {
        res.status(200).send({ estado: "OK", data: modificacionEmpleado });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };
}
