import express from "express";
import ReclamosController from "../../controllers/reclamosController.js";
import { verificarTipoUsuario } from "../../middlewares/roleMiddleware.js";
import {
  validarCambioEstado,
  validarIdReclamo,
  validarReclamos,
} from "../../middlewares/validaciones.js";
import { manejarErrores } from "../../middlewares/manejarErrores.js";

const router = express.Router();

const reclamosController = new ReclamosController();

// ADMIN
router.get(
  "/",
  verificarTipoUsuario([1]),
  reclamosController.buscarTodos
  /*
  #swagger.description = 'Buscar todos los reclamos'  
  #swagger.path = '/reclamos'
  */
);

router.patch(
  "/:idReclamo",
  verificarTipoUsuario([1]),
  manejarErrores,
  reclamosController.modificar
  //#swagger.description = 'Modificar un reclamo'
);

router.get(
  "/informe",
  verificarTipoUsuario([1]),
  manejarErrores,
  reclamosController.informe
);

// CLIENTES
router.get(
  "/usuario",
  verificarTipoUsuario([3]),
  reclamosController.buscarReclamosUsuario
  //#swagger.description = 'Ver reclamos por usuario'
); // Reclamos por usuario

router.post(
  "/",
  verificarTipoUsuario([3]),
  validarReclamos,
  manejarErrores,
  reclamosController.crear
  /*
#swagger.description = 'Crear reclamos'
#swagger.path = '/reclamos'
*/
);

router.patch(
  "/cancelacion/:idReclamo/",
  verificarTipoUsuario([3]),
  manejarErrores,
  reclamosController.cancelar
  //#swagger.description = 'Cancelar un reclamo por ID'
); // Cancelar un reclamo

// EMPLEADOS
router.get(
  "/oficina",
  verificarTipoUsuario([2]),
  reclamosController.buscarReclamosOficina
  //#swagger.description = 'Reclamos por empleado'
); //Reclamos por empleado

router.patch(
  "/estado/:idReclamo/",
  verificarTipoUsuario([2]),
  validarCambioEstado,
  manejarErrores,
  reclamosController.cambiarEstado
  //#swagger.description = 'Cambiar estado de un reclamo'
); // Cambiar estado de un reclamo

export { router };
