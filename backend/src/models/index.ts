import { Sequelize, DataTypes } from 'sequelize';
import config from '../config/database';
import usuarioModel from './usuarioModel';
import livroModel from './LivroModel';
import emprestimoModel from './EmprestimoModel';
import multaModel from './multaModel';

const sequelize = new Sequelize(config);

const db = {
  sequelize,
  Sequelize,
  Usuario: usuarioModel(sequelize, DataTypes),
  Livro: livroModel(sequelize, DataTypes),
  Emprestimo: emprestimoModel(sequelize, DataTypes),
  Multa: multaModel(sequelize, DataTypes)
};

// Relacionamentos
// Um usuário pode ter vários empréstimos
db.Usuario.hasMany(db.Emprestimo, { foreignKey: 'usuarioId' });
// Cada empréstimo pertence a um usuário
db.Emprestimo.belongsTo(db.Usuario, { foreignKey: 'usuarioId' });

// Um livro pode ter vários empréstimos 
db.Livro.hasMany(db.Emprestimo, { foreignKey: 'livroId' });
// Cada empréstimo pertence a um livro
db.Emprestimo.belongsTo(db.Livro, { foreignKey: 'livroId' });

// Um empréstimo pode ter uma multa 
db.Emprestimo.hasOne(db.Multa, { foreignKey: 'emprestimoId' });
// Cada multa pertence a um empréstimo
db.Multa.belongsTo(db.Emprestimo, { foreignKey: 'emprestimoId' });

// Um usuário pode ter várias multas
db.Usuario.hasMany(db.Multa, { foreignKey: 'usuarioId' });
// Cada multa pertence a um usuário
db.Multa.belongsTo(db.Usuario, { foreignKey: 'usuarioId' });

export default db;
