import { Sequelize, DataTypes } from 'sequelize';

const usuarioModel = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    const Usuario = sequelize.define("usuario", {
        nome: {
            type: dataTypes.STRING,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
        },
        senha: {
            type: dataTypes.STRING,
            allowNull: false
        },
        tipo: {
            type: dataTypes.ENUM('admin', 'bibliotecario', 'aluno'),
            allowNull: false,
            defaultValue: 'aluno'
        },
        matricula: {
            type: dataTypes.STRING,
            allowNull: true, // Só para alunos
            unique: true
        },
        ativo: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        }
    });
    return Usuario;
};

export default usuarioModel;
