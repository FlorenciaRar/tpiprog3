import express from "express";
import OficinasController from "../../controllers/oficinasController.js";
import { manejarErrores } from "../../middlewares/manejarErrores.js";
import { validarOficinas } from "../../middlewares/validaciones.js";

const router = express.Router();

const oficinasController = new OficinasController();

router.get("/", oficinasController.buscarTodos);

router.get("/:idOficina", oficinasController.buscarId);

router.post("/", oficinasController.crear);

router.patch("/:idOficina", manejarErrores, oficinasController.modificar);

router.get("/:idOficina/empleados/", manejarErrores, oficinasController.buscarEmpleados); // Empleados por oficina

// Agregar empleado a oficina
// router.post("/empleados/", oficinasController.agregarEmpleados);

// Quitar empleado de oficina
// router.patch("/empleados/", oficinasController.quitarEmpleados);

export { router };
