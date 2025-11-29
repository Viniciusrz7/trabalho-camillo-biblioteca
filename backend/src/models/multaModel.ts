import { Sequelize, DataTypes } from 'sequelize';

const multaModel = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  const Multa = sequelize.define("multa", {
    emprestimoId: {
      type: dataTypes.INTEGER,
      allowNull: false
    },
    usuarioId: {
      type: dataTypes.INTEGER,
      allowNull: false
    },
    valorMulta: {
      type: dataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    status: {
      type: dataTypes.ENUM('pendente', 'paga', 'cancelada'),
      allowNull: false,
      defaultValue: 'pendente'
    },
    dataPagamento: {
      type: dataTypes.DATE,
      allowNull: true
    },
  });

  return Multa;
};

export default multaModel;
