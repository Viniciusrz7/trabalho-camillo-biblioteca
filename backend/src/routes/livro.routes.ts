import { Application } from 'express';
import * as livroController from '../controllers/livroController';
import express from 'express';
import { verifyAdminOrBibliotecario } from '../middlewares/auth';

const router = express.Router();
router.get('/busca/:query', livroController.buscarLivrosPorTituloOuAutor);
router.get('/categoria/:categoria', livroController.buscarLivrosPorCategoria);
router.get('/disponiveis/verificar-disponibilidade', livroController.verificarLivrosDisponiveis);
router.post('/', verifyAdminOrBibliotecario, livroController.cadastrarLivro);
router.get('/', livroController.listarLivros);
router.get('/:id', verifyAdminOrBibliotecario, livroController.buscarLivroPorId);
router.put('/:id', verifyAdminOrBibliotecario, livroController.atualizarLivro);
router.delete('/:id', verifyAdminOrBibliotecario, livroController.deletarLivro);


export default (app: express.Application) => {
  app.use('/livros', router);
};
