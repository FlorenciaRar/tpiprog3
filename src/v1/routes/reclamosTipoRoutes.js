import express from "express";
import ReclamosTipoController from "../../controllers/reclamosTipoController.js";
import { manejarErrores } from "../../middlewares/manejarErrores.js";
import { validarReclamosTipo } from "../../middlewares/validaciones.js";

const router = express.Router();

const reclamosTipoController = new ReclamosTipoController();

router.get("/", reclamosTipoController.buscarTodos);
router.get("/:idReclamoTipo", reclamosTipoController.buscarId);
router.post("/", validarReclamosTipo, manejarErrores, reclamosTipoController.crear);
router.patch("/:idReclamoTipo", manejarErrores, reclamosTipoController.modificar);

export { router };
