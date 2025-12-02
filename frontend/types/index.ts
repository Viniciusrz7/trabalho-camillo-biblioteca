export interface IUsuario {
  id?: number;
  nome: string;
  email: string;
  tipo: 'admin' | 'bibliotecario' | 'aluno';
  matricula?: string;
  ativo: boolean;
}

export interface ILivro {
  id?: number;
  titulo: string;
  autor: string;
  editora?: string;
  anoPublicacao?: number;
  categoria?: string;
  quantidadeTotal: number;
  quantidadeDisponivel: number;
  localizacao?: string;
}

export interface IEmprestimo {
  id?: number;
  usuarioId: number;
  livroId: number;
  dataEmprestimo: Date;
  dataPrevistaDevolucao: Date;
  dataDevolucao?: Date;
  status: 'ativo' | 'devolvido' | 'atrasado';
  diasAtraso: number;
  Usuario?: IUsuario;
  Livro?: ILivro;
}

export interface IMulta {
  id?: number;
  emprestimoId: number;
  usuarioId: number;
  valorMulta: number;
  status: 'pendente' | 'paga' | 'cancelada';
  dataPagamento?: Date;
}

export interface RelatorioResponse {
  total: number;
  emprestimos: IEmprestimo[];
}
