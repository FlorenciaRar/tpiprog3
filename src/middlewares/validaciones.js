import { body, param } from "express-validator";

export const validarReclamosEstado = [body("estado").notEmpty().withMessage("El estado es requerido")];

export const validarReclamosTipo = [body("tipo").notEmpty().withMessage("El tipo es requerido")];

export const validarOficinas = [body("nombre").notEmpty().withMessage("El nombre es requerido")];

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
