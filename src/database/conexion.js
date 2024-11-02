import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const conexion = await mysql.createConnection({
  //para GG
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  database: process.env.DB,
  password: process.env.PASS_DB,

  //el resto
  /*  
  host: "localhost",
  user: process.env.USUARIO_DB,
  database: process.env.NOMBRE_DB,
  password: process.env.PASS_DB,
  */
});
