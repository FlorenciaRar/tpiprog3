import express from "express";
import UsuariosController from "../../controllers/usuariosController.js";
import { verificarTipoUsuario } from "../../middlewares/roleMiddleware.js";

const router = express.Router();

const usuariosController = new UsuariosController();

router.get("/", verificarTipoUsuario([1]), usuariosController.buscarTodos);
router.get("/:idUsuario", usuariosController.buscarId);
router.post("/", usuariosController.crear);

router.patch("/", verificarTipoUsuario([3]), usuariosController.modificar);

export { router };
