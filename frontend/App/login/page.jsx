'use client';

import React, { useState, useCallback } from "react";

const App = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState({ type: "loading", content: "Carregando" });
    const [Carregando, setCarregando] = useState(false);

    const loginSimulado = useCallback(async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Dados a serem preenchidos:", data);

        if (data.email === "user@test.com" && data.password === "password123") {
            return { success: true, message: "Login bem-sucedido!" };
        } else if (data.email === 'error@test.com') {
            return { success: false, message: "Credenciais inválidas. Tente novamente." };
        }
        else {
            return { success: false, message: "Erro no servidor. Tente mais tarde." };
        }
    }, []);

    const handleLogin = useCallback(async (event) => {
        event.preventDefault();
        if (Carregando) return;

        setCarregando(true);
        setMessage({ type: "loading", content: "Carregando..." });
        try {
            const result = await loginSimulado({ email, password });
            if (result.success) {
                setMessage({ type: "success", content: result.message });
                console.log("Redirecionando para a página principal");
            } else {
                setMessage({ type: "error", content: result.message });
                console.log("Erro no Login:", result.message);
            }
        } catch (error) {
            console.error("Erro inesperado:", error);
            setMessage({ type: "error", content: "Erro inesperado. Tente novamente mais tarde." });
        } finally {
            setCarregando(false);
        }
    }, [email, password, Carregando, loginSimulado]);

    const getMessageStyle = () => {
        switch (message.type) {
            case "success":
                return 'text-green-400';
            case "error":
                return 'text-red-400';
            case "loading":
                return 'text-indigo-400 animate-pulse';
            default:
                return 'text-gray-400';
        }
    }

    return (
        <div className="bg-gray-900 text-gray-100 min-h-screen flex items-center justify-center p-4 sm:p-6 font-sans">
            <div className="w-full max-w-sm md:max-w-md">
                <div className="bg-gray-800 p-8 sm:p-10 rounded-xl shadow-2xl border border-gray-700/50">
                    <div className="text-center mb-8">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                        </svg>
                        <h2 className="mt-4 text-3xl font-extrabold text-white">
                            Entrar no Sistema
                        </h2>
                        <p className="mt-2 text-sm text-gray-400">
                            Preencha os campos para autenticação.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">E-mail</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={Carregando}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 disabled:opacity-70"
                                placeholder="seu.email@exemplo.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Senha</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={Carregando}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 disabled:opacity-70"
                                placeholder="••••••••"
                            />
                        </div>

                        <div id="messageArea" className={`h-8 text-center text-sm font-medium pt-1 ${getMessageStyle()}`}>
                            {message.content}
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={Carregando}
                                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {Carregando ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Carregando...
                                    </span>
                                ) : (
                                    'Acessar'
                                )}
                            </button>
                        </div>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-400">
                        Não tem uma conta?
                        <a href="#" className="font-medium text-indigo-500 hover:text-indigo-400 ml-1 transition duration-150">
                            Registre-se
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default App;
