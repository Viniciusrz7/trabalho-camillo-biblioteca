Todas as rotas (exceto login) requerem token JWT no header:




Authorization: Bearer <token>
Login
POST /auth/login
Authorization: Basic <base64(email:senha)>
Resposta:

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
Refresh Token
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
Resposta:

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
Logout
POST /auth/logout
Authorization: Bearer <token>

{
  "userId": 1
}
Resposta:

{
  "message": "Logout realizado com sucesso"
}
 Usuários
Criar Usuário (Admin)
POST /usuarios
Authorization: Bearer <token>
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "senha123",
  "tipo": "aluno",
  "matricula": "2024001"
}
Resposta:

{
  "id": 1,
  "nome": "João Silva",
  "email": "joao@email.com",
  "tipo": "aluno",
  "matricula": "2024001"
}
Listar Usuários (Admin/Bibliotecario)
GET /usuarios
Authorization: Bearer <token>
Resposta:

[
  {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com",
    "tipo": "aluno",
    "matricula": "2024001",
    "ativo": true,
    "createdAt": "2024-11-30T10:00:00.000Z",
    "updatedAt": "2024-11-30T10:00:00.000Z"
  },
  {
    "id": 2,
    "nome": "Maria Santos",
    "email": "maria@email.com",
    "tipo": "bibliotecario",
    "matricula": null,
    "ativo": true,
    "createdAt": "2024-11-30T11:00:00.000Z",
    "updatedAt": "2024-11-30T11:00:00.000Z"
  }
]
Buscar Usuário por ID
GET /usuarios/:id
Authorization: Bearer <token>
Resposta:

{
  "id": 1,
  "nome": "João Silva",
  "email": "joao@email.com",
  "tipo": "aluno",
  "matricula": "2024001",
  "ativo": true
}
Atualizar Usuário
PUT /usuarios/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "nome": "João Silva Santos",
  "email": "joao.santos@email.com"
}
Resposta: 204 No Content

Deletar Usuário (Admin)
DELETE /usuarios/:id
Authorization: Bearer <token>
Resposta:

{
  "message": "Usuário deletado com sucesso"
}
Meus Dados (Aluno)
GET /usuarios/me/dados
Authorization: Bearer <token>
Resposta:

{
  "id": 1,
  "nome": "João Silva",
  "email": "joao@email.com",
  "tipo": "aluno",
  "matricula": "2024001",
  "ativo": true
}
Livros
Cadastrar Livro (Admin/Bibliotecario)
POST /livros
Authorization: Bearer <token>
Content-Type: application/json

{
  "titulo": "Clean Code",
  "autor": "Robert Martin",
  "editora": "Prentice Hall",
  "anoPublicacao": 2008,
  "categoria": "Programação",
  "quantidadeTotal": 5,
  "localizacao": "Estante A - Prateleira 3"
}
Resposta:

{
  "id": 1,
  "titulo": "Clean Code",
  "autor": "Robert Martin",
  "editora": "Prentice Hall",
  "anoPublicacao": 2008,
  "categoria": "Programação",
  "quantidadeTotal": 5,
  "quantidadeDisponivel": 5,
  "localizacao": "Estante A - Prateleira 3",
  "createdAt": "2024-11-30T10:00:00.000Z",
  "updatedAt": "2024-11-30T10:00:00.000Z"
}
Listar Livros
GET /livros
Authorization: Bearer <token>
Resposta:

[
  {
    "id": 1,
    "titulo": "Clean Code",
    "autor": "Robert Martin",
    "editora": "Prentice Hall",
    "anoPublicacao": 2008,
    "categoria": "Programação",
    "quantidadeTotal": 5,
    "quantidadeDisponivel": 3,
    "localizacao": "Estante A - Prateleira 3"
  }
]
Buscar Livro por ID
GET /livros/:id
Authorization: Bearer <token>
Resposta:

{
  "id": 1,
  "titulo": "Clean Code",
  "autor": "Robert Martin",
  "quantidadeTotal": 5,
  "quantidadeDisponivel": 3
}
Buscar por Título ou Autor
GET /livros/buscar/:query
Authorization: Bearer <token>
Exemplo: GET /livros/buscar/clean

Resposta:

[
  {
    "id": 1,
    "titulo": "Clean Code",
    "autor": "Robert Martin",
    "quantidadeDisponivel": 3
  },
  {
    "id": 2,
    "titulo": "Clean Architecture",
    "autor": "Robert Martin",
    "quantidadeDisponivel": 2
  }
]
Buscar por Categoria
GET /livros/categoria/:categoria
Authorization: Bearer <token>
Exemplo: GET /livros/categoria/programacao

Resposta:

[
  {
    "id": 1,
    "titulo": "Clean Code",
    "autor": "Robert Martin",
    "categoria": "Programação"
  }
]
Verificar Disponibilidade
GET /livros/disponibilidade/:id
Authorization: Bearer <token>
Resposta:

{
  "id": 1,
  "titulo": "Clean Code",
  "quantidadeTotal": 5,
  "quantidadeDisponivel": 3
}
 Empréstimos
Criar Empréstimo (Admin/Bibliotecario)
POST /emprestimos
Authorization: Bearer <token>
Content-Type: application/json

