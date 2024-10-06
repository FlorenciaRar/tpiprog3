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

  modificar = (idUsuario, usuario) => {
    return this.usuarios.modificar(idUsuario, usuario);
  };

}
