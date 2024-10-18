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

    req.login(usuario, { session: false }, (err) => {
      if (err) {
        console.error("Error al iniciar sesión:", err);
        return res.status(500).json({
          message: "Error al iniciar sesión",
          error: err,
        });
      }

      // Aquí eliges qué datos del usuario deseas almacenar en el token
      const payload = {
        id: usuario.idUsuario,
        correo: usuario.correoElectronico,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
      };

      // Generar el token JWT
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      console.log("Autenticación exitosa, token generado:", token);
      return res.json({ usuario, token });
    });
  })(req, res);
};
