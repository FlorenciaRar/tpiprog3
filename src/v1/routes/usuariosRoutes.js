import express from "express";
import UsuariosController from "../../controllers/usuariosController.js";

const router = express.Router();

const usuariosController = new UsuariosController();

router.get("/", usuariosController.buscarTodos);
router.get("/:idUsuario", usuariosController.buscarId);
router.post("/", usuariosController.crear); // Crear empleados, validar que usuario sea admin
router.patch("/:idUsuario", usuariosController.modificar); // autenticar

export { router };
