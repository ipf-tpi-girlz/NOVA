import jwt from 'jsonwebtoken'
import config from '../config/config.js';

export function validateToken(token) {
    try {
        //*Extrae datos del token
        const data = jwt.verify(token, config.SECRET_KEY);
        //*Envia los datos del token
        return data;
    } catch (error) {
        //!Manejo de errores
        console.error('Token inválido:', error);
        return null;
    }
}