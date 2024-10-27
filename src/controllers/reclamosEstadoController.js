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

      if (!reclamoEstado) {
        res.status(404).send({ estado: "ERROR", mensaje: "ReclamoEstado no encontrado" });
      } else {
        res.status(200).send({ estado: "OK", data: reclamoEstado });
      }
    } catch (error) {
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };

  crear = async (req, res) => {
    const { descripcion } = req.body;

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
    const datos = req.body;

    if (!Object.keys(datos).length) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Debe modificar al menos un campo",
      });
    }

    if (idReclamoEstado === undefined || idReclamoEstado === null) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Id requerida",
      });
    }

    try {
      const modificacionReclamoEstado = await this.service.modificar(idReclamoEstado, datos);
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
