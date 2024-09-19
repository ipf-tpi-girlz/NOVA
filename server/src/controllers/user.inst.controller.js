import bcryptjs from "bcryptjs";
import { createToken } from '../healpers/create.jwt.js'
import UserInstitution from "../models/user.institution.model.js";

//REGISTRAR 
export const registerInst = async (req, res) => {
    const { companyName, cuit, phone, state, city, address, email, password, role } = req.body

}

//LOGUEAR
export const loginInst = async (req, res) => {

}