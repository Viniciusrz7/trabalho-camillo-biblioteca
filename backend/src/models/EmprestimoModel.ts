import { Sequelize, DataTypes } from 'sequelize';

const emprestimoModel = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  const Emprestimo = sequelize.define("emprestimo", {
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    livroId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dataEmprestimo: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    dataPrevistaDevolucao: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dataDevolucao: {
      type: DataTypes.DATE,
      allowNull: true // Null enquanto não devolvido
    },
    status: {
      type: DataTypes.ENUM('ativo', 'devolvido', 'atrasado'),
      allowNull: false,
      defaultValue: 'ativo'
    },
    diasAtraso: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  });  
  return Emprestimo;
};

export default emprestimoModel;
