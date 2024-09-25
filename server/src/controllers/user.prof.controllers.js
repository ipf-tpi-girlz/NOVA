import Professional from "../models/user.professional.model.js"
import bcrypt from "bcryptjs"

export const registerProf = async (req, res) => {
    const { name, phone, email, state, city, licenseNumber, password } = req.body

    try {
        //!Validaciones de la base de datos
        const exist = await Professional.find({ email })
        if (exist.length > 0) {
            return res.status(400).send('El correo electrónico que desea ingresar ya se encuentra en nuestro sistema')
        }
        const existMatricula = await Professional.find({ licenseNumber })
        if (existMatricula.length > 0) {
            return res.status(400).send('La matricula que desea ingresar ya se encuentra en nuestro sistema')
        }
        //!Fin validacion 
        //*Encriptacion
        const passHash = await bcrypt.hash(password, 10)
        //*Creacion de usuario
        const newProf = new Professional({ name, phone, email, state, city, licenseNumber, password: passHash })
        await newProf.save()
        res.status(201).send('El registro ha sido un exito')
    } catch (error) {
        console.log(error)
        res.status(500).send('Se produjo un error en el servidor')
    }
}


export const loginProf = async (req, res) => {

}