import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../models';

dotenv.config();

export const PRIVATE_KEY = process.env.PRIVATE_KEY || 'chave-secreta-biblioteca';
const Multa = db.Multa;
// Middleware para validar se o token existe e é válido, vai abranger alunos tambem
export const tokenValidated = function (req: Request, res: Response, next: NextFunction) {
    const [, token] = req.headers.authorization?.split(' ') || ['', ''];

    if (!token) {
        return res.status(401).send({ message: 'Token não fornecido' });
    }

    try {
        const payload = jsonwebtoken.verify(token, PRIVATE_KEY);
        const userFromToken = typeof payload !== 'string' && payload.user;

        if (!userFromToken) {
            return res.status(401).send({ message: 'Token inválido' });
        }

        req.headers['user'] = userFromToken;
        return next();
    } catch {
        return res.status(401).send({ message: 'Token inválido ou expirado' });
    }
};

// Middleware para verificar se é ADMIN (apenas admin pode cadastrar usuários)
export const verifyAdmin = function (req: Request, res: Response, next: NextFunction) {
    const [, token] = req.headers.authorization?.split(' ') || ['', ''];

    if (!token) {
        return res.status(401).send({ message: 'Token não fornecido' });
    }

    try {
        const payload = jsonwebtoken.verify(token, PRIVATE_KEY);
        const userFromToken = typeof payload !== 'string' && payload.user;

        if (!userFromToken) {
            return res.status(401).send({ message: 'Token inválido' });
        }

        const user = JSON.parse(userFromToken);

        if (user.tipo !== 'admin') {
            return res.status(403).send({ message: 'Acesso negado. Apenas ADMIN pode realizar esta ação.' });
        }

        req.headers['user'] = userFromToken;
        return next();
    } catch (error) {
        return res.status(401).send(error);
    }
};

// Middleware para verificar se é ADMIN ou BIBLIOTECARIO 
export const verifyAdminOrBibliotecario = function (req: Request, res: Response, next: NextFunction) {
    const [, token] = req.headers.authorization?.split(' ') || ['', ''];

    if (!token) {
        return res.status(401).send({ message: 'Token não fornecido' });
    }

    try {
        const payload = jsonwebtoken.verify(token, PRIVATE_KEY);
        const userFromToken = typeof payload !== 'string' && payload.user;

        if (!userFromToken) {
            return res.status(401).send({ message: 'Token inválido' });
        }

        const user = JSON.parse(userFromToken);

        if (user.tipo !== 'admin' && user.tipo !== 'bibliotecario') {
            return res.status(403).send({ message: 'Acesso negado. Apenas ADMIN ou BIBLIOTECÁRIO podem realizar esta ação.' });
        }

        req.headers['user'] = userFromToken;
        return next();
    } catch (error) {
        return res.status(500).send(error);
    }
};
//adicionado middleware para verificar se usuario está bloqueado por multas
export const verificarBloqueioUsuarioSeTiverMultas= async (req: Request, res: Response, next : NextFunction) => {
  try {
    const usuarioId = req.body.usuarioId;
    if (!usuarioId) {
      return res.status(400).send({ message: 'O ID do usuário é obrigatório' });
    }
    const multasPendentes = await Multa.count({
      where: { 
        usuarioId: usuarioId, 
        status: 'pendente' 
      }
    });

    if (multasPendentes > 0) {
      return res.status(403).send({ message: 'Usuário bloqueado devido a multas pendentes',bloqueado: true, quantidadeMultasPendentes: multasPendentes });
    }

    return next();
  } catch (error) {
    console.error('Erro ao verificar bloqueio do usuário:', error);
    res.status(500).send({ message: 'Erro ao verificar bloqueio do usuário' });
  }
};

