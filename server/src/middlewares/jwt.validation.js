import jwt from 'jsonwebtoken'
import config from '../config/config.js';

export function validateToken(token) {
    try {
        const data = jwt.verify(token, config.SECRET_KEY);
        return data;
    } catch (error) {
        console.error('Token inválido:', error);
        return null;
    }
}