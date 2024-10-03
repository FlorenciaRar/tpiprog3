import express from "express";
import ReclamosTipoController from "../../controllers/reclamosTipoController.js";

const router = express.Router();

const reclamosTipoController = new ReclamosTipoController();

router.get("/", reclamosTipoController.buscarTodos);
router.get("/:id", reclamosTipoController.buscarId);
router.post("/", reclamosTipoController.crear);
router.patch("/:id", reclamosTipoController.modificar);
router.delete("/:id", reclamosTipoController.eliminar);

export { router };
