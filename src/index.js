import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import { router as v1ReclamosEstadoRouter } from "./v1/routes/reclamosEstadoRoutes.js";
import { router as v1ReclamosTipoRouter } from "./v1/routes/reclamosTipoRoutes.js";
import { router as v1OficinasRouter } from "./v1/routes/oficinasRoutes.js";
import { router as v1ReclamosRouter } from "./v1/routes/reclamosRoutes.js";
import { router as v1UsuariosRouter } from "./v1/routes/usuariosRoutes.js";
import { swaggerConfig } from "./config/swaggerConfig.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());
app.use(helmet());

const swaggerOptions = swaggerConfig;

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/documentacion', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
  res.json({ estado: true });
});

app.use("/api/v1/reclamos-estado", v1ReclamosEstadoRouter);
app.use("/api/v1/reclamos-tipo", v1ReclamosTipoRouter);
app.use("/api/v1/oficinas", v1OficinasRouter);
app.use("/api/v1/reclamos", v1ReclamosRouter);
app.use("/api/v1/usuarios", v1UsuariosRouter);




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

// app.post("/oficinas/:idOficina/:idEmpleado", async (req, res) => {});

// Cambiar el tipo de usuario a usuario
// Hace lo inverso, lo saca de la oficina y le cambia el tipo
