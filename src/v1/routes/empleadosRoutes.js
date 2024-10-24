import express from "express";
import EmpleadosController from "../../controllers/empleadosController.js";
import { manejarErrores } from "../../middlewares/manejarErrores.js";
import { validarEmpleados, validarIdEmpleado } from "../../middlewares/validaciones.js";
import { verificarTipoUsuario } from "../../middlewares/roleMiddleware.js";

const router = express.Router();

const empleadosController = new EmpleadosController();

router.get("/", empleadosController.buscarTodos);
router.get("/:idEmpleado", validarIdEmpleado, manejarErrores, empleadosController.buscarId);
router.post("/", validarEmpleados, manejarErrores, empleadosController.crear);
router.patch("/:idEmpleado", manejarErrores, empleadosController.modificar);

export { router };
