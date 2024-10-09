import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { conexion } from "../database/conexion.js";
import bcrypt from "bcryptjs";

// Configuración de la estrategia local
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

        console.log("consulta SQL:", result);

        // Si no se encuentra ningún usuario con el correo proporcionado
        if (result.length === 0) {
          return done(null, false, { message: "Usuario no encontrado" });
        }

        const usuario = result[0];

        console.log("objeto usuario:", usuario);

        // Si la contraseña es correcta
        if (bcrypt.compareSync(contrasenia, usuario.contrasenia)) {
          return done(null, usuario);
        } else {
          // Si la contraseña es incorrecta
          return done(null, false, { message: "Credenciales incorrectas" });
        }
      } catch (err) {
        // Si ocurre un error durante la consulta
        return done(err);
      }
    }
  )
);

// Serializar y deserializar usuario
passport.serializeUser((usuario, done) => {
  done(null, usuario.idUsuario);
});

passport.deserializeUser(async (id, done) => {
  try {
    const sql = "SELECT * FROM usuarios WHERE idUsuario = ?";
    const [result] = await conexion.query(sql, [id]);
    if (result.length === 0) {
      return done(new Error("Usuario no encontrado"));
    }
    done(null, result[0]);
  } catch (err) {
    done(err);
  }
});

export default passport;
