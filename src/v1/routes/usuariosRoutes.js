import express from "express";
import UsuariosController from "../../controllers/usuariosController.js";
import { verificarTipoUsuario } from "../../middlewares/roleMiddleware.js";
import { manejarErrores } from "../../middlewares/manejarErrores.js";
import {
  validarIdUsuario,
  validarUsuarios,
} from "../../middlewares/validaciones.js";

const router = express.Router();

const usuariosController = new UsuariosController();

router.get("/", verificarTipoUsuario([1]), usuariosController.buscarTodos);
router.get(
  "/:idUsuario",
  validarIdUsuario,
  manejarErrores,
  usuariosController.buscarId
);
router.post(
  "/",
  verificarTipoUsuario([1, 2, 3]),
  validarUsuarios,
  manejarErrores,
  usuariosController.crear
);

router.patch("/", verificarTipoUsuario([3]), usuariosController.modificar);

export { router };
