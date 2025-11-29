import { Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import db from '../models/index';
import { PRIVATE_KEY } from '../middlewares/auth';
import { gerarToken } from './utils/authUtils';
import { IUsuario } from '../models/types/types';

dotenv.config();

const Usuario = db.Usuario;

export const login = async (req: Request, res: Response) => {
  const [, hash] = req.headers.authorization?.split(' ') || ['', ''];
  const [email, password] = Buffer.from(hash, 'base64').toString().split(':');

  try {
    const usuario = await Usuario.findOne({ where: { email } }) as IUsuario | null;

    if (!usuario) {
      return res.status(401).send({ message: 'Usuário ou senha inválidos' });
    }

    if (!usuario.ativo ) {
      return res.status(401).send({ message: 'Usuário desativado' });
    }

    const correctPassword = await bcrypt.compare(password, usuario.senha);

    if (!correctPassword) {
      return res.status(401).send({ message: 'Usuário ou senha inválidos' });
    }

    const token = gerarToken(usuario);

    const refreshToken = jsonwebtoken.sign(
      { userId: usuario.id },
      PRIVATE_KEY,
      { expiresIn: '7d' }
    );

    usuario.refreshToken = refreshToken;
    await usuario.save?.();

    return res.status(200).json({
      token,
      refreshToken
    });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).send({ message: 'Erro ao realizar login' });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const usuario = await Usuario.findByPk(req.body.userId) as IUsuario | null;

    if (usuario) {
      usuario.refreshToken = undefined;
      await usuario.save?.();
    }

    return res.status(200).send({ message: 'Logout realizado com sucesso' });
  } catch (error) {
    return res.status(500).send({ message: 'Erro ao realizar logout' });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    const payload = jsonwebtoken.verify(refreshToken, PRIVATE_KEY);
    const userId = typeof payload !== 'string' && payload.userId;

    const usuario = await Usuario.findByPk(userId) as IUsuario | null;

    if (!usuario || usuario.refreshToken !== refreshToken) {
      return res.status(401).send({ message: 'Refresh token inválido' });
    }

    const newToken = gerarToken(usuario);

    return res.status(200).json({ token: newToken });
  } catch (error) {
    console.error('Erro no refresh:', error);
    return res.status(401).send({ message: 'Refresh token inválido ou expirado' });
  }
};
