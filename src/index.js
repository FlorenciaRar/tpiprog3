import express from "express";
import dotenv from "dotenv";

import { router as v1ReclamoTipoRouter } from "./v1/routes/reclamosTipoRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ estado: true });
});

app.use("/api/v1/reclamos-tipo", v1ReclamoTipoRouter);

const puerto = process.env.PUERTO;
app.listen(puerto, () => {
  console.log(`Estoy escuchando en ${puerto}`);
});

// USUARIOS
// Todos los usuarios
app.get("/usuarios", async (req, res) => {
  try {
    const sql = "SELECT idUsuario, nombre, apellido, correoElectronico FROM usuarios WHERE activo = 1;";
    const [resultado] = await conexion.query(sql);

    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json({
      mensaje: "Ha ocurrido un error",
    });
  }
});

// Usuarios por id
app.get("/usuarios/:idUsuario", async (req, res) => {
  try {
    const idUsuario = req.params.idUsuario;
    const sql = `SELECT idUsuario, nombre, apellido, correoElectronico FROM usuarios WHERE idUsuario = ? AND activo = 1`;
    // no estoy segura de si es necesario chequear el tipousuario en esta sentencia
    const [resultado] = await conexion.query(sql, [idUsuario]);

    if (resultado.length === 0) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
      });
    }
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json({
      mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
    });
  }
});

// Crear usuario (falta autenticacion y autorizacion)

// Modificar usuario
app.patch("/usuarios/:idUsuario", async (req, res) => {
  try {
    const { nombre, apellido, correoElectronico } = req.body;

    if (!nombre) {
      return res.status(400).json({
        mensaje: "Nombre requerido",
      });
    }
    if (!apellido) {
      return res.status(400).json({
        mensaje: "Apellido requerido",
      });
    }
    if (!correoElectronico) {
      return res.status(400).json({
        mensaje: "Correo electronico requerido",
      });
    }

    const idUsuario = req.params.idUsuario;
    const sql = "UPDATE usuarios SET nombre = ? , apellido = ?, correoElectronico = ?  WHERE idUsuario = ? AND activo = 1";
    const [resultado] = await conexion.query(sql, [nombre, apellido, correoElectronico, idUsuario]);

    if (resultado.affectedRows === 0) {
      return res.status(400).json({
        mensaje: "Ocurrió un error modificando los datos del usuario",
      });
    }
    res.status(200).json({
      mensaje: "Datos del ususario modificados con éxito",
    });
  } catch (err) {
    res.status(500).json({
      mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
    });
  }
});

// Eliminar usuario

// Reclamos por usuario
app.get("/usuarios/:idUsuario/reclamos", async (req, res) => {
  try {
    const idUsuario = req.params.idUsuario;
    const sql =
      "SELECT r.asunto, r.descripcion, r.fechaCreado, r.fechaFinalizado, r.fechaCancelado, re.descripcion AS 'reclamoEstado', rt.descripcion AS 'reclamoTipo' FROM reclamos AS r JOIN reclamos_estado AS re ON re.idReclamosEstado = r.idReclamoEstado JOIN reclamos_tipo AS rt ON r.idReclamoTipo = rt.idReclamosTipo WHERE r.idUsuarioCreador = ?";
    const [resultado] = await conexion.query(sql, [idUsuario]);

    if (resultado.length === 0) {
      return res.status(404).json({
        mensaje: "No se han encontrado reclamos para este usuario",
      });
    }
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json({
      mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
    });
  }
});

// Que un usuario cancele un reclamo
app.patch("/usuarios/:idUsuario/reclamos/:idReclamo", async (req, res) => {
  try {
    const idUsuario = req.params.idUsuario;
    const idReclamo = req.params.idReclamo;

    const sql =
      "UPDATE reclamos SET fechaCancelado = NOW() , idReclamoEstado = 3, idUsuarioFinalizador= ? WHERE idReclamo = ? AND idUsuarioCreador = ?";
    const [resultado] = await conexion.query(sql, [idUsuario, idReclamo, idUsuario]);

    if (resultado.affectedRows === 0) {
      return res.status(400).json({
        mensaje: "Ocurrió un error modificando los datos del usuario",
      });
    }
    res.status(200).json({
      mensaje: "Datos del ususario modificados con éxito",
    });
  } catch (err) {
    res.status(500).json({
      mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
    });
  }
});

