'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/Services/authService';
import { useAuth } from '@/app/contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState({ type: '', content: '' });
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();
  const { login: authLogin } = useAuth();

  const decodificarToken = (token: string) => {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return JSON.parse(payload.user);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (carregando) return;

    setCarregando(true);
    setMessage({ type: 'loading', content: 'Carregando...' });

    try {
      const data = await login(email, senha);
      const userData = decodificarToken(data.token);

      authLogin(data.token, userData);
      setMessage({ type: 'success', content: 'Login bem-sucedido!' });
      router.push('/dashboard');
    } catch (error: any) {
      setMessage({ type: 'error', content: error.message });
    } finally {
      setCarregando(false);
    }
  };


  const getMessageStyle = () => {
    switch (message.type) {
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      case 'loading':
        return 'text-indigo-400 animate-pulse';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-sm md:max-w-md">
        <div className="bg-gray-800 p-8 sm:p-10 rounded-xl shadow-2xl border border-gray-700/50">
          <div className="text-center mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
            <h2 className="mt-4 text-3xl font-extrabold text-white">
              Sistema de Biblioteca
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Faça login para continuar
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={carregando}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 disabled:opacity-70"
                placeholder="seu.email@exemplo.com"
              />
            </div>

            <div>
              <label htmlFor="senha" className="block text-sm font-medium text-gray-300 mb-1">
                Senha
              </label>
              <input
                id="senha"
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                disabled={carregando}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 disabled:opacity-70"
                placeholder="••••••••"
              />
            </div>

            <div className={`h-8 text-center text-sm font-medium pt-1 ${getMessageStyle()}`}>
              {message.content}
            </div>

            <button
              type="submit"
              disabled={carregando}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {carregando ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Carregando...
                </span>
              ) : (
                'Entrar'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
