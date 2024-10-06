import ReclamosService from "../services/reclamosService.js";

export default class ReclamosController {
  constructor() {
    this.service = new ReclamosService();
  }

  buscarTodos = async (req, res) => {
    try {
      const reclamos = await this.service.buscarTodos();
      res.status(200).send({ estado: "OK", data: reclamos });
    } catch (error) {
      console.log(error)
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };

  buscarId = async (req, res) => {
    const idReclamo = req.params.idReclamo;

    if (idReclamo === undefined || idReclamo === null) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Id requerida",
      });
    }
    try {
    const reclamo = await this.service.buscarId(idReclamo);

    if(!reclamo){
      return res.status(404).send({
        estado: "ERROR",
        mensaje: "Reclamo no encontrado",
      });
    }
      res.status(200).send({
        estado: "OK",
        data: reclamo,
      });
    } catch (error) {
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };

  crear = async (req, res) => {
    const { asunto, descripcion, idReclamoTipo, idUsuarioCreador } = req.body;

    if (!asunto) {
    return res.status(400).send({
      estado: "ERROR",
      mensaje: "Asunto requerido",
    });
  }
  if (!descripcion) {
    return res.status(400).send({
      estado: "ERROR",
      mensaje: "Descripción requerida",
    });
  }
  if (!idReclamoTipo) {
    return res.status(400).send({
      estado: "ERROR",
      mensaje: "IdReclamoTipo requerido",
    });
  }
  if (!idUsuarioCreador) {
    return res.status(400).send({
      estado: "ERROR",
      mensaje: "IdUsuarioCreador requerido",
    });
  }
    try {
      const reclamo = { asunto, descripcion, idReclamoTipo, idUsuarioCreador };
      const creacionReclamo = await this.service.crear(reclamo);

      res.status(201).send({
        estado: "OK",
        data: creacionReclamo,
      });
    } catch (error) {
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };

  modificar = async (req, res) => {
    const idReclamo = req.params.idReclamo;
    const {asunto, descripcion} = req.body;

    if (idReclamo === undefined || idReclamo === null) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Id requerida",
      });
    }
    if (!asunto) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Asunto requerido",
      });
    }
    if (!descripcion) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Descripcion requerida",
      });
    }

    try {
      const modificacionReclamo = await this.service.modificar(idReclamo, {asunto, descripcion});
      
      res.status(200).send({
        estado: "OK",
        data: modificacionReclamo,
      });
    } catch (error) {
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };

  cancelar = async (req, res) => {
    const idReclamo = req.params.idReclamo;

    if (idReclamo === undefined || idReclamo === null) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Id requerida",
      });
    }

    try {
      const cancelarReclamo = await this.service.cancelar(idReclamo);
      
      res.status(200).send({
        estado: "OK",
        data: cancelarReclamo,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };
  // cancelar = async (req, res) => {};

  // finalizar = async (req, res) => {};

  buscarOficina = async (req, res) => {
    const idUsuario = req.params.idUsuario; // Luego sera req.user
    console.log(idUsuario);
    if (idUsuario === undefined || idUsuario === null) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Id requerida",
      });
    }
    try {
    const reclamos = await this.service.buscarOficina(idUsuario);
    console.log(reclamos);
    if(!reclamos){
      return res.status(404).send({
        estado: "ERROR",
        mensaje: "No se han encontrado reclamos",
      });
    }
      res.status(200).send({
        estado: "OK",
        data: reclamos,
      });
    } catch (error) {
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };
}