// RECLAMOS
// Todos los reclamos
app.get("/reclamos", async (req, res) => {
  try {
    const sql =
      "SELECT r.asunto, r.descripcion, r.fechaCreado, r.fechaFinalizado, r.fechaCancelado, re.descripcion AS 'reclamoEstado', rt.descripcion AS 'reclamoTipo' FROM reclamos AS r JOIN reclamos_estado AS re ON re.idReclamosEstado = r.idReclamoEstado JOIN reclamos_tipo AS rt ON r.idReclamoTipo = rt.idReclamosTipo";
    const [resultado] = await conexion.query(sql);

    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json({
      mensaje: "Ha ocurrido un error",
    });
  }
});

// Reclamos por id

// Crear reclamo (autenticar)

// OFICINAS
// Todas las oficinas
app.get("/oficinas", async (req, res) => {
  try {
    const sql = "SELECT idOficina, nombre, idReclamoTipo FROM oficinas WHERE activo = 1;";
    const [resultado] = await conexion.query(sql);

    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json({
      mensaje: "Ha ocurrido un error",
    });
  }
});

// Oficinas por id
app.get("/oficinas/:idOficina", async (req, res) => {
  try {
    const idOficina = req.params.idOficina;
    const sql = "SELECT idOficina, nombre, idReclamoTipo FROM oficinas WHERE idOficina = ? AND activo = 1;";
    const [resultado] = await conexion.query(sql, [idOficina]);

    if (resultado.length === 0) {
      return res.status(404).json({
        mensaje: "Oficina no encontrada",
      });
    }
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json({
      mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
    });
  }
});

// Crear oficina
app.post("/oficinas", async (req, res) => {
  try {
    const { nombre, idReclamoTipo } = req.body;

    if (!nombre) {
      return res.status(400).json({
        mensaje: "Nombre requerido",
      });
    }
    if (!idReclamoTipo) {
      return res.status(400).json({
        mensaje: "Tipo de reclamo requerido",
      });
    }
    // Habria que verificar si el idReclamoTipo existe?

    const sql = "INSERT INTO oficinas (nombre, idReclamoTipo, activo) VALUES  ?, ? , 1;";
    const [resultado] = await conexion.query(sql, [nombre, idReclamoTipo]);

    if (resultado.affectedRows === 0) {
      return res.status(400).json({
        mensaje: "Ocurrió un error creando la oficina",
      });
    }
    res.status(201).json({
      mensaje: "Oficina creada con éxito",
    });
  } catch (err) {
    res.status(500).json({
      mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
    });
  }
});

// Reclamos por oficina

// Eliminar oficina

// Ver trabajadores de una oficina

// Asignar trabajadores a una oficina

// Sacar trabajadores a una oficina

// RECLAMOS-TIPO

// app.use('/reclamo-tipo', routerReclamoTipo)
// router.get('/', reclamoTipoController.getReclamoTipo)
// exports.getReclamoTipo = async (rec, res) y aca recien va el try catch

// // Todos los reclamos -tipo
// app.get("/reclamos-tipo", async (req, res) => {
//   try {
//     const sql = "SELECT idReclamosTipo, descripcion FROM reclamos_tipo WHERE activo = 1";
//     const [resultado] = await conexion.query(sql);

//     res.status(200).json(resultado);
//   } catch (err) {
//     res.status(500).json({
//       mensaje: "Ha ocurrido un error",
//     });
//   }
// });

