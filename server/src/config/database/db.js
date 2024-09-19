import mongoose from "mongoose";
import config from "../config.js";

export async function conectionDB() {
  try {
    await mongoose.connect(`mongodb://localhost:27017/${config.DB_NAME}`, {
      //!le saque porque se generaban errores
    });
    console.log("base de datos conectada");
  } catch (error) {
    console.error("error al conectar la base de datos: ", error.message);
  }
}
