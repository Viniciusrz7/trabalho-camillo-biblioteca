'use client';
import { useRelatorios } from './state&actions/useRelatorios';
import Navbar from '@/app/components/Menu/Navbar';

export default function RelatoriosPage() {
  const { state, actions } = useRelatorios();

  const emprestimosExibidos = state.tipoRelatorio === 'ativos' ? state.ativos : state.atrasados;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Relatórios</h1>
          <button 
            onClick={actions.carregarRelatorios} 
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg"
          >
            Atualizar
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => actions.setTipoRelatorio('ativos')}
            className={`px-4 py-2 rounded-lg ${state.tipoRelatorio === 'ativos' ? 'bg-indigo-600' : 'bg-gray-700'}`}
          >
            Empréstimos Ativos ({state.ativos.length})
          </button>
          <button
            onClick={() => actions.setTipoRelatorio('atrasados')}
            className={`px-4 py-2 rounded-lg ${state.tipoRelatorio === 'atrasados' ? 'bg-red-600' : 'bg-gray-700'}`}
          >
            Empréstimos Atrasados ({state.atrasados.length})
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3">ID</th>
                <th className="text-left py-3">Aluno</th>
                <th className="text-left py-3">Livro</th>
                <th className="text-left py-3">Data Empréstimo</th>
                <th className="text-left py-3">Devolução Prevista</th>
                {state.tipoRelatorio === 'atrasados' && <th className="text-left py-3">Dias Atraso</th>}
              </tr>
            </thead>
            <tbody>
              {emprestimosExibidos.length === 0 ? (
                <tr>
                  <td colSpan={state.tipoRelatorio === 'atrasados' ? 6 : 5} className="text-center py-8 text-gray-400">
                    Nenhum empréstimo encontrado
                  </td>
                </tr>
              ) : (
                emprestimosExibidos.map((emp) => {
                  const diasAtraso = state.tipoRelatorio === 'atrasados' 
                    ? Math.floor((new Date().getTime() - new Date(emp.dataPrevistaDevolucao).getTime()) / (1000 * 60 * 60 * 24))
                    : 0;
                  
                  return (
                    <tr key={emp.id} className={`border-b border-gray-700 ${state.tipoRelatorio === 'atrasados' ? 'bg-red-900/20' : ''}`}>
                      <td className="py-3">#{emp.id}</td>
                      <td className="py-3">{emp.Usuario?.nome || 'N/A'}</td>
                      <td className="py-3">{emp.Livro?.titulo || 'N/A'}</td>
                      <td className="py-3">{new Date(emp.dataEmprestimo).toLocaleDateString('pt-BR')}</td>
                      <td className="py-3">{new Date(emp.dataPrevistaDevolucao).toLocaleDateString('pt-BR')}</td>
                      {state.tipoRelatorio === 'atrasados' && (
                        <td className="py-3">
                          <span className="px-2 py-1 rounded bg-red-600 text-sm font-semibold">
                            {diasAtraso} {diasAtraso === 1 ? 'dia' : 'dias'}
                          </span>
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
}
