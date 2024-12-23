import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { validateContentType } from "./src/middlewares/validarContentType.js";
import swaggerUi from "swagger-ui-express";
import swaggerFile  from './src/utils/swagger-output.json' with { type: "json" };
//import swaggerJsdoc from "swagger-jsdoc";
//import { swaggerConfig } from "./src/config/swaggerConfig.js";
import session from "express-session";
import { estrategia, validacion } from "./src/auth/passport-config.js";
import passport from "passport";
import { verificarTipoUsuario } from "./src/middlewares/roleMiddleware.js";

import { router as v1ReclamosEstadoRouter } from "./src/v1/routes/reclamosEstadoRoutes.js";
import { router as v1ReclamosTipoRouter } from "./src/v1/routes/reclamosTipoRoutes.js";
import { router as v1OficinasRouter } from "./src/v1/routes/oficinasRoutes.js";
import { router as v1ReclamosRouter } from "./src/v1/routes/reclamosRoutes.js";
import { router as v1UsuariosRouter } from "./src/v1/routes/usuariosRoutes.js";
import { router as v1EmpleadosRouter } from "./src/v1/routes/empleadosRoutes.js";
import authRoutes from "./src/v1/routes/authRoutes.js";
import { authenticateJWT } from "./src/middlewares/authMiddleware.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());
app.use(helmet());
app.use(validateContentType);

passport.use(estrategia);
passport.use(validacion);
app.use(passport.initialize());

//const swaggerOptions = swaggerConfig;
//const swaggerDocs = swaggerJsdoc(swaggerOptions);

//app.use("/documentacion", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/documentacion', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.get("/", (req, res) => {
  res.json({ estado: "OK" });
});

app.use("/api/v1/", authRoutes);
app.use("/api/v1/reclamos-estado", authenticateJWT, verificarTipoUsuario([1]), v1ReclamosEstadoRouter);
app.use("/api/v1/reclamos-tipo", authenticateJWT, verificarTipoUsuario([1]), v1ReclamosTipoRouter);
app.use("/api/v1/oficinas", authenticateJWT, verificarTipoUsuario([1]), v1OficinasRouter);
app.use("/api/v1/reclamos", authenticateJWT, verificarTipoUsuario([1, 2, 3]), v1ReclamosRouter);
app.use("/api/v1/usuarios", authenticateJWT, verificarTipoUsuario([1, 3]), v1UsuariosRouter);
app.use("/api/v1/empleados", authenticateJWT, verificarTipoUsuario([1]), v1EmpleadosRouter);

const puerto = process.env.PUERTO;
app.listen(puerto, () => {
  console.log(`Estoy escuchando en ${puerto}`);
});
