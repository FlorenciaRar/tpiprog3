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

router.get(
  "/:idReclamo",
  verificarTipoUsuario([1, 2]),
  // permite que solo el admin y empleado puedan ver los reclamos ( agregar 3 para que el cliente tambien pueda verlo )
  validarIdReclamo,
  manejarErrores,
  reclamosController.buscarId
); // Actualmente funcionando todo OK!

// router.patch("/:idReclamo", reclamosController.modificar); // Mepa que no va

// Falta: Info estadistica

// Falta: Descargar informes

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

router.patch(
  "/:idReclamo/estado",
  esEmpleado,
  validarReclamos,
  manejarErrores,
  reclamosController.cambiarEstado
); // Cambiar estado de un reclamo
// Verificar qeu no pueda cambiarlo si no es de su oficina

export { router };
