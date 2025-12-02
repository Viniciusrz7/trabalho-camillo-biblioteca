
import { Request, Response } from 'express';
import { Op } from 'sequelize';
import db from '../models';

const Emprestimo = db.Emprestimo;
const Livro = db.Livro;
const Usuario = db.Usuario;
const Multa = db.Multa;

// Relatório de empréstimos ativos
export const relatorioEmprestimosAtivos = async (req: Request, res: Response) => {
  try {
    const emprestimosAtivos = await Emprestimo.findAll({
      where: { status: 'ativo' },
      include: [
        { model: Usuario, attributes: ['id', 'nome', 'email'] },
        { model: Livro, attributes: ['id', 'titulo', 'autor'] }
      ]
    });

    res.status(200).send({
      total: emprestimosAtivos.length,
      emprestimos: emprestimosAtivos
    });
  } catch (error) {
    console.error('Erro ao gerar relatório:', error);
    res.status(500).send({ message: 'Erro ao gerar relatório' });
  }
};

// Relatório de empréstimos atrasados
export const relatorioEmprestimosAtrasados = async (req: Request, res: Response) => {
  try {
    const hoje = new Date();
    
    const emprestimosAtrasados = await Emprestimo.findAll({
      where: {
        status: 'ativo',
        dataPrevistaDevolucao: {
          [Op.lt]: hoje
        }
      },
      include: [
        { model: Usuario, attributes: ['id', 'nome', 'email', 'matricula'] },
        { model: Livro, attributes: ['id', 'titulo', 'autor'] }
      ]
    });

    res.status(200).send({
      total: emprestimosAtrasados.length,
      emprestimos: emprestimosAtrasados
    });
  } catch (error) {
    console.error('Erro ao gerar relatório:', error);
    res.status(500).send({ message: 'Erro ao gerar relatório' });
  }
};

// Relatório de livros mais emprestados
export const relatorioLivrosMaisEmprestados = async (req: Request, res: Response) => {
  try {
    const livros = await Emprestimo.findAll({
      attributes: [
        'livroId',
        [db.sequelize.fn('COUNT', db.sequelize.col('livroId')), 'totalEmprestimos']
      ],
      include: [
        { model: Livro, attributes: ['id', 'titulo', 'autor'] }
      ],
      group: ['livroId'],
      order: [[db.sequelize.fn('COUNT', db.sequelize.col('livroId')), 'DESC']],
      limit: 10
    });

    res.status(200).send(livros);
  } catch (error) {
    console.error('Erro ao gerar relatório:', error);
    res.status(500).send({ message: 'Erro ao gerar relatório' });
  }
};

// Dashboard geral
export const dashboard = async (req: Request, res: Response) => {
  try {
    const totalLivros = await Livro.count();
    const totalUsuarios = await Usuario.count();
    const emprestimosAtivos = await Emprestimo.count({ where: { status: 'ativo' } });
    const multasPendentes = await Multa.count({ where: { status: 'pendente' } });

    res.status(200).send({
      totalLivros,
      totalUsuarios,
      emprestimosAtivos,
      multasPendentes
    });
  } catch (error) {
    console.error('Erro ao gerar dashboard:', error);
    res.status(500).send({ message: 'Erro ao gerar dashboard' });
  }
};
