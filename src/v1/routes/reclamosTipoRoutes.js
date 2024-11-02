import express from "express";
import ReclamosTipoController from "../../controllers/reclamosTipoController.js";
import { manejarErrores } from "../../middlewares/manejarErrores.js";
import { validarReclamosTipo } from "../../middlewares/validaciones.js";

const router = express.Router();

const reclamosTipoController = new ReclamosTipoController();

router.get("/", reclamosTipoController.buscarTodos
  /*
  #swagger.description = 'Buscar todos los tipos de reclamo'
  #swagger.path = '/reclamos-tipo'
  */
);
router.get("/:idReclamoTipo", reclamosTipoController.buscarId
  //#swagger.description = 'Buscar reclamo por ID'
);
router.post("/", validarReclamosTipo, manejarErrores, reclamosTipoController.crear
  /*
    #swagger.description = 'Crear tipo de reclamo'
    #swagger.path = '/reclamos-tipo'
  */
);
router.patch("/:idReclamoTipo", manejarErrores, reclamosTipoController.modificar
  //#swagger.description = 'Modificar un tipo de reclamo'
);

export { router };
