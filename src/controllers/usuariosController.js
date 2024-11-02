import UsuariosService from "../services/usuariosService.js";

export default class usuariosController {
  constructor() {
    this.service = new UsuariosService();
  }

  buscarTodos = async (req, res) => {
    try {
      const usuarios = await this.service.buscarTodos();
      res.status(200).send({ estado: "OK", data: usuarios });
    } catch (error) {
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };

  buscarId = async (req, res) => {
    const idUsuario = req.params.idUsuario;

    if (idUsuario === undefined || idUsuario === null) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Datos requeridos",
      });
    }
    try {
      const usuario = await this.service.buscarId(idUsuario);

      if (!usuario) {
        res.status(404).send({ estado: "ERROR", mensaje: "Usuario no encontrado" });
      } else {
        res.status(200).send({ estado: "OK", data: usuario });
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
      const usuario = {
        nombre,
        apellido,
        correoElectronico,
        contrasenia,
        imagen,
      };
      const creacionUsuario = await this.service.crear(usuario);

      if (!creacionUsuario.estado) {
        res.status(400).send({ estado: "ERROR", mensaje: creacionUsuario.mensaje });
      } else {
        res.status(201).send({ estado: "OK", data: creacionUsuario.data });
      }
    } catch (error) {
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };

  modificar = async (req, res) => {
    const idUsuario = req.user.idUsuario;
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
      const modificacionUsuario = await this.service.modificar({
        idUsuario,
        datos,
      });
      if (!modificacionUsuario.estado) {
        res.status(404).send({ estado: "ERROR", mensaje: "El usuario no se pudo modificar" });
      } else {
        res.status(200).send({ estado: "OK", data: modificacionUsuario.data });
      }
    } catch (error) {
      res.status(500).send({
        error,
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };

  modificarContrasenia = async (req, res) => {
    const idUsuario = req.user.idUsuario;
    const datos = req.body.contrasenia;

    if (idUsuario === undefined || idUsuario === null) {
      return res.status(400).send({
        estado: "ERROR",
        mensaje: "Id requerida",
      });
    }

    try {
      const modificacionUsuario = await this.service.modificarContrasenia({
        idUsuario,
        datos,
      });
      if (!modificacionUsuario.estado) {
        res.status(404).send({ estado: "ERROR", mensaje: "No se pudo modificar la contrasenia" });
      } else {
        res.status(200).send({ estado: "OK", data: modificacionUsuario.data });
      }
    } catch (error) {
      res.status(500).send({
        error,
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };
}
