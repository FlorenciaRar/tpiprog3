import express from "express";
import ReclamosController from "../../controllers/reclamosController.js";
import { esAdmin, esCliente, esEmpleado } from "../../middlewares/validarUsuarios.js";
import { verificarTipoUsuario } from "../../middlewares/roleMiddleware.js";

const router = express.Router();

const reclamosController = new ReclamosController();

// ADMIN

router.get("/", reclamosController.buscarTodos);

// router.get("/:idReclamo", reclamosController.buscarId); // Todavia no se

// router.patch("/:idReclamo", reclamosController.modificar); // Mepa que no va

// Falta: Info estadistica

// Falta: Descargar informes

// CLIENTES
router.get("/usuario", verificarTipoUsuario([3]), reclamosController.buscarUsuario); // Reclamos por usuario

router.post("/", verificarTipoUsuario([3]), reclamosController.crear);

router.patch("/:idReclamo/cancelar", verificarTipoUsuario([3]), reclamosController.cancelar); // Cancelar un reclamo
// Verificar que sea propio LISTO
// Verificar que no este finalizado

// EMPLEADOS

router.get("/oficina", verificarTipoUsuario([2]), reclamosController.buscarOficina); //Reclamos por empleado

router.patch("/:idReclamo/estado", esEmpleado, reclamosController.cambiarEstado); // Cambiar estado de un reclamo
// Verificar que no pueda poner estado cancelado LISTO
// Verificar que solo modifique estado LISTO
// Verificar que el reclamo no este cancelado LISTO
// Verificar que exista LISTO
// Verificar qeu no pueda cambiarlo si no es de su oficina

export { router };
