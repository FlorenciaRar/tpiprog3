import ReclamosService from "../services/reclamosService.js";

const formatosPermitidos = ["pdf", "csv"];

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

    if (!Object.keys(datos).length) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Debe modificar al menos un campo",
      });
    }

    if (idReclamo === undefined || idReclamo === null) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Id requerida",
      });
    }

    try {
      const modificacionReclamo = await this.service.modificar(
        idReclamo,
        datos
      );

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
    const idUsuario = req.user.idUsuario;

    if (idReclamo === undefined || idReclamo === null) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Id requerida",
      });
    }

    try {
      const cancelarReclamo = await this.service.cancelar({
        idReclamo,
        idUsuario,
      });

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
    const estado = Number(req.body.idReclamoEstado);

    if (idReclamo === undefined || idReclamo === null) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Id requerida",
      });
    }

    try {
      const estadoReclamo = await this.service.cambiarEstado({
        idReclamo,
        idUsuario,
        estado,
      });

      res.status(200).send({
        estado: "OK",
        data: estadoReclamo,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };

  buscarReclamosUsuario = async (req, res) => {
    const idUsuario = req.user.idUsuario;
    if (idUsuario === undefined || idUsuario === null) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Id requerida",
      });
    }
    try {
      const reclamos = await this.service.buscarReclamosUsuario(idUsuario);
      if (!reclamos) {
        return res.status(404).send({
          estado: "ERROR",
          mensaje: "No se han encontrado reclamos",
        });
      } else {
        res.status(200).send({
          estado: "OK",
          data: reclamos,
        });
      }
    } catch (error) {
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };

  buscarReclamosOficina = async (req, res) => {
    const idUsuario = req.user.idUsuario;
    if (idUsuario === undefined || idUsuario === null) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Id requerida",
      });
    }
    try {
      const reclamos = await this.service.buscarReclamosOficina(idUsuario);
      if (!reclamos) {
        return res.status(404).send({
          estado: "ERROR",
          mensaje: "No se han encontrado reclamos",
        });
      } else {
        res.status(200).send({
          estado: "OK",
          data: reclamos,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };

  informe = async (req, res) => {
    try {
      //el formato viene por query param
      const formato = req.query.formato;
      
      if (!formato || !formatosPermitidos.includes(formato)) {
        return res.status(400).send({
          estado: "Falla",
          mensaje: "Formato invalido para el informe",
        });
      }

      //si son los permitidos
      //generar informe

      //lo que nos retorna el servicio
      const { buffer, path, headers } =
        await this.service.generarInforme(formato);

      //settear cabecera de respuesta
      res.set(headers);

      if (formato === "pdf") {
        //respuesta con metodo end que me permite enviar datos binarios
        res.status(200).end(buffer);
      }else if (formato === "csv") {
        //respuesta para la descarga. Pasamos una funcion de callback en el metodo end por posibles errores
        res.status(200).download(path, (err) => {
          if (err) {
            res.status(400).send({
              estado: "Falla",
              mensaje: "No se pudo generar el informe.",
            });
          }
        });
      }
    } catch (error){
      console.error(error)
      res.status(500).send({
        estado: "Falla", mensaje: "Error interno del servidor"
      })
    }
  };
}
