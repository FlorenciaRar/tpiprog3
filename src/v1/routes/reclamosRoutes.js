import express from "express";
import ReclamosController from "../../controllers/reclamosController.js";
import { esAdmin, esCliente, esEmpleado } from "../../middlewares/validarUsuarios.js";

const router = express.Router();

const reclamosController = new ReclamosController();

// ADMIN

router.get("/", esAdmin, reclamosController.buscarTodos);

// router.get("/:idReclamo", reclamosController.buscarId); // Todavia no se

// router.patch("/:idReclamo", reclamosController.modificar); // Mepa que no va

// Falta: Info estadistica

// Falta: Descargar informes

// CLIENTES
router.get("/usuario", esCliente, reclamosController.buscarUsuario); // Reclamos por usuario

router.post("/", esCliente, reclamosController.crear);

router.patch("/:idReclamo/cancelar", esCliente, reclamosController.cancelar); // Cancelar un reclamo
// Verificar que sea propio LISTO
// Verificar que no este finalizado

// EMPLEADOS

router.get("/oficina", esEmpleado, reclamosController.buscarOficina); //Reclamos por empleado

router.patch("/:idReclamo/estado", esEmpleado, reclamosController.cambiarEstado); // Cambiar estado de un reclamo
// Verificar que no pueda poner estado cancelado LISTO
// Verificar que solo modifique estado LISTO
// Verificar que el reclamo no este cancelado LISTO
// Verificar que exista LISTO
// Verificar qeu no pueda cambiarlo si no es de su oficina

export { router };
