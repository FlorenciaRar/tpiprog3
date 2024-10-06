import ReclamosEstadoService from "../services/reclamosEstadoService.js";

export default class ReclamosEstadoController {
  constructor() {
    this.service = new ReclamosEstadoService();
  }

  buscarTodos = async (req, res) => {
    try {
      const reclamosEstado = await this.service.buscarTodos();
      res.status(200).send({ estado: "OK", data: reclamosEstado });
    } catch (error) {
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };

  buscarId = async (req, res) => {
    const idReclamoEstado = req.params.idReclamoEstado;

    if (idReclamoEstado === undefined || idReclamoEstado === null) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Datos requeridos",
      });
    }
    try {
      const reclamoEstado = await this.service.buscarId(idReclamoEstado);

      res.status(200).send({
        estado: "OK",
        data: reclamoEstado,
      });
    } catch (error) {
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };

  crear = async (req, res) => {
    const { descripcion } = req.body;

    if (!descripcion) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Descripción requerida",
      });
    }

    try {
      const reclamoEstado = { descripcion };
      const creacionReclamoEstado = await this.service.crear(reclamoEstado);

      res.status(201).send({
        estado: "OK",
        data: creacionReclamoEstado,
      });
    } catch (error) {
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };

  modificar = async (req, res) => {
    const idReclamoEstado = req.params.idReclamoEstado;
    const {descripcion, activo} = req.body;

    if (idReclamoEstado === undefined || idReclamoEstado === null) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Id requerida",
      });
    }
    if (!descripcion) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Descripción requerida",
      });
    }
    if (activo === undefined || activo === null) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Campo activo requerido",
      });
    }

    try {
      const modificacionReclamoEstado = await this.service.modificar(idReclamoEstado, { descripcion, activo });
      res.status(200).send({
        estado: "OK",
        data: modificacionReclamoEstado,
      });
    } catch (error) {
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };

}
