import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import { conexion } from "../database/conexion.js";
import dotenv from "dotenv";

dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const sql = "SELECT * FROM usuarios WHERE idUsuario = ?";
      const [result] = await conexion.query(sql, [jwt_payload.id]);

      if (result.length === 0) {
        return done(null, false);
      }

      const usuario = result[0];
      return done(null, usuario);
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;
