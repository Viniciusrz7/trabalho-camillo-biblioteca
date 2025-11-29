import { Sequelize, DataTypes } from 'sequelize';

const livroModel = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    const Livro = sequelize.define("livro", {
        titulo: {
            type: dataTypes.STRING,
            allowNull: false
        },
        autor: {
            type: dataTypes.STRING,
            allowNull: false
        },
        editora: {
            type: dataTypes.STRING,
            allowNull: true
        },
        anoPublicacao: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        categoria: {
            type: DataTypes.STRING,
            allowNull: true
        },
        quantidadeTotal: {
            type: dataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        quantidadeDisponivel: {
            type: dataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        localizacao: {
            type: dataTypes.STRING,
            allowNull: true
        }
    });

    return Livro;
};

export default livroModel;
