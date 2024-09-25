import { createPool } from 'mysql2/promise';
import config from '../config.js'

export const conectionDB = async () => {
  try {

    const connection = await createPool({
      host: config.DB_HOST,
      user: config.DB_USER,
      password: config.DB_PASSWORD,
      database: config.DB_NAME
    });
    connection
    console.log("La conexion a la base de datos se ha realizado con exito");
  } catch (error) {
    console.log("Se produjo un error al conectar con la base de datos:", error);
  }
}

