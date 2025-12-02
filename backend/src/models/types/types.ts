export interface IUsuario {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  tipo: 'admin' | 'bibliotecario' | 'aluno';
  matricula?: string;
  ativo: boolean;
  refreshToken?: string;
  save?: () => Promise<any>;
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
  save?: () => Promise<any>;
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
  save?: () => Promise<any>;
}

export interface IMulta {
  id?: number;
  emprestimoId: number;
  usuarioId: number;
  valorMulta: number;
  status: 'pendente' | 'paga' | 'cancelada';
  dataPagamento?: Date;
  save?: () => Promise<any>;
}
export interface IMultaComRelacionamentos extends IMulta {
  emprestimo?: {
    id: number;
    dataEmprestimo: Date;
    dataPrevistaDevolucao: Date;
    livro?: {
      id: number;
      titulo: string;
      autor: string;
    };
  };
  usuario?: {
    id: number;
    nome: string;
    email: string;
  };
}
