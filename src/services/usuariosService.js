import Usuarios from "../database/usuarios.js";

export default class UsuariosService {
  constructor() {
    this.usuarios = new Usuarios();
  }

  buscarTodos = () => {
    return this.usuarios.buscarTodos();
  };

  buscarId = (usuario) => {
    return this.usuarios.buscarId(usuario);
  };

  buscarUsuarioPorMail = (usuario) => {
    return this.usuarios.buscarUsuarioPorMail(usuario);
  };

  crear = async (usuario) => {
    const existeUsuario = await this.usuarios.buscarUsuarioPorMail(usuario.correoElectronico);
    if (existeUsuario) {
      return { estado: false, mensaje: "Ya existe un usuario con ese mail" };
    }
    const usuarioCreado = await this.usuarios.crear(usuario);
    return { estado: true, data: usuarioCreado };
  };

  modificar = async (usuario) => {
    const existeUsuario = await this.usuarios.buscarId(usuario.idUsuario);
    if (existeUsuario === null) {
      return { estado: false, mensaje: "El usuario no existe" };
    }

    const modificarUsuario = await this.usuarios.modificar(usuario);
    return { estado: true, data: modificarUsuario };
  };

  modificarContrasenia = async (usuario) => {
    const existeUsuario = await this.usuarios.buscarId(usuario.idUsuario);
    if (existeUsuario === null) {
      return { estado: false, mensaje: "El usuario no existe" };
    }
    const modificarUsuario = await this.usuarios.modificarContrasenia(usuario);
    return { estado: true, data: modificarUsuario };
  };

  buscarLogin = (usuario) => {
    return this.usuarios.buscarLogin(usuario);
  };
}
