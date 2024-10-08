import ReclamosTipoService from "../services/reclamosTipoService.js";

export default class ReclamosTipoController {
  constructor() {
    this.service = new ReclamosTipoService();
  }

  buscarTodos = async (req, res) => {
    try {
      const reclamosTipo = await this.service.buscarTodos();
      res.status(200).send({ estado: "OK", data: reclamosTipo });
    } catch (error) {
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };

  buscarId = async (req, res) => {
    const idReclamoTipo = req.params.idReclamoTipo;

    if (idReclamoTipo === undefined || idReclamoTipo === null) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Datos requeridos",
      });
    }
    try {
      const reclamoTipo = await this.service.buscarId(idReclamoTipo);

      res.status(200).send({
        estado: "OK",
        data: reclamoTipo,
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
      const reclamoTipo = { descripcion };
      const creacionReclamoTipo = await this.service.crear(reclamoTipo);

      res.status(201).send({
        estado: "OK",
        data: creacionReclamoTipo,
      });
    } catch (error) {
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };

  modificar = async (req, res) => {
    const idReclamoTipo = req.params.idReclamoTipo;
    const {descripcion, activo} = req.body;

    if (idReclamoTipo === undefined || idReclamoTipo === null) {
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
      const modificacionReclamoTipo = await this.service.modificar(idReclamoTipo, { descripcion, activo });
      res.status(200).send({
        estado: "OK",
        data: modificacionReclamoTipo,
      });
    } catch (error) {
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };

}
