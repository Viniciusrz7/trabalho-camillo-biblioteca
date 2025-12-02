import { API_URL } from './api';
import { IMulta } from '@/types';
import { request } from './utils/utils';

// Listar todas multas (admin/bibliotecario)
export const listarMultas = async (): Promise<IMulta[]> => {
  return request(`${API_URL}/multas`);
};

// Listar multas de um usuário
export const listarMultasPorUsuario = async (usuarioId: number): Promise<IMulta[]> => {
  return request(`${API_URL}/multas/usuario/${usuarioId}`);
};

// Minhas multas (aluno)
export const minhasMultas = async (): Promise<IMulta[]> => {
  return request(`${API_URL}/multas/me/multas`);
};

// Pagar multa
export const pagarMulta = async (multaId: number): Promise<IMulta> => {
  return request(`${API_URL}/multas/${multaId}/pagar`, {
    method: 'PUT'
  });
};
