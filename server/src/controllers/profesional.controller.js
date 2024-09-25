import { createConection } from "../database/db.js";


export const getProfesional = async (req, res) => {

}

export const createProfesional = async (req, res) => {
    const { nombre, apellido, nro_cel, mail, depto, loc, matricula, contrasenia } = req.body;
    //conexion db
    const db = await createConection();

    const existe = await db.query("SELECT * FROM usuarios WHERE matricula = ? and mail = ?", [matricula, mail]);
    if (existe.length > 0) {
        return res.status(400).json({
            msg: `Ya existe un usuario con la matricula ${matricula} o mail ${mail}`
        });
    }

}

