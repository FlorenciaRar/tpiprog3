import { conexion } from "./conexion.js";

export default class Usuarios {
  buscarTodos = async () => {
    const sql = "SELECT nombre, apellido, correoElectronico FROM usuarios WHERE activo = 1;";
    const [resultado] = await conexion.query(sql);
    return resultado;
  };

  buscarId = async (idUsuario) => {
    const sql = "SELECT nombre, apellido, correoElectronico FROM usuarios WHERE idUsuario = ? AND activo = 1;";
    const [resultado] = await conexion.query(sql, [idUsuario]);
    return resultado.length > 0 ? resultado[0] : null;
  };

  crear = async ({ nombre, apellido, correoElectronico, contrasenia, imagen }) => {
    const sql =
      "INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen, activo) VALUES  (?, ?, ?, SHA2(?, 256), 2, ?, 1);";
    const [resultado] = await conexion.query(sql, [nombre, apellido, correoElectronico, contrasenia, imagen]);

    if (resultado.affectedRows === 0) {
      return res.status(400).json({
        mensaje: "Ocurrió un error creando el ususario",
      });
    }

    return this.buscarId(resultado.insertId);
  };

  modificar = async (idUsuario, { nombre, apellido, correoElectronico, imagen, activo }) => {
    const sql = "UPDATE usuarios SET nombre= ?, apellido= ?, correoElectronico= ?, imagen= ?, activo= ? WHERE idUsuario = ?";
    const [resultado] = await conexion.query(sql, [nombre, apellido, correoElectronico, imagen, activo, idUsuario]);

    if (resultado.affectedRows === 0) {
      return res.status(400).json({
        mensaje: "Ocurrió un error modificando el usuario",
      });
    }

    return this.buscarId(idUsuario);
  };
}
