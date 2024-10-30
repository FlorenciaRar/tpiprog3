import express from "express";
import UsuariosController from "../../controllers/usuariosController.js";
import { verificarTipoUsuario } from "../../middlewares/roleMiddleware.js";
import { manejarErrores } from "../../middlewares/manejarErrores.js";
import { validarIdUsuario, validarUsuarios } from "../../middlewares/validaciones.js";
import { authenticateJWT } from "../../middlewares/authMiddleware.js";

const router = express.Router();

const usuariosController = new UsuariosController();

/**
 * @swagger
 * /api/v1/usuarios:
 *   get:
 *     summary: Retorna todos los usuarios
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Resource not found
 */
router.get("/", authenticateJWT, verificarTipoUsuario([1]), usuariosController.buscarTodos);
router.get("/:idUsuario", authenticateJWT, verificarTipoUsuario([1]), validarIdUsuario, manejarErrores, usuariosController.buscarId);
router.post("/", authenticateJWT, verificarTipoUsuario([1]), validarUsuarios, manejarErrores, usuariosController.crear);
router.patch("/", authenticateJWT, verificarTipoUsuario([1, 3]), manejarErrores, usuariosController.modificar);

export { router };
