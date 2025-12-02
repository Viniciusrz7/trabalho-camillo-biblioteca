import { API_URL } from './api';
import { request } from './utils/utils';

export const registrarDevolucao = async (emprestimoId: number): Promise<{
    message: string;
    diasAtraso: number;
    multaAplicada: boolean;
    valorMulta: number;
}> => {
    return request(`${API_URL}/devolucoes`, {
        method: 'POST',
        body: JSON.stringify({ emprestimoId })
    });
};
