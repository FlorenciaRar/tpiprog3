import UsuariosService from "../services/usuariosService.js";

const service = new UsuariosService();

export const autenticado = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).send({ mensaje: "No autorizado" });
  }
};

export const esAdmin = async (req, res, next) => {
  if (req.isAuthenticated()) {
    try {
      const usuario = await service.buscarId(req.session.passport.user);
      if (usuario.idUsuarioTipo === 1) {
        return next();
      } else {
        return res.status(403).send({ mensaje: "Acceso denegado, debe ser admin" });
      }
    } catch (error) {
      return res.status(500).send({ mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde" });
    }
  } else {
    return res.status(401).send({ mensaje: "No autorizado, debe iniciar sesión" });
  }
};

export const esEmpleado = async (req, res, next) => {
  if (req.isAuthenticated()) {
    try {
      const usuario = await service.buscarId(req.session.passport.user);
      if (usuario.idUsuarioTipo === 2) {
        return next();
      } else {
        return res.status(403).send({ mensaje: "Acceso denegado, debe ser empleado" });
      }
    } catch (error) {
      return res.status(500).send({ mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde" });
    }
  } else {
    return res.status(401).send({ mensaje: "No autorizado, debe iniciar sesión" });
  }
};

export const esCliente = async (req, res, next) => {
  if (req.isAuthenticated()) {
    try {
      const usuario = await service.buscarId(req.session.passport.user);
      if (usuario.idUsuarioTipo === 3) {
        return next();
      } else {
        return res.status(403).send({ mensaje: "Acceso denegado, debe ser cliente" });
      }
    } catch (error) {
      return res.status(500).send({ mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde" });
    }
  } else {
    return res.status(401).send({ mensaje: "No autorizado, debe iniciar sesión" });
  }
};
