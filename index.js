import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { validateContentType } from "./src/middlewares/validarContentType.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerConfig } from "./src/config/swaggerConfig.js";
import session from "express-session";
import passport from "./src/auth/passport-config.js";
import jwtPassport from "./src/auth/jwt-config.js"; // Importa la configuración de JWT
import { verificarTipoUsuario } from "./src/middlewares/roleMiddleware.js"; // Importa el middleware de roles

import { router as v1ReclamosEstadoRouter } from "./src/v1/routes/reclamosEstadoRoutes.js";
import { router as v1ReclamosTipoRouter } from "./src/v1/routes/reclamosTipoRoutes.js";
import { router as v1OficinasRouter } from "./src/v1/routes/oficinasRoutes.js";
import { router as v1ReclamosRouter } from "./src/v1/routes/reclamosRoutes.js";
import { router as v1UsuariosRouter } from "./src/v1/routes/usuariosRoutes.js";
import authRoutes from "./src/v1/routes/authRoutes.js";
import { authenticateJWT } from "./src/middlewares/authMiddleware.js";

dotenv.config(); // Asegúrate de que dotenv se configura al inicio

const app = express();
app.use(express.json());

app.use(cors());
app.use(helmet());
app.use(validateContentType);

app.use(
  session({
    secret: "claveSecreta",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const swaggerOptions = swaggerConfig;
const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use("/documentacion", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
  res.json({ estado: "OK" });
});

app.use("/api/v1", authRoutes);
app.use("/api/v1/reclamos-estado", authenticateJWT, verificarTipoUsuario([1]), v1ReclamosEstadoRouter);
app.use("/api/v1/reclamos-tipo", authenticateJWT, verificarTipoUsuario([1]), v1ReclamosTipoRouter);
app.use("/api/v1/oficinas", authenticateJWT, verificarTipoUsuario([1]), v1OficinasRouter);
app.use("/api/v1/reclamos", authenticateJWT, verificarTipoUsuario([1, 2, 3]), v1ReclamosRouter);
app.use("/api/v1/usuarios", authenticateJWT, verificarTipoUsuario([1]), v1UsuariosRouter);

const puerto = process.env.PUERTO;
app.listen(puerto, () => {
  console.log(`Estoy escuchando en ${puerto}`);
});
