import { API_URL, setToken, removeToken } from './api';

export const login = async (email: string, senha: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${btoa(`${email}:${senha}`)}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Erro ao fazer login' }));
        throw new Error(error.message);
    }
    const data = await response.json();
    setToken(data.token);
    return data;
};

export const logout = () => {
    removeToken();
};
