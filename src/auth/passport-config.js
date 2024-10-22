import passport from "passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from "passport-local";
import { conexion } from "../database/conexion.js";
import crypto from "crypto";
import UsuariosService from "../services/usuariosService.js";

export const estrategia = 
  new LocalStrategy(
    {
      usernameField: "correo",
      passwordField: "contrasenia",
    },
    async (correo, contrasenia, done) => {
      try {
        const service = new UsuariosService();
        const usuario = await service.buscarLogin({correo, contrasenia})

        if (!usuario) {
          console.warn("Usuario no encontrado:", correo);
          return done(null, false, { mensaje: "Datos incorrectos" });
        } else {
          return done(null, usuario, { mensaje: 'Bienvenido' });
        }


      } catch (err) {
        console.error("Error en la autenticación:", err);
        return done(err);
      }
    }
  )

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export const validacion = 
  new Strategy(opts, async (jwt_payload, done) => {

      const service = new UsuariosService();
      const usuario = await service.buscarId(jwt_payload.id)

      if (usuario) {
            return done(null, usuario);
        } else {
            return done(null, false);
        }
  })
