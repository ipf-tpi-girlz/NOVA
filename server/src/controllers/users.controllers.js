import { Localidad } from '../models/localidades.js';
import { Departamento } from '../models/departamentos.js';
import { Usuario } from '../models/users.js';
import { Profesional } from '../models/profesional.js';
import { Institucion } from '../models/institucion.js';
import bcrypt from 'bcryptjs';
import { createToken } from '../healpers/create.jwt.js';


//Funcion para registrar un usuario
export const registerUser = async (req, res) => {
    try {
        const { role, nombre, mail, departamento, localidad, contrasenia, nro_telefono, nro_matricula, cuit, razon_social, direccion } = req.body;

        if (!['victima', 'profesional', 'institucion'].includes(role)) {
            return res.status(400).json({ error: 'Rol no válido' });
        }

        const dep = await Departamento.findOne({ where: { nombre: departamento } });
        if (!dep) return { error: 'Departamento no encontrado' };

        const loc = await Localidad.findOne({ where: { nombre: localidad, departamento_id: dep.id } });
        if (!loc) return { error: 'Localidad no encontrada' };

        const exist = await Usuario.findOne({ where: { mail } });
        if (exist) return res.status(400).json({ error: 'El usuario ya existe registrado en nuestro sistema' });

        const hashedPassword = await bcrypt.hash(contrasenia, 10);
        const usuario = await Usuario.create({
            nombre,
            razon_social,
            mail,
            localidad_id: loc.id,
            contrasenia: hashedPassword,
            nro_telefono,
            role,
        });

        if (role === 'profesional') {
            await Profesional.create({ usuario_id: usuario.id, nro_matricula });
        }
        if (role === 'institucion') {
            await Institucion.create({ usuario_id: usuario.id, cuit, direccion });
        }

        res.status(201).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} registrado exitosamente`, usuario: { id: usuario.id, mail: usuario.mail, role: usuario.role } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

//Funcion para iniciar sesion
export const loginUser = async (req, res) => {
    const { mail, contrasenia } = req.body;

    try {
        // Verificar si el usuario existe
        const usuario = await Usuario.findOne({ where: { mail } });
        if (!usuario) {
            return res.status(400).send('El correo electronico ingresado no existe');
        }
        // Verificar la contraseña
        const match = await bcrypt.compare(contrasenia, usuario.contrasenia);
        if (!match) {
            return res.status(400).send('La contrasenia es incorrecta');
        }
        //* Crear el token usando la función que ya tienes
        const token = await createToken(usuario.id);
        req.session.token = token
        //! Establecer la cookie con el token
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 24 * 60 * 60 * 1000,
        })
        res.status(200).send('Inicio de sesion exitoso');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
};

//Funcion para cerrar la sesión
export const logout = (req, res) => {
    try {
        if (!req.session) {
            return res.status(400).json({ message: "No hay ninguna sesión activa" });
        }

        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error al cerrar sesión" });
            }

            res.clearCookie("authToken");
            return res.json({ message: "Logout exitoso" });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error inesperado" });
    }
};

//Funcion para proteger las rutas
export const secureAccess = (req, res) => {
    try {
        // Verificar si el usuario está autenticado
        if (!req.user) {
            return res.status(401).send("Acceso denegado: usuario no autenticado");
        }

        // Si el usuario está autenticado, devolver información
        return res.json("Acceso permitido a la zona protegida");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
};


