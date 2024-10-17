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
}
