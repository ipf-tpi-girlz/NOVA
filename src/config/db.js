import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/proyecto", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("base de datos conectada");
  } catch (error) {
    console.error("error al conectar la base de datos: ", error.message);
  }
}
