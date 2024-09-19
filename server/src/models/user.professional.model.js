import mongoose from "mongoose";
const { Schema } = mongoose

//*Coleccion/tabla de Profesional
const professionalSchema = new Schema({
    name: { //nombre y apellido
        type: String,
        required: true
    },
    phone: { //celular
        type: String,
        required: true
    },
    email: {  //email
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
    licenseNumber: { //numero de licencia
        type: String,
        required: true
    },
    password: { //contraseña
        type: String,
        required: true
    },
    role: { //rol
        type: String,
        default: 'professional',
        enum: ['professional'],
        required: true
    }
}, {
    timestamps: true // tiempo de edicion y de creacion
});

export default mongoose.model('Professional', professionalSchema);
