import { useState, useEffect } from 'react';
import { emprestimosAtivos, emprestimosAtrasados } from '@/Services/relatorioService';
import { IEmprestimo } from '@/types';
import { useAuth } from '@/app/contexts/AuthContext';

export const useRelatorios = () => {
  const { user } = useAuth();
  const [ativos, setAtivos] = useState<IEmprestimo[]>([]);
  const [atrasados, setAtrasados] = useState<IEmprestimo[]>([]);
  const [tipoRelatorio, setTipoRelatorio] = useState<'ativos' | 'atrasados'>('ativos');

  useEffect(() => {
    carregarRelatorios();
  }, []);

  const carregarRelatorios = async () => {
    try {
      const [resAtivos, resAtrasados] = await Promise.all([
        emprestimosAtivos(),
        emprestimosAtrasados()
      ]);
      setAtivos(resAtivos.emprestimos);
      setAtrasados(resAtrasados.emprestimos);
    } catch (error) {
      alert('Erro ao carregar relatórios');
    }
  };

  return {
    state: { ativos, atrasados, tipoRelatorio, user },
    actions: { setTipoRelatorio, carregarRelatorios }
  };
};
