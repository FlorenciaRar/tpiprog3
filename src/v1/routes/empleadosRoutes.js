import express from "express";
import EmpleadosController from "../../controllers/empleadosController.js";

const router = express.Router();

const empleadosController = new EmpleadosController();

router.get("/", empleadosController.buscarTodos);
router.get("/:idEmpleado", empleadosController.buscarId);
router.post("/", empleadosController.crear);
router.patch("/:idEmpleado", empleadosController.modificar);

export { router };