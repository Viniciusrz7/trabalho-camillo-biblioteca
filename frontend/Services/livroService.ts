import { API_URL } from './api';
import { ILivro } from '@/types';
import { request } from './utils/utils';

// Cadastrar livro (admin/bibliotecario)
export const cadastrarLivro = async (dados: {
  titulo: string;
  autor: string;
  quantidadeTotal: number;
  editora?: string;
  anoPublicacao?: number;
  categoria?: string;
  localizacao?: string;
}) => {
  return request(`${API_URL}/livros`, {
    method: 'POST',
    body: JSON.stringify(dados)
  });
};

// Listar todos livros
export const listarLivros = async (): Promise<ILivro[]> => {
  return request(`${API_URL}/livros`);
};

// Buscar livro por ID
export const buscarLivroPorId = async (id: number): Promise<ILivro> => {
  return request(`${API_URL}/livros/${id}`);
};

// Buscar livros por título ou autor
export const buscarLivrosPorTituloOuAutor = async (query: string): Promise<ILivro[]> => {
  return request(`${API_URL}/livros/busca/${query}`);
};

// Buscar livros por categoria
export const buscarLivrosPorCategoria = async (categoria: string): Promise<ILivro[]> => {
  return request(`${API_URL}/livros/categoria/${categoria}`);
};

// Atualizar livro (admin/bibliotecario)
export const atualizarLivro = async (id: number, dados: Partial<ILivro>) => {
  return request(`${API_URL}/livros/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dados)
  });
};

// Deletar livro (admin/bibliotecario)
export const deletarLivro = async (id: number) => {
  return request(`${API_URL}/livros/${id}`, {
    method: 'DELETE'
  });
};
