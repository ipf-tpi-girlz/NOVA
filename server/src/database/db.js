import mongoose from 'mongoose'

export const conectionDB = async () => {
    try {
        mongoose.connect("mongodb://localhost:27017/nova")
        console.log("Base de datos conectada")
    } catch (error) {
        console.log(error)
    }
}