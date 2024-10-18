import express from "express";
import UsuariosController from "../../controllers/usuariosController.js";
import { esAdmin, esCliente } from "../../middlewares/validarUsuarios.js";
import { verificarTipoUsuario } from "../../middlewares/roleMiddleware.js";

const router = express.Router();

const usuariosController = new UsuariosController();

router.get("/", verificarTipoUsuario([1]), usuariosController.buscarTodos);
router.get("/:idUsuario", usuariosController.buscarId);

router.patch("/", esCliente, usuariosController.modificar);

// CRUD EMPLEADOS

// router.get("/empleados", esAdmin, usuariosController.buscarEmpleados);
// router.get("/empleados/:idUsuario", esAdmin, usuariosController.buscarEmpleadosId);
// router.post("/empleados", esAdmin, usuariosController.crearEmpleado); // Crear empleados, validar que usuario sea admin // MODIFICAR EL NOMBRE EN EL RESTO DEL SISTEMA
// router.patch("/empleados", esAdmin, usuariosController.modificarEmpleado);
export { router };
