import { Sequelize, DataTypes } from 'sequelize';

const emprestimoModel = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  const Emprestimo = sequelize.define("emprestimo", {
    usuarioId: {
      type: dataTypes.INTEGER,
      allowNull: false
    },
    livroId: {
      type: dataTypes.INTEGER,
      allowNull: false
    },
    dataEmprestimo: {
      type: dataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    dataPrevistaDevolucao: {
      type: dataTypes.DATE,
      allowNull: false
    },
    dataDevolucao: {
      type: dataTypes.DATE,
      allowNull: true // Null enquanto não devolvido
    },
    status: {
      type: dataTypes.ENUM('ativo', 'devolvido', 'atrasado'),
      allowNull: false,
      defaultValue: 'ativo'
    },
    diasAtraso: {
      type: dataTypes.INTEGER,
      defaultValue: 0
    },
  });
  return Emprestimo;
};

export default emprestimoModel;
