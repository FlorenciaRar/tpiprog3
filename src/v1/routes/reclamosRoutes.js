import express from "express";
import ReclamosController from "../../controllers/reclamosController.js";
import { verificarTipoUsuario } from "../../middlewares/roleMiddleware.js";
import { validarIdReclamo, validarReclamos } from "../../middlewares/validaciones.js";
import { manejarErrores } from "../../middlewares/manejarErrores.js";

const router = express.Router();

const reclamosController = new ReclamosController();

// ADMIN
router.get("/", verificarTipoUsuario([1]), reclamosController.buscarTodos);

// router.get("/:idReclamo", verificarTipoUsuario([1]), validarIdReclamo, manejarErrores, reclamosController.buscarId);

router.patch("/:idReclamo", verificarTipoUsuario([1]), reclamosController.modificar);

// Falta: Info estadistica

// CLIENTES
router.get("/usuario", verificarTipoUsuario([3]), reclamosController.buscarUsuario); // Reclamos por usuario

router.post("/", verificarTipoUsuario([3]), validarReclamos, manejarErrores, reclamosController.crear);

router.patch("/cancelacion/:idReclamo/", verificarTipoUsuario([3]), manejarErrores, reclamosController.cancelar); // Cancelar un reclamo

// EMPLEADOS
router.get("/oficina", verificarTipoUsuario([2]), reclamosController.buscarOficina); //Reclamos por empleado

router.patch("/estado/:idReclamo/", verificarTipoUsuario([2]), manejarErrores, reclamosController.cambiarEstado); // Cambiar estado de un reclamo
// Verificar qeu no pueda cambiarlo si no es de su oficina

export { router };
