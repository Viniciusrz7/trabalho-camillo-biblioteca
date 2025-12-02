interface ValidationResult {
  valido: boolean;
  mensagem?: string;
}

interface LoginData {
  email: string;
  senha: string;
}

interface CadastroUsuarioData {
  nome: string;
  email: string;
  senha: string;
  tipo: string;
  matricula?: string;
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

  validarEmailLogin: (email: string): ValidationResult => {
    return validator.validarEmail(email);
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

  validarSenhaLogin: (senha: string): ValidationResult => {
    if (!senha) {
      return { valido: false, mensagem: "Por favor, informe sua senha" };
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
    if (matricula.trim().length < 3) {
      return { valido: false, mensagem: "Matrícula deve ter no mínimo 3 caracteres" };
    }
    return { valido: true };
  },

  validarTipo: (tipo: string): ValidationResult => {
    const tiposValidos = ['aluno', 'bibliotecario', 'admin'];
    if (!tipo || !tiposValidos.includes(tipo)) {
      return { valido: false, mensagem: "Tipo de usuário inválido" };
    }
    return { valido: true };
  },

  validarLogin: (dados: LoginData): ValidationResult => {
    const { email, senha } = dados;

    const resultadoEmail = validator.validarEmailLogin(email);
    if (!resultadoEmail.valido) return resultadoEmail;

    const resultadoSenha = validator.validarSenhaLogin(senha);
    if (!resultadoSenha.valido) return resultadoSenha;

    return { valido: true };
  },

  validarCadastroUsuario: (dados: CadastroUsuarioData): ValidationResult => {
    const { nome, email, senha, tipo, matricula } = dados;

    const resultadoNome = validator.validarNome(nome);
    if (!resultadoNome.valido) return resultadoNome;

    const resultadoEmail = validator.validarEmail(email);
    if (!resultadoEmail.valido) return resultadoEmail;

    const resultadoSenha = validator.validarSenha(senha);
    if (!resultadoSenha.valido) return resultadoSenha;

    const resultadoTipo = validator.validarTipo(tipo);
    if (!resultadoTipo.valido) return resultadoTipo;

    if (tipo === 'aluno') {
      const resultadoMatricula = validator.validarMatricula(matricula || '');
      if (!resultadoMatricula.valido) return resultadoMatricula;
    }

    return { valido: true };
  }
};

export default validator;
