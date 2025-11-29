import jsonwebtoken from 'jsonwebtoken';
import { PRIVATE_KEY } from '../../middlewares/auth';
import { IUsuario } from '../../models/types/types';

export const gerarToken = (usuario: IUsuario) => {
  return jsonwebtoken.sign(
    {
      user: JSON.stringify({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo,
        matricula: usuario.matricula
      })
    },
    PRIVATE_KEY,
    { expiresIn: '60m' }
  );
};
