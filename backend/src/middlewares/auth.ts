import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const PRIVATE_KEY = process.env.PRIVATE_KEY || 'chave-secreta-biblioteca';

// Middleware para validar se o token existe e é válido
export const tokenValidated = function (req: Request, res: Response, next: NextFunction) {
    const [, token] = req.headers.authorization?.split(' ') || ['', ''];

    if (!token) {
        return res.status(401).send({ message: 'Token não fornecido' });
    }

    try {
        const payload = jsonwebtoken.verify(token, PRIVATE_KEY);
        const userFromToken = typeof payload !== 'string' && payload.user;

        if (!userFromToken) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        req.headers['user'] = userFromToken;
        return next();
    } catch {
        return res.status(401).json({ message: 'Token inválido ou expirado' });
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
            return res.status(401).json({ message: 'Token inválido' });
        }

        const user = JSON.parse(userFromToken);

        if (user.tipo !== 'admin') {
            return res.status(403).json({ message: 'Acesso negado. Apenas ADMIN pode realizar esta ação.' });
        }

        req.headers['user'] = userFromToken;
        return next();
    } catch (error) {
        return res.status(500).send(error);
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
            return res.status(401).json({ message: 'Token inválido' });
        }

        const user = JSON.parse(userFromToken);

        if (user.tipo !== 'admin' && user.tipo !== 'bibliotecario') {
            return res.status(403).json({ message: 'Acesso negado. Apenas ADMIN ou BIBLIOTECÁRIO podem realizar esta ação.' });
        }

        req.headers['user'] = userFromToken;
        return next();
    } catch (error) {
        return res.status(500).send(error);
    }
};

