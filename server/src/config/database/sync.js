import { Profesional } from "../../models/profesional.js";
import { Localidad } from "../../models/localidades.js";
import { Usuario } from "../../models/users.js";
import { Departamento } from "../../models/departamentos.js";
import { sequelize } from "../../config/database/db.js";
import { Institucion } from "../../models/institucion.js";


export const tablesAndRelation = async () => {
    // Relación: Un Departamento tiene muchas Localidades
    Departamento.hasMany(Localidad, {
        foreignKey: 'departamento_id',
        as: 'localidades'
    });

    // Relación: Una Localidad pertenece a un Departamento
    Localidad.belongsTo(Departamento, {
        foreignKey: 'departamento_id',
        as: 'departamento'
    });

    // Relación: Una Localidad tiene muchos Usuarios
    Localidad.hasMany(Usuario, {
        foreignKey: 'localidad_id',
        as: 'usuarios'
    });

    // Relación: Un Usuario pertenece a una Localidad
    Usuario.belongsTo(Localidad, {
        foreignKey: 'localidad_id',
        as: 'localidad'
    });

    // Relación: Un Usuario tiene una relación uno a uno con un Profesional
    Usuario.hasOne(Profesional, {
        foreignKey: 'usuario_id',
        as: 'profesional'
    });

    // Relación: Un Profesional pertenece a un Usuario
    Profesional.belongsTo(Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuario'
    });

    // Relación: Un Usuario tiene una relación uno a uno con una Institución
    Usuario.hasOne(Institucion, {
        foreignKey: 'usuario_id',
        as: 'institucion'
    });

    // Relación: Una Institución pertenece a un Usuario
    Institucion.belongsTo(Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuario'
    });
    try {
        await sequelize.sync({ force: false })
        console.log('Sincronizado correctamente');
    } catch (error) {
        console.log('se produjo un error al sincronizar', error)
    }
}