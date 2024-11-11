import express from "express";
import OficinasController from "../../controllers/oficinasController.js";
import { manejarErrores } from "../../middlewares/manejarErrores.js";
import {
  validarAgregarQuitarEmpleado,
  validarOficinas,
} from "../../middlewares/validaciones.js";

const router = express.Router();

const oficinasController = new OficinasController();

router.get(
  "/",
  oficinasController.buscarTodos
  /*
  #swagger.description = 'Buscar todas la oficinas'  
  #swagger.path = '/oficinas'
  */
);

router.get(
  "/:idOficina",
  oficinasController.buscarId
  //#swagger.description = 'Buscar oficina por ID'
);

router.post(
  "/",
  validarOficinas,
  manejarErrores,
  oficinasController.crear
  /*
  #swagger.description = 'Crear oficina'
  #swagger.path = '/oficinas'
  */
);

router.patch(
  "/:idOficina",
  manejarErrores,
  oficinasController.modificar
  //#swagger.description = 'Modificar oficina'
);

router.get(
  "/:idOficina/empleados/",
  oficinasController.buscarEmpleados
  //#swagger.description = 'Empleaddos por oficina'
); // Empleados por oficina

router.post(
  "/agregar/empleados/",
  validarAgregarQuitarEmpleado,
  manejarErrores,
  oficinasController.agregarEmpleados
  //#swagger.description = 'Agregar empleado a oficina'
); // Agregar empleado a oficina

router.patch(
  "/quitar/empleados/",
  validarAgregarQuitarEmpleado,
  manejarErrores,
  oficinasController.quitarEmpleados
  //#swagger.description = 'Quitar empleado de oficina'
); // Quitar empleado de oficina

router.get(
  "/estadisticas/usuariosPorOficina",
  oficinasController.contarUsuariosPorOficina
);

export { router };
