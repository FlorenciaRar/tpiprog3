import express from "express";
import EmpleadosController from "../../controllers/empleadosController.js";
import { manejarErrores } from "../../middlewares/manejarErrores.js";
import { validarEmpleados, validarIdEmpleado } from "../../middlewares/validaciones.js";

const router = express.Router();

const empleadosController = new EmpleadosController();

router.get("/", empleadosController.buscarTodos
  //#swagger.description = 'Buscar todos los empleados'  
);
router.get("/:idEmpleado", validarIdEmpleado, manejarErrores, empleadosController.buscarId
  //#swagger.description = 'Buscar por empleado por ID'  
);
router.post("/", validarEmpleados, manejarErrores, empleadosController.crear
  /*
  #swagger.description = 'Crear empleado'  
  #swagger.path = '/empleados'
  */
);
router.patch("/:idEmpleado", manejarErrores, empleadosController.modificar
  //#swagger.description = 'Modificar empleado'  
);

export { router };
