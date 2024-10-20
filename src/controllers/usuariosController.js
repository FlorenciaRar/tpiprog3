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
        return res.status(404).send({
          estado: "ERROR",
          mensaje: "Usuario no encontrado",
        });
      }
      res.status(200).send({
        estado: "OK",
        data: usuario,
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
      const usuario = {
        nombre,
        apellido,
        correoElectronico,
        contrasenia,
        imagen,
      };
      const creacionUsuario = await this.service.crear(usuario);

      res.status(201).send({
        estado: "OK",
        data: creacionUsuario,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };

  modificar = async (req, res) => {
    const idUsuario = req.user.idUsuario; // Luego será req.user
    const datos = req.body;

    if (idUsuario === undefined || idUsuario === null) {
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
      const modificacionUsuario = await this.service.modificar({ idUsuario, datos });
      res.status(200).send({
        estado: "OK",
        data: modificacionUsuario,
      });
    } catch (error) {
      res.status(500).send({
        error,
        mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
      });
    }
  };
}
