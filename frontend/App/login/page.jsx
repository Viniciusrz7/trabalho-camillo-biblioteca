import React, { useState, useCallback } from "react";

const app() => { 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");   
    const [message, setMessage] = useState({ type: "loading", content: "Carregando"});
    const [Carregando, setCarregando] = useState(false);

    const loginSimulado = useCallback(async(data) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Dados a serem preenchidos:", data);

        if (data.email === "user@test.com" && data.password === "password123") {
            return { success: true, message: "Login bem-sucedido!" };
        } else if (data.email=== 'error@test.com'){
            return { success: false, message: "Credenciais inválidas. Tente novamente." };
        }
        else{
            return { success: false, message: "Erro no servidor. Tente mais tarde." };
        }
    }, []);  
    
    const handleLogin = useCallback(async(event) => {
        event.preventDefault();
        if(Carregando) return;

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
            case "sucess":
                return 'text-green-400';
            case "error":
                return 'text-red-400';
            case "loading":
                return 'text-indigo-400 animate-pulse';
            default:
                return 'text-gray-400';
        }
    }

}