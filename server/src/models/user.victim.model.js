import mongoose from "mongoose";


//*Coleccion/tabla de Victima
const victimSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: { //email
        type: String,
        required: true,
        unique: true
    },
    state: { //departamento
        type: String,
        required: true
    },
    city: { //localidad
        type: String,
        required: true
    },
    password: { //contraseña
        type: String,
        required: true
    },
    role: { //rol
        type: String,
        default: 'victim',
        enum: ['victim'],
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Victim', victimSchema)




