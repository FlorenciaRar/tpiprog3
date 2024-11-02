import express from "express";
import { descargarCSV } from "../../utils/descargarCSV.js";

const router = express.Router();

router.get('/', descargarCSV
  //#swagger.description = 'Descargar CSV'
);

export { router };