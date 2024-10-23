import express from "express";
import ReclamosEstadoController from "../../controllers/reclamosEstadoController.js";
import { manejarErrores } from "../../middlewares/manejarErrores.js";
import { validarReclamosEstado } from "../../middlewares/validaciones.js";

const router = express.Router();

const reclamosEstadoController = new ReclamosEstadoController();

router.get("/", reclamosEstadoController.buscarTodos);
router.get("/:idReclamoEstado", reclamosEstadoController.buscarId);
router.post(
  "/",
  validarReclamosEstado,
  manejarErrores,
  reclamosEstadoController.crear
);
router.patch(
  "/:idReclamoEstado",
  validarReclamosEstado,
  manejarErrores,
  reclamosEstadoController.modificar
);

export { router };
