import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import db from '../models/index';
import { IUsuario } from '../models/types/types';

const Usuario = db.Usuario;

// So admin tem permissão para criar usuario
export const criar = async (req: Request, res: Response) => {
    try {
        const { nome, email, senha, tipo, matricula } = req.body;

        if (!nome || !email || !senha || !tipo) {
            return res.status(400).send({ message: 'Nome, email, senha e tipo são obrigatórios' });
        }

        if (tipo === 'aluno' && !matricula) {
            return res.status(400).send({ message: 'Matrícula é obrigatória para alunos' });
        }

        const emailExiste = await Usuario.findOne({ where: { email } });
        if (emailExiste) {
            return res.status(400).send({ message: 'Email já cadastrado' });
        }

        const data = await Usuario.create({
            nome, email, senha: await bcrypt.hash(senha, 10),tipo, 
            matricula: tipo === 'aluno' ? matricula : null, 
            ativo: true
        }) as unknown as IUsuario;

        res.status(201).send({
            id: data.id,
            nome: data.nome,
            email: data.email,
            tipo: data.tipo,
            matricula: data.matricula
        });
    } catch (error) {
        res.status(500).send({ message: 'Erro ao criar usuário!' });
    }
};

export const listar = async (req: Request, res: Response) => {
    try {
        const data = await Usuario.findAll({
            attributes: { exclude: ['senha', 'refreshToken'] }
        });
        res.send(data);
    } catch (error) {
        res.status(500).send({ message: 'Erro ao buscar usuários' });
    }
};

export const buscarPorId = async (req: Request, res: Response) => {
    try {
        const data = await Usuario.findByPk(req.params.id, {
            attributes: { exclude: ['senha', 'refreshToken'] }
        }) as IUsuario | null;

        if (!data) {
            return res.status(404).send({ message: `Usuário com id ${req.params.id} não encontrado` });
        }

        res.send(data);
    } catch (error) {
        res.status(500).send({ message: 'Erro ao buscar usuário!' });
    }
};

// Atualizar usuário somente admin e bibliotecario
export const atualizar = async (req: Request, res: Response) => {
    try {
        const { senha, ...dadosAtualizacao } = req.body;

        if (senha) {
            dadosAtualizacao.senha = await bcrypt.hash(senha, 10);
        }

        const [num] = await Usuario.update(dadosAtualizacao, {
            where: { id: req.params.id }
        });

        if (num !== 1) {
            return res.status(404).send({ message: `Usuário com id ${req.params.id} não encontrado` });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).send({ message: 'Erro ao atualizar usuário' });
    }
};

// so admin pode deleter usuario
export const deletar = async (req: Request, res: Response) => {
    try {
        const num = await Usuario.destroy({
            where: { id: req.params.id }
        });
        if (num !== 1) {
            return res.status(404).send({ message: `Usuário com id ${req.params.id} não encontrado` });
        }
        res.send({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(500).send({ message: 'Erro ao deletar usuário' });
    }
};

// aluno pode consultar seus dados
export const buscarDadosProprios = async (req: Request, res: Response) => {
    try {
        const userFromToken = JSON.parse(req.headers['user'] as string);

        const usuario = await Usuario.findByPk(userFromToken.id, {
            attributes: { exclude: ['senha', 'refreshToken'] }
        }) as IUsuario | null;

        if (!usuario) {
            return res.status(404).send({ message: 'Usuário não encontrado' });
        }
        res.send(usuario);
    } catch (error) {
        res.status(500).send({ message: 'Erro ao buscar dados!' });
    }
};
