interface ValidationResult {
  valido: boolean;
  mensagem?: string;
}

const validator = {
  validarEmail: (email: string): ValidationResult => {
    if (!email || !email.trim()) {
      return { valido: false, mensagem: "Por favor, informe o e-mail" };
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return { valido: false, mensagem: "E-mail inválido" };
    }
    return { valido: true };
  },

  validarSenha: (senha: string): ValidationResult => {
    if (!senha) {
      return { valido: false, mensagem: "Por favor, informe a senha" };
    }
    if (senha.length < 6) {
      return { valido: false, mensagem: "A senha deve ter no mínimo 6 caracteres" };
    }
    return { valido: true };
  },

  validarNome: (nome: string): ValidationResult => {
    if (!nome || !nome.trim()) {
      return { valido: false, mensagem: "Por favor, informe o nome" };
    }
    if (nome.trim().length < 3) {
      return { valido: false, mensagem: "Nome deve ter no mínimo 3 caracteres" };
    }
    return { valido: true };
  },

  validarMatricula: (matricula: string): ValidationResult => {
    if (!matricula || !matricula.trim()) {
      return { valido: false, mensagem: "Por favor, informe a matrícula" };
    }
    return { valido: true };
  },

  validarLogin: (dados: { email: string; senha: string }): ValidationResult => {
    const resultadoEmail = validator.validarEmail(dados.email);
    if (!resultadoEmail.valido) return resultadoEmail;

    if (!dados.senha) {
      return { valido: false, mensagem: "Por favor, informe sua senha" };
    }

    return { valido: true };
  },

  validarCadastroUsuario: (dados: {
    nome: string;
    email: string;
    senha: string;
    tipo: string;
    matricula?: string;
  }): ValidationResult => {
    const resultadoNome = validator.validarNome(dados.nome);
    if (!resultadoNome.valido) return resultadoNome;

    const resultadoEmail = validator.validarEmail(dados.email);
    if (!resultadoEmail.valido) return resultadoEmail;

    const resultadoSenha = validator.validarSenha(dados.senha);
    if (!resultadoSenha.valido) return resultadoSenha;

    if (dados.tipo === 'aluno' && dados.matricula) {
      const resultadoMatricula = validator.validarMatricula(dados.matricula);
      if (!resultadoMatricula.valido) return resultadoMatricula;
    }

    return { valido: true };
  },

  validarEdicaoUsuario: (dados: {
    nome: string;
    email: string;
    senha?: string;
    tipo: string;
    matricula?: string;
  }): ValidationResult => {
    const resultadoNome = validator.validarNome(dados.nome);
    if (!resultadoNome.valido) return resultadoNome;

    const resultadoEmail = validator.validarEmail(dados.email);
    if (!resultadoEmail.valido) return resultadoEmail;

    if (dados.senha && dados.senha.trim()) {
      const resultadoSenha = validator.validarSenha(dados.senha);
      if (!resultadoSenha.valido) return resultadoSenha;
    }

    if (dados.tipo === 'aluno' && dados.matricula) {
      const resultadoMatricula = validator.validarMatricula(dados.matricula);
      if (!resultadoMatricula.valido) return resultadoMatricula;
    }

    return { valido: true };
  }
};

export default validator;
