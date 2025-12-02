'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useUsuarios } from './useUsuarios';

export default function UsuariosPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { state, actions } = useUsuarios();
  const { usuarios, showForm, formData, editandoId } = state;
  const { setShowForm, setFormData, handleSubmit, handleEditar, handleExcluir, handleCancelar } = actions;
  const [showPassword, setShowPassword] = useState(false);
  const [showMatricula, setShowMatricula] = useState(false);

  useEffect(() => { if (user?.tipo !== 'admin') router.push('/dashboard'); }, [user, router]);
  if (user?.tipo !== 'admin') return null;

  const IconeOlho = ({ show }: { show: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      {show ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
      ) : (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </>
      )}
    </svg>
  );

  const CampoSenha = ({ label, value, onChange, required, show, setShow }: any) => (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        placeholder={label}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white pr-10"
      />
      <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
        <IconeOlho show={show} />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Usuários</h1>
          <button onClick={() => showForm ? handleCancelar() : setShowForm(true)} className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg">
            {showForm ? 'Cancelar' : '+ Novo'}
          </button>
        </div>

        {showForm && (
          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {editandoId ? 'Editar Usuário' : 'Novo Usuário'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nome"
                required
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white"
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white"
              />
              <CampoSenha
                label={editandoId ? "Senha (deixe vazio para não alterar)" : "Senha"}
                value={formData.senha}
                onChange={(e: any) => setFormData({ ...formData, senha: e.target.value })}
                required={!editandoId}
                show={showPassword}
                setShow={setShowPassword}
              />
              <select
                value={formData.tipo}
                onChange={(e) => setFormData({ ...formData, tipo: e.target.value as 'admin' | 'bibliotecario' | 'aluno' })}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white"
              >
                <option value="aluno">Aluno</option>
                <option value="bibliotecario">Bibliotecário</option>
                <option value="admin">Admin</option>
              </select>
              {formData.tipo === 'aluno' && (
                <CampoSenha
                  label="Matrícula"
                  value={formData.matricula}
                  onChange={(e: any) => setFormData({ ...formData, matricula: e.target.value })}
                  required={true}
                  show={showMatricula}
                  setShow={setShowMatricula}
                />
              )}
              <button type="submit" className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg">
                {editandoId ? 'Atualizar' : 'Cadastrar'}
              </button>
            </form>
          </div>
        )}

        <div className="bg-gray-800 rounded-lg p-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3">Nome</th>
                <th className="text-left py-3">Email</th>
                <th className="text-left py-3">Tipo</th>
                <th className="text-left py-3">Matrícula</th>
                <th className="text-left py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id} className="border-b border-gray-700">
                  <td className="py-3">{u.nome}</td>
                  <td className="py-3">{u.email}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded text-sm ${u.tipo === 'admin' ? 'bg-red-600' : u.tipo === 'bibliotecario' ? 'bg-blue-600' : 'bg-green-600'}`}>
                      {u.tipo}
                    </span>
                  </td>
                  <td className="py-3">{u.matricula || '-'}</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button onClick={() => handleEditar(u)} className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm">Editar</button>
                      <button onClick={() => handleExcluir(u.id)} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">Excluir</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
