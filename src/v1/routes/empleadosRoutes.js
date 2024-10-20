import express from "express";
import UsuariosController from "../../controllers/usuariosController.js";
import { verificarTipoUsuario } from "../../middlewares/roleMiddleware.js";

const router = express.Router();

const empleadosController = new EmpleadosController();

// CRUD EMPLEADOS

router.get("/", empleadosController.buscarTodos);
router.get("/:idUsuario", empleadosController.buscarId);
router.post("/", empleadosController.crear); // Crear empleados, validar que usuario sea admin // MODIFICAR EL NOMBRE EN EL RESTO DEL SISTEMA
router.patch("/empleados", empleadosController.modificar);