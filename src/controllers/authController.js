import jwt from "jsonwebtoken";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();

export const login = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, usuario, info) => {
    if (err) {
      console.error("Error en la autenticación:", err);
      return res.status(500).json({
        message: "Error en el servidor",
        error: err,
      });
    }

    if (!usuario) {
      console.warn("Usuario no encontrado o credenciales incorrectas:", info);
      return res.status(401).json({
        message: info ? info.message : "Credenciales incorrectas",
        usuario: false,
      });
    }

      const payload = {
        id: usuario.idUsuario,
        correo: usuario.correoElectronico,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        idUsuarioTipo: usuario.idUsuarioTipo,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      
      return res.json({ usuario, token });
  })(req, res);
};
