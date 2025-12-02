'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import PageContainer from '@/app/components/Layout/PageContainer';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <PageContainer>
      <h1 className="text-4xl font-bold mb-8">
        Bem-vindo, {user.nome}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-2">Seu Perfil</h2>
          <p className="text-gray-400">Tipo: {user.tipo}</p>
          <p className="text-gray-400">Email: {user.email}</p>
          {user.matricula && <p className="text-gray-400">Matrícula: {user.matricula}</p>}
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-2">Acesso Rápido</h2>
          <p className="text-gray-400">Use o menu acima para navegar</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-2">Sistema</h2>
          <p className="text-gray-400">Biblioteca Online</p>
        </div>
      </div>
    </PageContainer>
  );
}
