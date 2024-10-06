import express from "express";
import ReclamosEstadoController from "../../controllers/reclamosEstadoController.js";

const router = express.Router();

const reclamosEstadoController = new ReclamosEstadoController();

router.get("/", reclamosEstadoController.buscarTodos);
router.get("/:idReclamoEstado", reclamosEstadoController.buscarId);
router.post("/", reclamosEstadoController.crear);
router.patch("/:idReclamoEstado", reclamosEstadoController.modificar);

export { router };
