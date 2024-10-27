import express from "express";
import ReclamosController from "../../controllers/reclamosController.js";
import { verificarTipoUsuario } from "../../middlewares/roleMiddleware.js";
import { validarCambioEstado, validarIdReclamo, validarReclamos } from "../../middlewares/validaciones.js";
import { manejarErrores } from "../../middlewares/manejarErrores.js";

const router = express.Router();

const reclamosController = new ReclamosController();

// ADMIN
router.get("/", verificarTipoUsuario([1]), reclamosController.buscarTodos);

// router.get("/:idReclamo", verificarTipoUsuario([1]), validarIdReclamo, manejarErrores, reclamosController.buscarId);

router.patch("/:idReclamo", verificarTipoUsuario([1]), manejarErrores, reclamosController.modificar);

// Falta: Info estadistica

// CLIENTES
router.get("/usuario", verificarTipoUsuario([3]), reclamosController.buscarReclamosUsuario); // Reclamos por usuario

router.post("/", verificarTipoUsuario([3]), validarReclamos, manejarErrores, reclamosController.crear);

router.patch("/cancelacion/:idReclamo/", verificarTipoUsuario([3]), manejarErrores, reclamosController.cancelar); // Cancelar un reclamo

// EMPLEADOS
router.get("/oficina", verificarTipoUsuario([2]), reclamosController.buscarReclamosOficina); //Reclamos por empleado

router.patch("/estado/:idReclamo/", verificarTipoUsuario([2]), validarCambioEstado, manejarErrores, reclamosController.cambiarEstado); // Cambiar estado de un reclamo

export { router };
