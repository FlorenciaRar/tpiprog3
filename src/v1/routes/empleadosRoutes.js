import express from "express";
import EmpleadosController from "../../controllers/empleadosController.js";

const router = express.Router();

const empleadosController = new EmpleadosController();

router.get("/", empleadosController.buscarTodos);
router.get("/:idEmpleado", empleadosController.buscarId);
router.post("/", empleadosController.crear); // checkear que ande
router.patch("/empleados", empleadosController.modificar);  //chequear que ande

export { router };