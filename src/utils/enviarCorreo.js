import dotenv from "dotenv";
import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

export const enviarCorreo = async (datosReclamo) => {
  const filename = fileURLToPath(import.meta.url);
  const dir = path.dirname(`${filename}`);

  const plantilla = fs.readFileSync(path.join(dir + "/plantillaCorreo.hbs"), "utf-8");

  const template = handlebars.compile(plantilla);

  const datos = {
    idReclamo: datosReclamo.idReclamo,
    nombre: datosReclamo.usuarioCreador,
    asunto: datosReclamo.asunto,
    descripcion: datosReclamo.descripcion !== null ? datosReclamo.descripcion : "Sin descripción",
    estado: datosReclamo.reclamoEstado,
  };

  const correoHtml = template(datos);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USUARIO,
      pass: process.env.EMAIL_CLAVE,
    },
    tls: { rejectUnauthorized: false },
  });

  const mailOptions = {
    to: datosReclamo.correoElectronico,
    subject: "Cambio de estado en su reclamo",
    html: correoHtml,
  };

  try {
    transporter.sendMail(mailOptions);
    return { estado: true, mensaje: "Se envió el correo electronico" };
  } catch (error) {
    return { estado: false, mensaje: "Correo electrónico no enviado.", error: error, datos: datosReclamo };
  }
};
