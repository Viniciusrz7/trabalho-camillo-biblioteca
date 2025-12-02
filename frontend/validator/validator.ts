interface ValidationResult {
  valido: boolean;
  mensagem?: string;
}

const erro = (mensagem: string): ValidationResult => ({ valido: false, mensagem });
const ok = (): ValidationResult => ({ valido: true });
const vazio = (texto: string) => !texto || !texto.trim();

const validator = {
  validarEmail: (email: string): ValidationResult => {
    if (vazio(email)) return erro("Por favor, informe o e-mail");
    if (!/\S+@\S+\.\S+/.test(email)) return erro("E-mail inválido");
    return ok();
  },

  validarSenha: (senha: string): ValidationResult => {
    if (!senha) return erro("Por favor, informe a senha");
    if (senha.length < 6) return erro("A senha deve ter no mínimo 6 caracteres");
    return ok();
  },

  validarNome: (nome: string): ValidationResult => {
    if (vazio(nome)) return erro("Por favor, informe o nome");
    if (nome.trim().length < 3) return erro("Nome deve ter no mínimo 3 caracteres");
    return ok();
  },

  validarMatricula: (matricula: string): ValidationResult => {
    if (vazio(matricula)) return erro("Por favor, informe a matrícula");
    return ok();
  },

  validarLogin: (dados: { email: string; senha: string }): ValidationResult => {
    const resultEmail = validator.validarEmail(dados.email);
    if (!resultEmail.valido) return resultEmail;
    if (!dados.senha) return erro("Por favor, informe sua senha");
    return ok();
  },

  validarCadastroUsuario: (dados: {
    nome: string;
    email: string;
    senha: string;
    tipo: string;
    matricula?: string;
  }): ValidationResult => {
    const resultNome = validator.validarNome(dados.nome);
    if (!resultNome.valido) return resultNome;

    const resultEmail = validator.validarEmail(dados.email);
    if (!resultEmail.valido) return resultEmail;

    const resultSenha = validator.validarSenha(dados.senha);
    if (!resultSenha.valido) return resultSenha;

    if (dados.tipo === 'aluno' && dados.matricula) {
      const resultMatricula = validator.validarMatricula(dados.matricula);
      if (!resultMatricula.valido) return resultMatricula;
    }

    return ok();
  },

  validarEdicaoUsuario: (dados: {
    nome: string;
    email: string;
    senha?: string;
    tipo: string;
    matricula?: string;
  }): ValidationResult => {
    const resultNome = validator.validarNome(dados.nome);
    if (!resultNome.valido) return resultNome;

    const resultEmail = validator.validarEmail(dados.email);
    if (!resultEmail.valido) return resultEmail;

    if (dados.senha && dados.senha.trim()) {
      const resultSenha = validator.validarSenha(dados.senha);
      if (!resultSenha.valido) return resultSenha;
    }

    if (dados.tipo === 'aluno' && dados.matricula) {
      const resultMatricula = validator.validarMatricula(dados.matricula);
      if (!resultMatricula.valido) return resultMatricula;
    }

    return ok();
  },

  validarCadastroLivro: (dados: {
    titulo: string;
    autor: string;
    quantidadeTotal: string;
  }): ValidationResult => {
    if (vazio(dados.titulo)) return erro("Por favor, informe o título do livro");
    if (vazio(dados.autor)) return erro("Por favor, informe o autor do livro");

    const quantidade = parseInt(dados.quantidadeTotal);
    if (isNaN(quantidade) || quantidade < 1) {
      return erro("Quantidade deve ser um número maior que zero");
    }

    return ok();
  }
};

export default validator;
