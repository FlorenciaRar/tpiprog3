import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { conexion } from "../database/conexion.js";
import crypto from "crypto";

passport.use(
  new LocalStrategy(
    {
      usernameField: "correo",
      passwordField: "contrasenia",
    },
    async (correo, contrasenia, done) => {
      try {
        const sql = "SELECT * FROM usuarios WHERE correoElectronico = ?";
        const [result] = await conexion.query(sql, [correo]);

        if (result.length === 0) {
          console.warn("Usuario no encontrado:", correo);
          return done(null, false, { message: "Usuario no encontrado" });
        }

        const usuario = result[0];

        const hash = crypto.createHash("sha256").update(contrasenia).digest("hex");
        if (hash === usuario.contrasenia) {
          console.log("Contraseña correcta para el usuario:", correo);
          return done(null, usuario);
        } else {
          console.warn("Contraseña incorrecta para el usuario:", correo);
          return done(null, false, { message: "Credenciales incorrectas" });
        }

      } catch (err) {
        console.error("Error en la autenticación:", err);
        return done(err);
      }
    }
  )
);

// passport.serializeUser((usuario, done) => {
//   done(null, usuario.idUsuario);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const sql = "SELECT * FROM usuarios WHERE idUsuario = ?";
//     const [result] = await conexion.query(sql, [id]);
//     if (result.length === 0) {
//       return done(new Error("Usuario no encontrado"));
//     }
//     done(null, result[0]);
//   } catch (err) {
//     done(err);
//   }
// });

export default passport;
