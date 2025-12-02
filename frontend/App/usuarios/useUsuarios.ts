import { useState, useEffect } from 'react';
import { listarUsuarios, criarUsuario } from '@/Services/usuarioService';
import { IUsuario } from '@/types';
import validator from '@/utils/validator';

export const useUsuarios = () => {
    const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        nome: '', email: '', senha: '',
        tipo: 'aluno' as 'admin' | 'bibliotecario' | 'aluno',
        matricula: ''
    });

    useEffect(() => {
        carregarUsuarios();
    }, []);

    const carregarUsuarios = async () => {
        try {
            const data = await listarUsuarios();
            setUsuarios(data);
        } catch (error) {
            alert('Erro ao carregar usuários');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const validacao = validator.validarCadastroUsuario(formData);
        if (!validacao.valido) {
            alert(validacao.mensagem);
            return;
        }

        try {
            await criarUsuario(formData);
            alert('Usuário criado!');
            setShowForm(false);
            setFormData({ nome: '', email: '', senha: '', tipo: 'aluno', matricula: '' });
            carregarUsuarios();
        } catch (error) {
            alert('Erro ao criar usuário');
        }
    };

    return { usuarios, showForm, setShowForm, formData, setFormData, handleSubmit };
};
