import ReclamosService from "../services/reclamosService.js";

export default class ReclamosController {
  constructor() {
    this.service = new ReclamosService();
  }

  buscarTodos = async (req, res) => {
    const { limit, offset } = req.query;
    const querys = {
      limite: limit ? Number(limit) : 0,
      desplazamiento: offset ? Number(offset) : 0,
    };
    try {
      const reclamos = await this.service.buscarTodos(querys);
      res.status(200).send({ estado: "OK", data: reclamos });
    } catch (error) {
      console.log(error);
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

      if (!reclamo) {
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
    const idUsuarioCreador = req.user.idUsuario;
    const { asunto, descripcion, idReclamoTipo } = req.body;

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
    const datos = req.body;

    if (idReclamo === undefined || idReclamo === null) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Id requerida",
      });
    }

    try {
      const modificacionReclamo = await this.service.modificar(idReclamo, datos);

      res.status(200).send({
        estado: "OK",
        data: modificacionReclamo,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };

  cancelar = async (req, res) => {
    const idReclamo = req.params.idReclamo;
    const idUsuario = req.user.idUsuario;

    if (idReclamo === undefined || idReclamo === null) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Id requerida",
      });
    }

    try {
      const cancelarReclamo = await this.service.cancelar({ idReclamo, idUsuario });

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

  cambiarEstado = async (req, res) => {
    const idReclamo = req.params.idReclamo;
    const idUsuario = req.user.idUsuario;
    const estado = Number(req.body.estado);

    if (idReclamo === undefined || idReclamo === null) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Id requerida",
      });
    }

    if (!estado || estado === 3) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Estado no válido",
      });
    }
    try {
      const reclamo = await this.service.buscarId(idReclamo);
      if (reclamo && reclamo.reclamoEstado !== "Cancelado") { // Esto no me gusta, deberia ser por idEsado, consultar
        const estadoReclamo = await this.service.cambiarEstado({ idReclamo, idUsuario, estado });

        res.status(200).send({
          estado: "OK",
          data: estadoReclamo,
        });
      } else {
        return res.status(400).send({
          estado: "ERROR",
          mensaje: "El reclamo no existe o ha sido cancelado por el usuario",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };

  buscarUsuario = async (req, res) => {
    const idUsuario = req.user.idUsuario;
    if (idUsuario === undefined || idUsuario === null) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Id requerida",
      });
    }
    try {
      const reclamos = await this.service.buscarUsuario(idUsuario);
      if (!reclamos) {
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

  buscarOficina = async (req, res) => {
    const idUsuario = req.user.idUsuario;
    if (idUsuario === undefined || idUsuario === null) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Id requerida",
      });
    }
    try {
      const reclamos = await this.service.buscarOficina(idUsuario);
      if (!reclamos) {
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
      console.log(error);
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };
}
