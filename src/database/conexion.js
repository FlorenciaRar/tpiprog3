import mysql from "mysql2/promise";

// Cambiar a variables .env

export const conexion = await mysql.createConnection({
  host: "localhost",
  user: process.env.USUARIO_DB,
  database: process.env.NOMBRE_DB,
  password: process.env.PASS_DB,
});
