import { getAuthHeaders } from '../api';

export const request = async (url: string, options: RequestInit = {}) => {
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
