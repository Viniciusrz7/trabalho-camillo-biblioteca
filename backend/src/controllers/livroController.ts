import { Request, Response } from 'express';
import db from '../models/index';
import { IEmprestimo, ILivro } from '../models/types/types';
const Livro = db.Livro;
import { Op } from 'sequelize';

export const cadastrarLivro = async (req: Request, res: Response) => {
   const { titulo, autor, quantidadeTotal, localizacao, categoria, editora, anoPublicacao } = req.body;
  try {
   

    if (!titulo || !autor || quantidadeTotal === undefined) {
      return res.status(400).send({ message: 'Título, autor e quantidade Total são obrigatórios' });
    }

    if (quantidadeTotal <= 0) {
      return res.status(400).send({ message: 'Quantidade Total deve ser maior que zero' });
    }

    if (anoPublicacao && (anoPublicacao < 1000 || anoPublicacao > new Date().getFullYear())) {
      return res.status(400).send({ message: 'Ano de publicação inválido' });
    }

    const novoLivro = await Livro.create({
      titulo,
      autor,
      quantidadeTotal,
      localizacao,
      categoria,
      editora,
      anoPublicacao,
      quantidadeDisponivel: quantidadeTotal
    });

    res.status(201).send(novoLivro);
  } catch (error) {
    console.error('Erro ao cadastrar livro:', error);
    res.status(500).send({ message: 'Erro ao cadastrar livro' });
  }
};

export const listarLivros = async (req: Request, res: Response) => {
  try {
    const livros = await Livro.findAll();
    res.status(200).send(livros);
  } catch (error) {
    console.error('Erro ao listar livros:', error);
    res.status(500).send({ message: 'Erro ao listar livros' });
  }
};


export const buscarLivroPorId = async (req: Request, res: Response) => {
  const livro = await Livro.findByPk(req.params.id);

  try {
    
    if (!livro) {
      return res.status(404).send({ message: 'Livro não encontrado' });

    }

    res.status(200).send(livro);
  } catch (error) {
    console.error('Erro ao buscar livro por ID:', error);
    res.status(500).send({ message: 'Erro ao buscar livro por ID' });
  }
};

export const atualizarLivro = async (req: Request, res: Response) => {
  const livro = await Livro.findByPk(req.params.id);
  try {
    

    if (!livro) {
      return res.status(404).send({ message: 'Livro não encontrado' });
    }

    const { titulo, autor, localizacao, categoria, editora, anoPublicacao } = req.body;

    if (anoPublicacao && (anoPublicacao < 1000 || anoPublicacao > new Date().getFullYear())) {
      return res.status(400).send({ message: 'Ano de publicação inválido' });
    }

    await livro.update({ titulo, autor, localizacao, categoria, editora, anoPublicacao });

    res.status(200).send(livro);
  } catch (error) {
    console.error('Erro ao atualizar livro:', error);
    res.status(500).send({ message: 'Erro ao atualizar livro' });
  }
};

export const deletarLivro = async (req: Request, res: Response) => {
  const livro = await Livro.findByPk(req.params.id);
  try {
    

    if (!livro) {
      return res.status(404).send({ message: 'Livro não encontrado' });
    }

    await livro.destroy();
    res.status(200).send({ message: 'Livro deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar livro:', error);
    res.status(500).send({ message: 'Erro ao deletar livro' });
  }
};

export const buscarLivrosPorTituloOuAutor = async (req: Request, res: Response) => {
  const { query } = req.params;
  try {
    

    if (!query || !query.trim()) {
      return res.status(400).send({ message: 'Parâmetro de busca é obrigatório' });
    }

    const livros = await Livro.findAll({
      where: {
        [Op.or]: [
          { titulo: { [Op.like]: `%${query}%` } }, 
          { autor: { [Op.like]: `%${query}%` } }
        ]
      }
    });

    res.status(200).send(livros);  
  } catch (error) {
    console.error('Erro ao buscar livros por título ou autor:', error);
    res.status(500).send({ message: 'Erro ao buscar livros por título ou autor' });
  }
};

export const buscarLivrosPorCategoria = async (req: Request, res: Response) => {
  const { categoria } = req.params;
  try {
    
    if (!categoria || !categoria.trim()) {
      return res.status(400).send({ message: 'Parâmetro de categoria é obrigatório' });

    }

    const livros = await Livro.findAll({
      where: { categoria: { [Op.like]: `%${categoria}%` } }  
    }) ;

    res.status(200).send(livros);  
  } catch (error) {
    console.error('Erro ao buscar livros por categoria:', error);
    res.status(500).send({ message: 'Erro ao buscar livros por categoria' });
  }
};
export const verificarDisponibilidadeLivro = async (req: Request, res: Response) => {

  const { id } = req.params;
  try {
    const livro = await Livro.findByPk(id, {
      attributes: ['id', 'titulo', 'quantidadeTotal', 'quantidadeDisponivel']
    }) as ILivro | null;

    if (!livro) {
      return res.status(404).send({ message: 'Livro não encontrado' });
    }

     res.status(200).send(livro);

  } catch (error) {
    console.error('Erro ao verificar disponibilidade:', error);
    res.status(500).send({ message: 'Erro ao verificar disponibilidade' });
  }
};
export const verificarLivrosDisponiveis = async (req: Request, res: Response) => {
  const { categoria, autor, titulo } = req.query;
  try {
    
    
    const whereClause: any = {
      quantidadeDisponivel: { [Op.gt]: 0 }
    };

    // Adicionar filtros opcionais se fornecidos
    if (categoria) whereClause.categoria = { [Op.like]: `%${categoria}%` };
    if (autor) whereClause.autor = { [Op.like]: `%${autor}%` };
    if (titulo) whereClause.titulo = { [Op.like]: `%${titulo}%` };

    const livrosDisponiveis = await Livro.findAll({
      where: whereClause,
      attributes: ['id', 'titulo', 'autor', 'quantidadeDisponivel', 'categoria'],
      order: [['quantidadeDisponivel', 'DESC']]
    });

    
    res.status(200).send({
      total: livrosDisponiveis.length,
      livros: livrosDisponiveis,
      message: livrosDisponiveis.length === 0 
        ? 'Nenhum livro disponível com os filtros aplicados' 
        : 'Livros disponíveis recuperados com sucesso'
    });
  } catch (error) {
    console.error('Erro ao verificar livros disponíveis:', error);
    res.status(500).send({ message: 'Erro ao verificar livros disponíveis' });
  }
};