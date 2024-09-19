import bcrypt from "bcryptjs";
import { createToken } from '../healpers/create.jwt.js'
import userInstitutionModel from "../models/user.institution.model.js";
//REGISTRAR 
export const registerInst = async (req, res) => {
    const { name, cuit, phone, state, city, address, email, password, role } = req.body;
    try {
        const exist = await userInstitutionModel.find({ email });
        if (exist.length > 0) {
            return res.status(400).send('El correo electrónico que desea ingresar ya se encuentra en nuestro sistema');
        }
        //*Encriptacion
        const passHash = await bcrypt.hash(password, 10);
        const newInst = {
            name,
            cuit,
            phone,
            state,
            city,
            address,
            email,
            password: passHash,
            role
        };
        //*Creacion de usuario
        await newInst.save()
        res.status(201).send('El registro ha sido un éxito');
    } catch (error) {
        //!manejo de error
        console.error("Error en el registro:", error);
        res.status(500).send('Se produjo un error en el servidor');
    }
};

//LOGUEAR
export const loginInst = async (req, res) => {

}