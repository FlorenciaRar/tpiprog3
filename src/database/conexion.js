import mysql from "mysql2/promise";

// Cambiar a variables .env

export const conexion = await mysql.createConnection({
  host: "localhost",
  user: "reclamos",
  database: "reclamos",
  password: "asd123",
});
