import express from "express";
import ReclamosEstadoController from "../../controllers/reclamosEstadoController.js";
import { manejarErrores } from "../../middlewares/manejarErrores.js";
import { validarReclamosEstado } from "../../middlewares/validaciones.js";

const router = express.Router();

const reclamosEstadoController = new ReclamosEstadoController();

router.get("/", reclamosEstadoController.buscarTodos
  /*
  #swagger.description = 'Buscar todos los estaodos de los reclamos'
  #swagger.path = '/reclamos'
  */
);
router.get("/:idReclamoEstado", reclamosEstadoController.buscarId
  //#swagger.description = 'Buscar estado de reclamos por ID'
);
router.post("/", validarReclamosEstado, manejarErrores, reclamosEstadoController.crear
  /*
  #swagger.description = 'Crear estado de reclamo'
  #swagger.path = '/reclamos'
  */
);
router.patch("/:idReclamoEstado", manejarErrores, reclamosEstadoController.modificar
  //#swagger.description = 'Modificar estado de reclamo'
);

export { router };