{
  "usuarioId": 1,
  "livroId": 1,
  "dataPrevistaDevolucao": "2024-12-15"
}
Resposta:

{
  "id": 1,
  "usuarioId": 1,
  "livroId": 1,
  "dataEmprestimo": "2024-11-30T10:00:00.000Z",
  "dataPrevistaDevolucao": "2024-12-15T00:00:00.000Z",
  "dataDevolucao": null,
  "status": "ativo",
  "diasAtraso": 0
}
Erro se usuário tiver multas:

{
  "message": "Usuário bloqueado devido a multas pendentes",
  "bloqueado": true,
  "quantidadeMultasPendentes": 2
}
Listar Empréstimos
GET /emprestimos
Authorization: Bearer <token>
Resposta:

[
  {
    "id": 1,
    "usuarioId": 1,
    "livroId": 1,
    "dataEmprestimo": "2024-11-30T10:00:00.000Z",
    "dataPrevistaDevolucao": "2024-12-15T00:00:00.000Z",
    "status": "ativo",
    "usuario": {
      "id": 1,
      "nome": "João Silva",
      "email": "joao@email.com"
    },
    "livro": {
      "id": 1,
      "titulo": "Clean Code",
      "autor": "Robert Martin"
    }
  }
]
Meus Empréstimos (Aluno)
GET /emprestimos/me/emprestimos
Authorization: Bearer <token>
Resposta:

[
  {
    "id": 1,
    "dataEmprestimo": "2024-11-30T10:00:00.000Z",
    "dataPrevistaDevolucao": "2024-12-15T00:00:00.000Z",
    "status": "ativo",
    "livro": {
      "id": 1,
      "titulo": "Clean Code",
      "autor": "Robert Martin"
    }
  }
]
 Devoluções
Registrar Devolução (Admin/Bibliotecario)
POST /devolucoes
Authorization: Bearer <token>
Content-Type: application/json

{
  "emprestimoId": 1
}
Resposta (no prazo):

{
  "message": "Devolução registrada com sucesso",
  "diasAtraso": 0,
  "multaAplicada": false,
  "valorMulta": 0
}
Resposta (atrasado):

{
  "message": "Devolução registrada com sucesso",
  "diasAtraso": 3,
  "multaAplicada": true,
  "valorMulta": 6.00
}
 Multas
Listar Multas
GET /multas
Authorization: Bearer <token>
Resposta:

[
  {
    "id": 1,
    "emprestimoId": 1,
    "usuarioId": 1,
    "valorMulta": 6.00,
    "status": "pendente",
    "dataPagamento": null,
    "createdAt": "2024-11-30T10:00:00.000Z"
  }
]
Buscar Multa por ID (com relacionamentos)
GET /multas/com-relacionamentos/:id
Authorization: Bearer <token>
Resposta:

{
  "id": 1,
  "emprestimoId": 1,
  "usuarioId": 1,
  "valorMulta": 6.00,
  "status": "pendente",
  "dataPagamento": null,
  "emprestimo": {
    "id": 1,
    "dataEmprestimo": "2024-11-20T10:00:00.000Z",
    "dataPrevistaDevolucao": "2024-11-27T10:00:00.000Z",
    "livro": {
      "id": 1,
      "titulo": "Clean Code",
      "autor": "Robert Martin"
    }
  },
  "usuario": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com"
  }
}
Pagar Multa
POST /multas/pagar/:id
Authorization: Bearer <token>
Resposta:

{
  "message": "Multa paga com sucesso",
  "multa": {
    "id": 1,
    "status": "paga",
    "dataPagamento": "2024-11-30T14:30:00.000Z",
    "valorMulta": 6.00
  }
}
Pagar Múltiplas Multas
POST /multas/pagar-varias
Authorization: Bearer <token>
Content-Type: application/json

{
  "multasIds": [1, 2, 3]
}
Resposta:

{
  "message": "Multas pagas com sucesso",
  "quantidadePaga": 3,
  "dataPagamento": "2024-11-30T14:30:00.000Z"
}
Relatórios
Dashboard
GET /relatorios/dashboard
Authorization: Bearer <token>
Resposta:

{
  "totalLivros": 150,
  "totalUsuarios": 45,
  "emprestimosAtivos": 23,
  "multasPendentes": 5
}
Empréstimos Ativos
GET /relatorios/emprestimos-ativos
Authorization: Bearer <token>
Resposta:

{
  "total": 23,
  "emprestimos": [
    {
      "id": 1,
      "dataEmprestimo": "2024-11-30T10:00:00.000Z",
      "dataPrevistaDevolucao": "2024-12-15T00:00:00.000Z",
      "usuario": {
        "nome": "João Silva"
      },
      "livro": {
        "titulo": "Clean Code"
      }
    }
  ]
}
Empréstimos Atrasados
GET /relatorios/emprestimos-atrasados
Authorization: Bearer <token>
Resposta:

{
  "total": 5,
  "emprestimos": [
    {
      "id": 2,
      "dataEmprestimo": "2024-11-10T10:00:00.000Z",
      "dataPrevistaDevolucao": "2024-11-25T00:00:00.000Z",
      "usuario": {
        "nome": "Maria Santos",
        "matricula": "2024002"
      },
      "livro": {
        "titulo": "Design Patterns"
      }
    }
  ]
}
