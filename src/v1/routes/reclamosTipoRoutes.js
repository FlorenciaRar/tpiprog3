import express from "express";
import ReclamosTipoController from "../../controllers/reclamosTipoController.js";

const router = express.Router();

const reclamosTipoController = new ReclamosTipoController();

router.get("/", reclamosTipoController.buscarTodos);
router.get("/:idReclamoTipo", reclamosTipoController.buscarId);
router.post("/", reclamosTipoController.crear);
router.patch("/:idReclamoTipo", reclamosTipoController.modificar);

export { router };
