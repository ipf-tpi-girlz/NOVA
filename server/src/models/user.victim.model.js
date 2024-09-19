import mongoose from "mongoose";
const { Schema } = mongoose

//*Coleccion/tabla de Victima
const victimSchema = new Schema({
    name: { //nombre y apellido
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
    timestamps: true // crea tiempo de edicion y creacion
});

export default mongoose.model('Victim', victimSchema);
