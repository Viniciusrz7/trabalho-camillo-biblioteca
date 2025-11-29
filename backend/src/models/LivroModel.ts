import { Sequelize, DataTypes } from 'sequelize';

const livroModel = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    const Livro = sequelize.define("livro", {
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        autor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        editora: {
            type: DataTypes.STRING,
            allowNull: true
        },
        anoPublicacao: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        categoria: {
            type: DataTypes.STRING,
            allowNull: true
        },
        quantidadeTotal: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        quantidadeDisponivel: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        localizacao: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    return Livro;
};

export default livroModel;
