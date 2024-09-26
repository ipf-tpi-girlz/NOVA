import { Sequelize, DataTypes } from 'sequelize';
import config from '../config.js';
export const sequelize = new Sequelize(
  config.DB_NAME || 'prueba',
  config.DB_USER || 'root',
  config.DB_PASSWORD || '',
  {
    host: config.DB_HOST || 'localhost',
    dialect: config.DB_DIALECT || 'mysql',
  }
);

export const conectionDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
};

export { DataTypes };
