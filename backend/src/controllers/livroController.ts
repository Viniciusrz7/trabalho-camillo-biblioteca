import { Request, Response } from 'express';
import { Op } from 'sequelize';
import db from '../models/index';
const Livro = db.Livro;

export const cadastrarLivro = async (req: Request, res: Response) => {

    try {
        const { titulo, autor, quantidadeTotal, localizacao, categoria, editora, anoPublicacao } = req.body;

        if (!titulo || !autor || quantidadeTotal === undefined) {
            return res.status(400).send({ message: 'Título, autor e quantidade Total são obrigatórios' });
        }
        if (quantidadeTotal <= 0) {
            return res.status(400).send({ message: 'Quantidade Total não pode ser negativa' });
        }
        if (anoPublicacao && (anoPublicacao < 0 || anoPublicacao > new Date().getFullYear())) {
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
    try {
        if (!req.params.id) {
            return res.status(400).send({ message: 'ID do livro é obrigatório' });
        }
        const livro = await Livro.findByPk(req.params.id);
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
    try {
        if (!req.params.id) {
            return res.status(400).send({ message: 'ID do livro é obrigatório' });
        }
        const livro = await Livro.findByPk(req.params.id);
        if (!livro) {
            return res.status(404).send({ message: 'Livro não encontrado' });
        }
        const { titulo, autor, localizacao, categoria, editora, anoPublicacao } = req.body;
        if (anoPublicacao && (anoPublicacao < 0 || anoPublicacao > new Date().getFullYear())) {
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
    try {
        if (!req.params.id) {
            return res.status(400).send({ message: 'ID do livro é obrigatório' });
        }
        const livro = await Livro.findByPk(req.params.id);
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

    try {
        const { query } = req.params;
        if (!query || typeof query !== 'string') {
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
        if (livros.length === 0) {
            return res.status(404).send({ message: 'Nenhum livro encontrado para o critério de busca fornecido' });
        }
        res.status(200).send(livros);
    } catch (error) {
        console.error('Erro ao buscar livros por título ou autor:', error);
        res.status(500).send({ message: 'Erro ao buscar livros por título ou autor' });
    }
};

export const buscarLivrosPorCategoria = async (req: Request, res: Response) => {
    try {
        const { categoria } = req.params;
        if (!categoria || typeof categoria !== 'string') {
            return res.status(400).send({ message: 'Parâmetro de categoria é obrigatório' });
        }
        if (!categoria.trim()) {
            return res.status(400).send({ message: 'Parâmetro de categoria não pode ser vazio' });
        }
        if (typeof categoria == 'number') {
            return res.status(400).send({ message: 'Parâmetro de categoria inválido' });
        }
        const livros = await Livro.findAll({
            where: { categoria: { [Op.like]: `%${categoria}%` } }
        });
        if (livros.length === 0) {
            return res.status(404).send({ message: 'Nenhum livro encontrado para a categoria fornecida' });
        }
        res.status(200).send(livros);
    } catch (error) {
        console.error('Erro ao buscar livros por categoria:', error);
        res.status(500).send({ message: 'Erro ao buscar livros por categoria' });
    }
};
export const buscarLivroPorUsuario = async (req: Request, res: Response) => {
    try {
        const { usuarioId } = req.params;
        if (!usuarioId) {
            return res.status(400).send({ message: 'ID do usuário é obrigatório' });
        }
        const livros = await Livro.findAll({
            where: { usuarioId }
        });
        if (livros.length === 0) {
            return res.status(404).send({ message: 'Nenhum livro encontrado para o usuário fornecido' });
        }
        res.status(200).send(livros);
    } catch (error) {
        console.error('Erro ao buscar livros por usuário:', error);
        res.status(500).send({ message: 'Erro ao buscar livros por usuário' });
    }
};