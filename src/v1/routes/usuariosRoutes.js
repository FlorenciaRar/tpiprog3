import express from "express";
import UsuariosController from "../../controllers/usuariosController.js";
import { verificarTipoUsuario } from "../../middlewares/roleMiddleware.js";
import { manejarErrores } from "../../middlewares/manejarErrores.js";
import { validarIdUsuario, validarUsuarios } from "../../middlewares/validaciones.js";
import { authenticateJWT } from "../../middlewares/authMiddleware.js";

const router = express.Router();

const usuariosController = new UsuariosController();

router.get("/", authenticateJWT, verificarTipoUsuario([1]), usuariosController.buscarTodos);
router.get("/:idUsuario", authenticateJWT, verificarTipoUsuario([1]), validarIdUsuario, manejarErrores, usuariosController.buscarId);
router.post("/", validarUsuarios, manejarErrores, usuariosController.crear);
router.patch("/", authenticateJWT, verificarTipoUsuario([3]), usuariosController.modificar);

export { router };
