import express from "express";
import ReclamosController from "../../controllers/reclamosController.js";

const router = express.Router();

const reclamosController = new ReclamosController();

router.get("/", reclamosController.buscarTodos);
router.get("/:idReclamo", reclamosController.buscarId);
router.post("/", reclamosController.crear);
router.patch("/:idReclamo", reclamosController.modificar);
router.patch("/:idReclamo/cancelar", reclamosController.cancelar) // Autenticar

// Finalizar reclamo /:idReclamo/finalizar

// Reclamos por usuario /reclamos/usuario

router.get("/oficina/:idUsuario", reclamosController.buscarOficina); // Temporalmente con parametro
// Swagger

/**
 * @swagger
 * /api/reclamos:
 *   get:
 *     summary: Obtiene una lista de todos los reclamos
 *     tags: [Actors]
 *     responses:
 *       200:
 *         description: Lista de reclamos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reclamo'
 *             examples:
 *               ejemplo1:
 *                 summary: Ejemplo de respuesta exitosa
 *                 value:
 *                   - actorId: 1
 *                     firstName: PENELOPE
 *                     lastName: GUINESS
 *                     lastUpdate: 2024-09-12 18:05:18
 *                   - actorId: 2
 *                     firstName: NICK
 *                     lastName: CAGE
 *                     lastUpdate: 2023-10-12 18:36:36
 */
export { router };
