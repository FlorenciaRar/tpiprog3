import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path  from 'path';
import { fileURLToPath } from 'url';  

dotenv.config();

export const enviarCorreo = (idReclamo, reclamo)=>{
    const filename = fileURLToPath(import.meta.url);
    const dir = path.dirname(`${filename}`);
    
    const plantilla = fs.readFileSync(path.join(dir + '/plantillaCorreo.hbs'), 'utf-8');

    const template = handlebars.compile(plantilla);

    const datosReclamo = {
        idReclamo,
        nombre: reclamo.usuarioCreador,
        asunto: reclamo.asunto,
        descripcion: reclamo.descripcion !== null ? reclamo.descripcion : 'Sin descripción',
        estado: reclamo.reclamoEstado
    }

    const correoHtml = template(datosReclamo);

    const transporter = nodemailer.createTransport({ 
        service: 'gmail',
        auth:{
            user: process.env.EMAIL_USUARIO, 
            pass: process.env.EMAIL_CLAVE
        },
        tls : { rejectUnauthorized: false }
    });

    const mailOptions = {
        to: reclamo.correoElectronico,
        subject: "Cambio de estado en su reclamo",
        html: correoHtml,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("ERROR", error);
        } else {
            res.json({'estado': "OK"});
        }
    });
}