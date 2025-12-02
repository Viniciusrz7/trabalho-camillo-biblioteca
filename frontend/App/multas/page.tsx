'use client';
import { useMultas } from './state&actions/useMultas';

export default function MultasPage() {
  const { state, actions } = useMultas();
  const podeGerenciar = state.user?.tipo === 'admin' || state.user?.tipo === 'bibliotecario';

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Multas</h1>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => actions.setFiltro('todas')}
            className={`px-4 py-2 rounded-lg ${state.filtro === 'todas' ? 'bg-indigo-600' : 'bg-gray-700'}`}
          >
            Todas
          </button>
          <button
            onClick={() => actions.setFiltro('pendentes')}
            className={`px-4 py-2 rounded-lg ${state.filtro === 'pendentes' ? 'bg-indigo-600' : 'bg-gray-700'}`}
          >
            Pendentes
          </button>
          <button
            onClick={() => actions.setFiltro('pagas')}
            className={`px-4 py-2 rounded-lg ${state.filtro === 'pagas' ? 'bg-indigo-600' : 'bg-gray-700'}`}
          >
            Pagas
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3">Aluno</th>
                <th className="text-left py-3">Empréstimo</th>
                <th className="text-left py-3">Valor</th>
                <th className="text-left py-3">Status</th>
                <th className="text-left py-3">Data Pagamento</th>
                {podeGerenciar && <th className="text-left py-3">Ação</th>}
              </tr>
            </thead>
            <tbody>
              {state.multas.length === 0 ? (
                <tr>
                  <td colSpan={podeGerenciar ? 6 : 5} className="text-center py-8 text-gray-400">
                    Nenhuma multa encontrada
                  </td>
                </tr>
              ) : (
                state.multas.map((multa) => (
                  <tr key={multa.id} className="border-b border-gray-700">
                    <td className="py-3">{multa.usuarioId}</td>
                    <td className="py-3">#{multa.emprestimoId}</td>
                    <td className="py-3 font-semibold">R$ {multa.valorMulta.toFixed(2)}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded text-sm ${
                        multa.status === 'pendente' ? 'bg-red-600' : 
                        multa.status === 'paga' ? 'bg-green-600' : 'bg-gray-600'
                      }`}>
                        {multa.status}
                      </span>
                    </td>
                    <td className="py-3">
                      {multa.dataPagamento ? new Date(multa.dataPagamento).toLocaleDateString() : '-'}
                    </td>
                    {podeGerenciar && (
                      <td className="py-3">
                        {multa.status === 'pendente' && (
                          <button 
                            onClick={() => actions.handlePagar(multa.id!)} 
                            className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
                          >
                            Registrar Pagamento
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
