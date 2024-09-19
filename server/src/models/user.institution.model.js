import mongoose from "mongoose";

const { Schema } = mongoose


const institutionSchema = new Schema({
    name: { //nombre de la institución
        type: String,
        required: true
    },
    cuit: { //cuit
        type: String,
        required: true,
        unique: true
    },
    phone: { //celular
        type: String,
        required: true
    },
    state: { //departamento
        type: String,
        required: true
    },
    city: { //localidad
        type: String,
        required: true
    },
    address: { //calle y altura
        type: String,
        required: true
    },
    email: { //email
        type: String,
        required: true,
        unique: true
    },
    password: { //contraseña
        type: String,
        required: true
    },
    role: { //rol 
        type: String,
        default: 'institution',
        enum: ['institution'],
        required: true
    }
}, {
    timestamps: true // para registrar fechas
});

module.exports = mongoose.model('Institution', institutionSchema);
