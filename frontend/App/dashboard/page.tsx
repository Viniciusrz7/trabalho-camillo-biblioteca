'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import PageContainer from '@/app/components/Layout/PageContainer';
import StatusBadge from '@/app/components/Badge/StatusBadge';
import Link from 'next/link';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  const isAdmin = user.tipo === 'admin';
  const isBibliotecario = user.tipo === 'bibliotecario';
  const isAluno = user.tipo === 'aluno';

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Olá, {user.nome.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-400">
          {isAdmin && 'Você tem acesso total ao sistema'}
          {isBibliotecario && 'Gerencie empréstimos e devoluções'}
          {isAluno && 'Consulte seus empréstimos e multas'}
        </p>
      </div>

      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-6 rounded-lg mb-8 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Seu Perfil</h2>
            <p className="text-indigo-100 mb-1">📧 {user.email}</p>
            {user.matricula && <p className="text-indigo-100">🎓 Matrícula: {user.matricula}</p>}
          </div>
          <div className="text-right">
            <StatusBadge status={user.tipo} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link href="/livros" className="bg-gray-800 hover:bg-gray-750 p-6 rounded-lg border border-gray-700 hover:border-indigo-500 transition-all cursor-pointer">
          <div className="text-4xl mb-2">📚</div>
          <h3 className="text-lg font-semibold mb-1">Livros</h3>
          <p className="text-gray-400 text-sm">Consultar acervo</p>
        </Link>

        {(isAdmin || isBibliotecario) && (
          <Link href="/emprestimos" className="bg-gray-800 hover:bg-gray-750 p-6 rounded-lg border border-gray-700 hover:border-green-500 transition-all cursor-pointer">
            <div className="text-4xl mb-2">📖</div>
            <h3 className="text-lg font-semibold mb-1">Empréstimos</h3>
            <p className="text-gray-400 text-sm">Gerenciar empréstimos</p>
          </Link>
        )}

        {(isAdmin || isBibliotecario) && (
          <Link href="/devolucoes" className="bg-gray-800 hover:bg-gray-750 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-all cursor-pointer">
            <div className="text-4xl mb-2">↩️</div>
            <h3 className="text-lg font-semibold mb-1">Devoluções</h3>
            <p className="text-gray-400 text-sm">Registrar devoluções</p>
          </Link>
        )}

        {isAluno && (
          <Link href="/meus-emprestimos" className="bg-gray-800 hover:bg-gray-750 p-6 rounded-lg border border-gray-700 hover:border-green-500 transition-all cursor-pointer">
            <div className="text-4xl mb-2">📖</div>
            <h3 className="text-lg font-semibold mb-1">Meus Empréstimos</h3>
            <p className="text-gray-400 text-sm">Ver meus livros</p>
          </Link>
        )}

        <Link href="/multas" className="bg-gray-800 hover:bg-gray-750 p-6 rounded-lg border border-gray-700 hover:border-red-500 transition-all cursor-pointer">
          <div className="text-4xl mb-2">💰</div>
          <h3 className="text-lg font-semibold mb-1">Multas</h3>
          <p className="text-gray-400 text-sm">
            {isAluno ? 'Minhas multas' : 'Gerenciar multas'}
          </p>
        </Link>

        {(isAdmin || isBibliotecario) && (
          <Link href="/relatorios" className="bg-gray-800 hover:bg-gray-750 p-6 rounded-lg border border-gray-700 hover:border-yellow-500 transition-all cursor-pointer">
            <div className="text-4xl mb-2">📊</div>
            <h3 className="text-lg font-semibold mb-1">Relatórios</h3>
            <p className="text-gray-400 text-sm">Visualizar estatísticas</p>
          </Link>
        )}

        {isAdmin && (
          <Link href="/usuarios" className="bg-gray-800 hover:bg-gray-750 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-all cursor-pointer">
            <div className="text-4xl mb-2">👥</div>
            <h3 className="text-lg font-semibold mb-1">Usuários</h3>
            <p className="text-gray-400 text-sm">Gerenciar usuários</p>
          </Link>
        )}
      </div>

      <div className="bg-blue-900/20 border border-blue-700 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">💡 Dica</h3>
        <p className="text-gray-300 text-sm">
          {isAluno && 'Devolva seus livros no prazo para evitar multas!'}
          {isBibliotecario && 'Verifique os empréstimos atrasados na página de Relatórios.'}
          {isAdmin && 'Use a página de Relatórios para acompanhar o sistema.'}
        </p>
      </div>
    </PageContainer>
  );
}
