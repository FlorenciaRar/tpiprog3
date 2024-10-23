import express from "express";
import ReclamosController from "../../controllers/reclamosController.js";
import {
  esAdmin,
  esCliente,
  esEmpleado,
} from "../../middlewares/validarUsuarios.js";
import { verificarTipoUsuario } from "../../middlewares/roleMiddleware.js";
import {
  validarIdReclamo,
  validarReclamos,
} from "../../middlewares/validaciones.js";
import { manejarErrores } from "../../middlewares/manejarErrores.js";

const router = express.Router();

const reclamosController = new ReclamosController();

// ADMIN
router.get("/", verificarTipoUsuario([1]), reclamosController.buscarTodos);

router.get("/:idReclamo", verificarTipoUsuario([1]), validarIdReclamo, manejarErrores,reclamosController.buscarId); 

router.patch("/:idReclamo", verificarTipoUsuario([1]),reclamosController.modificar);

// Falta: Info estadistica

// CLIENTES
router.get(
  "/usuario",
  verificarTipoUsuario([3]),
  reclamosController.buscarUsuario
); // Reclamos por usuario

router.post(
  "/",
  verificarTipoUsuario([1, 2, 3]),
  validarReclamos,
  manejarErrores,
  reclamosController.crear
);

router.patch(
  "/:idReclamo/cancelar",
  verificarTipoUsuario([3]),
  validarReclamos,
  manejarErrores,
  reclamosController.cancelar
); // Cancelar un reclamo
// Verificar que sea propio LISTO
// Verificar que no este finalizado

// EMPLEADOS
router.get(
  "/oficina",
  verificarTipoUsuario([2]),
  reclamosController.buscarOficina
); //Reclamos por empleado

router.patch("/:idReclamo/estado", verificarTipoUsuario([2]), validarReclamos, manejarErrores, reclamosController.cambiarEstado); // Cambiar estado de un reclamo
// Verificar qeu no pueda cambiarlo si no es de su oficina

export { router };
