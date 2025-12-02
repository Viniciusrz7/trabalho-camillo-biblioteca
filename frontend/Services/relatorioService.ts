import { API_URL } from './api';
import { RelatorioResponse } from '@/types';
import { request } from './utils/utils';

// Empréstimos ativos
export const emprestimosAtivos = async (): Promise<RelatorioResponse> => {
  return request(`${API_URL}/relatorios/emprestimos-ativos`);
};

// Empréstimos atrasados
export const emprestimosAtrasados = async (): Promise<RelatorioResponse> => {
  return request(`${API_URL}/relatorios/emprestimos-atrasados`);
};

// Livros mais emprestados
export const livrosMaisEmprestados = async () => {
  return request(`${API_URL}/relatorios/livros-mais-emprestados`);
};

// Dashboard
export const dashboard = async () => {
  return request(`${API_URL}/relatorios/dashboard`);
};
