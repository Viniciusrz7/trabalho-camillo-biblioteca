# Sistema de Biblioteca - CRUD

Projeto desenvolvido para simular o gerenciamento de uma biblioteca, permitindo realizar operações de cadastro, consulta, atualização e remoção de livros.

A aplicação foi construída utilizando **TypeScript**, **Express**, **React** e **SQLite**, seguindo uma arquitetura com **API backend** e **interface frontend**.

## Objetivo do Projeto

O objetivo do projeto é aplicar conceitos de desenvolvimento web full stack, incluindo:

* criação de APIs REST
* integração entre frontend e backend
* manipulação de banco de dados
* autenticação de usuários (Auth)
* implementação de operações CRUD
* organização de rotas e estrutura de projeto
  
## Funcionalidades

O sistema permite realizar:

- cadastro, edição e remoção de livros
- cadastro e autenticação de usuários
- empréstimo de livros
- controle de devoluções
- verificação de prazos de empréstimo
- cálculo de multas por atraso
  
## Tecnologias Utilizadas

### Backend

* TypeScript
* Express
* SQLite
* Node.js

### Frontend

* React
* TypeScript
* consumo de API REST

## Funcionalidades

O sistema permite realizar as seguintes operações:

* **Cadastrar livros**
* **Listar livros cadastrados**
* **Editar informações de livros**
* **Excluir livros**
* **Consulta de dados através da API**

Todas as operações seguem o padrão **CRUD**:

* Create → cadastrar livro
* Read → visualizar livros
* Update → atualizar dados do livro
* Delete → remover livro

## Estrutura do Projeto

### Backend

Responsável por:

* criação das **rotas da API**
* conexão com banco de dados SQLite
* controle das operações CRUD
* tratamento das requisições HTTP

Exemplo de rotas:

GET /livros
POST /livros
PUT /livros/:id
DELETE /livros/:id

### Frontend

Responsável por:

* interface do usuário
* consumo da API
* exibição dos livros cadastrados
* formulários de cadastro e edição

## Banco de Dados

O projeto utiliza **SQLite**, um banco de dados leve baseado em arquivo, ideal para aplicações simples e projetos acadêmicos.

A tabela principal do sistema armazena informações como:

* id
* título
* autor
* ano de publicação
* categoria

## Como Executar o Projeto

### 1. Clonar o repositório

git clone <url-do-repositorio>

### 2. Instalar dependências

Backend:

npm install

Frontend:

npm install

### 3. Executar o backend

npm run dev

### 4. Executar o frontend

npm start

## Observações

Este projeto foi desenvolvido coletivamente como trabalho acadêmico com foco em:

* prática de desenvolvimento full stack
* criação de APIs
* integração com banco de dados
* organização de rotas e estrutura de código