// // Reclamo-tipo por id
// app.get("/reclamos-tipo/:idReclamosTipo", async (req, res) => {
//   try {
//     const idReclamosTipo = req.params.idReclamosTipo;
//     const sql = `SELECT * FROM reclamos_tipo WHERE  idReclamosTipo = ? AND activo = 1`;
//     const [resultado] = await conexion.query(sql, [idReclamosTipo]);

//     if (resultado.length === 0) {
//       return res.status(404).json({
//         mensaje: "Tipo de reclamo no encontrado",
//       });
//     }
//     res.status(200).json(resultado);
//   } catch (err) {
//     res.status(500).json({
//       mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
//     });
//   }
// });

// // Crear reclamo tipo
// app.post("/reclamos-tipo", async (req, res) => {
//   try {
//     const { descripcion } = req.body;

//     if (!descripcion) {
//       return res.status(400).json({
//         mensaje: "Descripción requerida",
//       });
//     }

//     const sql = "INSERT INTO reclamos_tipo (descripcion, activo) VALUES  ? , 1;";
//     const [resultado] = await conexion.query(sql, [descripcion]);

//     if (resultado.affectedRows === 0) {
//       return res.status(400).json({
//         mensaje: "Ocurrió un error creando el tipo de reclamo",
//       });
//     }
//     res.status(201).json({
//       mensaje: "Tipo de reclamo creado con éxito",
//     });
//   } catch (err) {
//     res.status(500).json({
//       mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
//     });
//   }
// });

// // Modificar un reclamo tipo
// app.patch("/reclamos-tipo/:idReclamosTipo", async (req, res) => {
//   try {
//     const { descripcion, activo } = req.body;

//     if (!descripcion) {
//       return res.status(400).json({
//         mensaje: "Descripción requerida",
//       });
//     }
//     if (activo === undefined || activo === null) {
//       return res.status(400).json({
//         mensaje: "Activo requerido",
//       });
//     }

//     const idReclamosTipo = req.params.idReclamosTipo;
//     const sql = "UPDATE reclamos_tipo SET descripcion = ? , activo = ?  WHERE idReclamosTipo = ? AND activo = 1";
//     const [resultado] = await conexion.query(sql, [descripcion, activo, idReclamosTipo]);

//     if (resultado.affectedRows === 0) {
//       return res.status(400).json({
//         mensaje: "Ocurrió un error modificando el tipo de reclamo",
//       });
//     }
//     res.status(200).json({
//       mensaje: "Tipo de reclamo modificado con éxito",
//     });
//   } catch (err) {
//     res.status(500).json({
//       mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
//     });
//   }
// });

// Desactivar un reclamo tipo (PREGUNTAR)

// EMPLEADOS
// Todos los empleados
app.get("/empleados", async (req, res) => {
  try {
    const sql = "SELECT idUsuario, nombre, apellido, correoElectronico FROM usuarios WHERE idTipoUsuario = 2 AND activo = 1;";
    const [resultado] = await conexion.query(sql);

    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json({
      mensaje: "Ha ocurrido un error",
    });
  }
});

// Empleado por id
app.get("/empleados/:idEmpleado", async (req, res) => {
  try {
    const idEmpleado = req.params.idEmpleado;
    const sql = `SELECT idUsuario, nombre, apellido, correoElectronico FROM usuarios WHERE idTipoUsuario = 2 AND idUsuario = ? AND activo = 1`;
    const [resultado] = await conexion.query(sql, [idEmpleado]);

    if (resultado.length === 0) {
      return res.status(404).json({
        mensaje: "Empleado no encontrado",
      });
    }
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json({
      mensaje: "Ha ocurrido un error. Intentelo de nuevo más tarde",
    });
  }
});

// Cambiar el tipo de usuario a empleado (¿Doble consulta en el mismo endpoint?)
// Tipo al hacer un post 1ro: le cambia el tipo usuario a empleado 2do: lo mete en usuarios-oficinas

app.post("/oficinas/:idOficina/:idEmpleado", async (req, res) => {});

// Cambiar el tipo de usuario a usuario
// Hace lo inverso, lo saca de la oficina y le cambia el tipo
