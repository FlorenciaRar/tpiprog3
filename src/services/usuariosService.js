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

  crear = (usuario) => {
    return this.usuarios.crear(usuario);
  };

  modificar = async (usuario) => {
    const existeUsuario = await this.usuarios.buscarId(usuario.idUsuario);
    if (existeUsuario === null) {
      return { estado: false, mensaje: "El usuario no existe" };
    }
    return this.usuarios.modificar(usuario);
  };

  buscarLogin = (usuario) => {
    return this.usuarios.buscarLogin(usuario);
  };
}
