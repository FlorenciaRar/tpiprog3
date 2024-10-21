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
        return res.status(404).send({
          estado: "ERROR",
          mensaje: "Empleado no encontrado",
        });
      }
      res.status(200).send({
        estado: "OK",
        data: empleado,
      });
    } catch (error) {
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };

  crear = async (req, res) => {
    const { nombre, apellido, correoElectronico, contrasenia, imagen } = req.body;

    if (!nombre) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Nombre requerido",
      });
    }
    if (!apellido) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Apellido requerido",
      });
    }
    if (!correoElectronico) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Correo electrónico requerido",
      });
    }
    if (!contrasenia) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Contraseña requerida",
      });
    }

    // Validar imagen

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
    const idEmpleado = req.params.idEmpleado;
    const datos = req.body;

    if (idEmpleado === undefined || idEmpleado === null) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Id requerida",
      });
    }

    if (datos.contrasenia) {
      return res.status(403).send({
        estado: "ERROR",
        mensaje: "El campo contraseña no se puede modificar",
      });
    }

    try {
      const modificacionEmpleado = await this.service.modificar({ idEmpleado, datos });
      res.status(200).send({
        estado: "OK",
        data: modificacionEmpleado,
      });
    } catch (error) {
      res.status(500).send({
        error,
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };
}
