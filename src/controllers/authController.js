import jwt from "jsonwebtoken";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();

export const login = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, usuario, info) => {
    if (err || !usuario) {
      return res.status(400).json({
        message: "Algo salió mal",
        usuario: usuario,
      });
    }

    req.login(usuario, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }

      // Aquí eliges qué datos del usuario deseas almacenar en el token
      const payload = {
        id: usuario.idUsuario,
        correo: usuario.correoElectronico,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        // Puedes agregar más datos si lo deseas
      };

      // Generar el token JWT
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.json({ usuario, token });
    });
  })(req, res);
};
