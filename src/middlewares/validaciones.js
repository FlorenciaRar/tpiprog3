import { body, check, param } from "express-validator";

export const validarReclamosEstado = [body("descripcion").notEmpty().withMessage("La descripcion es requerida")];

export const validarReclamosTipo = [body("descripcion").notEmpty().withMessage("La descripcion requerido")];

export const validarOficinas = [
  body("nombre").notEmpty().withMessage("El nombre es requerido"),
  body("idReclamoTipo").notEmpty().withMessage("El nombre es requerido"),
];

export const validarReclamos = [
  body("asunto").notEmpty().withMessage("El asunto es requerido"),
  body("descripcion").notEmpty().withMessage("La descripción es requerida"),
  body("idReclamoTipo").notEmpty().withMessage("El tipo de reclamo es requerido"),
];

export const validarIdReclamo = [param("idReclamo").notEmpty().withMessage("El id del reclamo es requerido")];

export const validarUsuarios = [
  body("nombre").notEmpty().withMessage("El nombre es requerido"),
  body("apellido").notEmpty().withMessage("El apellido es requerido"),
  body("correoElectronico").isEmail().withMessage("Correo electrónico inválido"),
  body("contrasenia").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
];

export const validarIdUsuario = [param("idUsuario").notEmpty().withMessage("El id del usuario es requerido")];

export const validarEmpleados = [
  body("nombre").notEmpty().withMessage("El nombre es requerido"),
  body("apellido").notEmpty().withMessage("El apellido es requerido"),
  body("correoElectronico").isEmail().withMessage("Correo electrónico inválido"),
  body("contrasenia").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
];

export const validarIdEmpleado = [param("idEmpleado").notEmpty().withMessage("El id del reclamo es requerido")];

export const validarAgregarQuitarEmpleado = [
  body("idOficina").notEmpty().withMessage("El idOficina es requerido"),
  body("empleados").isArray({ min: 1 }).withMessage("El campo empleados no puede estar vacío"),
];

export const validarCambioEstado = [
  body("idReclamoEstado").notEmpty().withMessage("El campo no puede estar vacío").not().equals("3").withMessage("Estado no válido"),
];

export const validarCambioContrasenia = [body("contrasenia").notEmpty().withMessage("El campo no puede estar vacío")];
