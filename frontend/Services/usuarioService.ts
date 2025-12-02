import { API_URL, getAuthHeaders } from './api';
import { IUsuario } from '@/types';

// Função auxiliar para requisições
const request = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    headers: getAuthHeaders(),
    ...options
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Erro na requisição' }));
    throw new Error(error.message);
  }
  return response.status === 204 ? null : await response.json();
};

// Criar usuário (só admin)
export const criarUsuario = async (dados: {
  nome: string;
  email: string;
  senha: string;
  tipo: 'admin' | 'bibliotecario' | 'aluno';
  matricula?: string;
}) => {
  return request(`${API_URL}/usuarios`, {
    method: 'POST',
    body: JSON.stringify(dados)
  });
};

// Listar todos usuários (admin/bibliotecario)
export const listarUsuarios = async (): Promise<IUsuario[]> => {
  return request(`${API_URL}/usuarios`);
};

// Buscar usuário por ID
export const buscarUsuarioPorId = async (id: number): Promise<IUsuario> => {
  return request(`${API_URL}/usuarios/${id}`);
};

// Atualizar usuário (admin/bibliotecario)
export const atualizarUsuario = async (id: number, dados: Partial<IUsuario>) => {
  return request(`${API_URL}/usuarios/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dados)
  });
};

// Deletar usuário (só admin)
export const deletarUsuario = async (id: number) => {
  return request(`${API_URL}/usuarios/${id}`, {
    method: 'DELETE'
  });
};

// Buscar meus dados (qualquer usuário autenticado)
export const buscarMeusDados = async (): Promise<IUsuario> => {
  return request(`${API_URL}/usuarios/me/dados`);
};
