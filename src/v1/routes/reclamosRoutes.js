import express from "express";
import ReclamosController from "../../controllers/reclamosController.js";

const router = express.Router();

const reclamosController = new ReclamosController();

router.get("/", reclamosController.buscarTodos);
router.get("/:idReclamo", reclamosController.buscarId);
router.post("/", reclamosController.crear); // Autenticar
router.patch("/:idReclamo", reclamosController.modificar); //Autenticar

// Cancelar un reclamo (para clientes)
router.patch("/:idReclamo/cancelar", reclamosController.cancelar); // Autenticar

// Cambiar estado (para empleados)
router.post("/:idReclamo/estado", reclamosController.cambiarEstado); // Autenticar

// Reclamos por usuario
router.get("/usuario/:idUsuario", reclamosController.buscarUsuario); // Temporalmente con parametro

// Reclamos por empleado
router.get("/oficina/:idUsuario", reclamosController.buscarOficina); // Temporalmente con parametro

export { router };
