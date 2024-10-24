import OficinasService from "../services/oficinasService.js";

export default class oficinasController {
  constructor() {
    this.service = new OficinasService();
  }

  buscarTodos = async (req, res) => {
    const { limit, offset } = req.query;
    const querys = {
      limite: limit ? Number(limit) : 0,
      desplazamiento: offset ? Number(offset) : 0,
    };
    try {
      const oficinas = await this.service.buscarTodos(querys);
      res.status(200).send({ estado: "OK", data: oficinas });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };

  buscarId = async (req, res) => {
    const idOficina = req.params.idOficina;

    if (idOficina === undefined || idOficina === null) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Datos requeridos",
      });
    }
    try {
      const oficina = await this.service.buscarId(idOficina);

      if (!oficina) {
        return res.status(404).send({
          estado: "ERROR",
          mensaje: "Oficina no encontrada",
        });
      }
      res.status(200).send({
        estado: "OK",
        data: oficina,
      });
    } catch (error) {
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };

  crear = async (req, res) => {
    const { nombre, idReclamoTipo } = req.body;

    if (!nombre) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Nombre requerido",
      });
    }
    if (!idReclamoTipo) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "IdReclamoTipo requerida",
      });
    }

    try {
      const oficina = { nombre, idReclamoTipo };
      const creacionOficina = await this.service.crear(oficina);

      res.status(201).send({
        estado: "OK",
        data: creacionOficina,
      });
    } catch (error) {
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };

  modificar = async (req, res) => {
    const idOficina = req.params.idOficina;
    const datos = req.body;

    if (idOficina === undefined || idOficina === null) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Id requerida",
      });
    }

    try {
      const modificacionOficina = await this.service.modificar(idOficina, datos);

      res.status(200).send({
        estado: "OK",
        data: modificacionOficina,
      });
    } catch (error) {
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };

  buscarEmpleados = async (req, res) => {
    const idOficina = req.params.idOficina;

    try {
      const empleadosOficina = await this.service.buscarEmpleados(idOficina);
      res.status(200).send({
        estado: "OK",
        data: empleadosOficina,
      });
    } catch (error) {
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };

  agregarEmpleados = async (req, res) => {
    const { idOficina, empleados } = req.body;

    if (!idOficina) {
      return res.status(400).send({
        estado: "Falla",
        mensaje: "Faltan datos para crear la relación.",
      });
    }

    if (empleados.length === 0) {
      return res.status(400).send({
        estado: "Falla",
        mensaje: "Faltan datos para crear la relación.",
      });
    }

    try {
      const oficinaEmpleados = {
        idOficina,
        empleados,
      };

      const nuevoOficinaEmpleados = await this.service.agregarEmpleados(oficinaEmpleados);

      if (nuevoOficinaEmpleados.estado) {
        res.status(200).send({ estado: "OK", mensaje: nuevoOficinaEmpleados.mensaje });
      } else {
        res.status(404).send({ estado: "Falla", mensaje: nuevoOficinaEmpleados.mensaje });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        estado: "Falla",
        mensaje: "Error interno en servidor.",
      });
    }
  };

  quitarEmpleados = async (req, res) => {
    const { idOficina, empleados } = req.body;

    if (!idOficina) {
      return res.status(400).send({
        estado: "Falla",
        mensaje: "Faltan datos para crear la relación.",
      });
    }

    if (empleados.length === 0) {
      return res.status(400).send({
        estado: "Falla",
        mensaje: "Faltan datos para crear la relación.",
      });
    }

    try {
      const oficinaEmpleados = {
        idOficina,
        empleados,
      };

      const nuevoOficinaEmpleados = await this.service.quitarEmpleados(oficinaEmpleados);

      if (nuevoOficinaEmpleados.estado) {
        res.status(200).send({ estado: "OK", mensaje: nuevoOficinaEmpleados.mensaje });
      } else {
        res.status(404).send({ estado: "Falla", mensaje: nuevoOficinaEmpleados.mensaje });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        estado: "Falla",
        mensaje: "Error interno en servidor.",
      });
    }
  };
}
