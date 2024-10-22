import express from "express";
import EmpleadosController from "../../controllers/empleadosController.js";
import { manejarErrores } from "../../middlewares/manejarErrores.js";
import {
  validarEmpleados,
  validarIdEmpleado,
} from "../../middlewares/validaciones.js";
import { verificarTipoUsuario } from "../../middlewares/roleMiddleware.js";

const router = express.Router();

const empleadosController = new EmpleadosController();

router.get("/", verificarTipoUsuario([1]), empleadosController.buscarTodos);
router.get(
  "/:idEmpleado",
  verificarTipoUsuario([1]),
  validarIdEmpleado,
  manejarErrores,
  empleadosController.buscarId
);
router.post(
  "/",
  verificarTipoUsuario([1]),
  validarEmpleados,
  manejarErrores,
  empleadosController.crear
); // checkear que ande
router.patch(
  "/empleados",
  verificarTipoUsuario([1]),
  validarEmpleados,
  manejarErrores,
  empleadosController.modificar
); //chequear que ande

export { router };
