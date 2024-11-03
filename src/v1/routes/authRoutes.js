import express from "express";
import { login } from "../../controllers/authController.js";
import { validarLogin } from "../../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/login", validarLogin, login
  //#swagger.description = 'Login'  
 );

export default router;
