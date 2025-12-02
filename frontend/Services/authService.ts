import { API_URL, setToken, removeToken } from './api';

export const login = async (email: string, senha: string) => {
  const credentials = btoa(`${email}:${senha}`);
  
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro ao fazer login');
  }

  const data = await response.json();
  setToken(data.token);
  
  return data;
};

export const logout = async () => {
  removeToken();
};
