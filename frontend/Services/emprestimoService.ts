import { API_URL } from './api';
import { IEmprestimo } from '@/types';
import { request } from './utils/utils';

// Criar empréstimo (admin/bibliotecario)
export const criarEmprestimo = async (dados: {
  usuarioId: number;
  livroId: number;
  dataPrevistaDevolucao: string;
}) => {
  return request(`${API_URL}/emprestimos`, {
    method: 'POST',
    body: JSON.stringify(dados)
  });
};

// Listar todos empréstimos (admin/bibliotecario)
export const listarEmprestimos = async (): Promise<IEmprestimo[]> => {
  return request(`${API_URL}/emprestimos`);
};

// Buscar empréstimo por ID
export const buscarEmprestimoPorId = async (id: number): Promise<IEmprestimo> => {
  return request(`${API_URL}/emprestimos/${id}`);
};

// Listar empréstimos de um usuário (admin/bibliotecario)
export const listarEmprestimosPorUsuario = async (usuarioId: number): Promise<IEmprestimo[]> => {
  return request(`${API_URL}/emprestimos/usuario/${usuarioId}`);
};

// Meus empréstimos (aluno - 6.1 do enunciado)
export const meusEmprestimos = async (): Promise<IEmprestimo[]> => {
  return request(`${API_URL}/emprestimos/me/emprestimos`);
};
