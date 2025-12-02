import { API_URL } from './api';
import { IEmprestimo } from '@/app/types';
import { request } from './utils/utils';

// Livros emprestados por aluno
export const livrosEmprestadosPorAluno = async (usuarioId: number): Promise<IEmprestimo[]> => {
  return request(`${API_URL}/relatorios/emprestimos/usuario/${usuarioId}`);
};

// Livros em atraso
export const livrosEmAtraso = async (): Promise<IEmprestimo[]> => {
  return request(`${API_URL}/relatorios/emprestimos/atrasados`);
};
