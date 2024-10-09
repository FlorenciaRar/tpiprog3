import express from "express";
import OficinasController from "../../controllers/oficinasController.js";

const router = express.Router();

const oficinasController = new OficinasController();

router.get("/", oficinasController.buscarTodos);
router.get("/:idOficina", oficinasController.buscarId);
router.post("/", oficinasController.crear);
router.patch("/:idOficina", oficinasController.modificar);

// Empleados por oficina
router.get("/:idOficina/empleados/", oficinasController.buscarEmpleados);

// Agregar empleado a oficina
// router.post("/empleados/", oficinasController.agregarEmpleados);

// Quitar empleado de oficina
// router.patch("/empleados/", oficinasController.quitarEmpleados);

export { router };
