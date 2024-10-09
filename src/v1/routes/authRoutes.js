import express from "express";
import passport from "passport";

const router = express.Router();

// Ruta de login que utiliza Passport.js para la autenticación
router.post(
  "/login",
  (req, res, next) => {
    next();
  },
  (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ mensaje: info.message });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({ mensaje: "Autenticación exitosa" });
      });
    })(req, res, next);
  }
);

// Middleware para verificar si el usuario está autenticado
export function autenticado(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ mensaje: "No autorizado" });
  }
}

// Ruta de sección autenticada
router.get("/seccion-autenticada", autenticado, (req, res) => {
  res.status(200).json({ mensaje: "Bienvenido a la sección autenticada" });
});

// Ruta de login fallido
router.get("/login-fallido", (req, res) => {
  res.status(401).json({ mensaje: "Credenciales incorrectas" });
});

export default router;
