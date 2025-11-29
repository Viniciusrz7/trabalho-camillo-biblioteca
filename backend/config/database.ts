import { Options } from 'sequelize';

const config: Options = {
  dialect: 'sqlite',
  storage: './db/biblioteca.db',
  logging: false // O Sequelize não vai mostrar no console os comandos SQL que ele está executando.
};

export default config;