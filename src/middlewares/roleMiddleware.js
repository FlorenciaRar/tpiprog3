export const verificarTipoUsuario = (tiposPermitidos) => {
  return (req, res, next) => {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ mensaje: "No autorizado" });
    }

    if (!tiposPermitidos.includes(user.idUsuarioTipo)) {
      return res.status(403).json({ mensaje: "Acceso denegado" });
    }

    next();
  };
};
