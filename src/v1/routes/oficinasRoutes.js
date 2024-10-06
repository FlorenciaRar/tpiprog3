import express from "express";
import OficinasController from "../../controllers/oficinasController.js";

const router = express.Router();

const oficinasController = new OficinasController();

router.get("/", oficinasController.buscarTodos);
router.get("/:idOficina", oficinasController.buscarId);
router.post("/", oficinasController.crear);
router.patch("/:idOficina", oficinasController.modificar);

// Agregar empleado a oficina

// Quitar empleado de oficina

export { router };
