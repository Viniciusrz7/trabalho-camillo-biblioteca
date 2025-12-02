import { API_URL } from './api';
import { request } from './utils/utils';

// Registrar devolução (admin/bibliotecario)
export const registrarDevolucao = async (emprestimoId: number) => {
  return request(`${API_URL}/devolucoes`, {
    method: 'POST',
    body: JSON.stringify({ emprestimoId })
  });
};
