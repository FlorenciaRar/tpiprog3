import express from "express";
import UsuariosController from "../../controllers/usuariosController.js";
import { verificarTipoUsuario } from "../../middlewares/roleMiddleware.js";
import { manejarErrores } from "../../middlewares/manejarErrores.js";
import { validarIdUsuario, validarUsuarios } from "../../middlewares/validaciones.js";
import { authenticateJWT } from "../../middlewares/authMiddleware.js";
import multer from 'multer';
import { storage } from '../../config/multer.js';

const router = express.Router();

const usuariosController = new UsuariosController();

const upload = multer( { storage } );

router.get("/", authenticateJWT, verificarTipoUsuario([1]), usuariosController.buscarTodos
/*#swagger.description = 'Buscar todos los usuarios'
  #swagger.path = '/usuarios'
*/
);
router.get("/:idUsuario", authenticateJWT, verificarTipoUsuario([1]), validarIdUsuario, manejarErrores, usuariosController.buscarId
//#swagger.description = 'Buscar usuario por ID'
);
router.post("/", authenticateJWT, verificarTipoUsuario([1]), validarUsuarios, manejarErrores, usuariosController.crear
/*
#swagger.description = 'Crear usuario'
#swagger.path = '/usuarios'
*/
);
router.patch("/:idUsuario", authenticateJWT, upload.single('imagen'), verificarTipoUsuario([1, 3]), manejarErrores, usuariosController.modificar
/*
#swagger.description = 'Modificar usuario'
#swagger.path = '/usuarios'
*/
);

export { router };
