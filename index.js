import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { validateContentType } from "./src/middlewares/validarContentType.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerConfig } from "./src/config/swaggerConfig.js";

import { router as v1ReclamosEstadoRouter } from "./src/v1/routes/reclamosEstadoRoutes.js";
import { router as v1ReclamosTipoRouter } from "./src/v1/routes/reclamosTipoRoutes.js";
import { router as v1OficinasRouter } from "./src/v1/routes/oficinasRoutes.js";
import { router as v1ReclamosRouter } from "./src/v1/routes/reclamosRoutes.js";
import { router as v1UsuariosRouter } from "./src/v1/routes/usuariosRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());


app.use(cors());
app.use(helmet());
app.use(validateContentType);

const swaggerOptions = swaggerConfig;

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/documentacion', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
  res.json({ estado: "OK" });
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