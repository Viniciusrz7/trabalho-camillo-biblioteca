import { Application } from 'express';
import * as livroController from '../controllers/livroController';
import express from 'express';
import { tokenValidated, verifyAdminOrBibliotecario } from '../middlewares/auth';

const router = express.Router();

router.post('/', verifyAdminOrBibliotecario, livroController.cadastrarLivro);
router.get('/', tokenValidated, livroController.listarLivros);
router.get('/:id', tokenValidated, livroController.buscarLivroPorId);
router.put('/:id', verifyAdminOrBibliotecario, livroController.atualizarLivro);
router.delete('/:id', verifyAdminOrBibliotecario, livroController.deletarLivro);
router.get('/busca/:query', tokenValidated, livroController.buscarLivrosPorTituloOuAutor);
router.get('/categoria/:categoria', tokenValidated, livroController.buscarLivrosPorCategoria);

export default (app: Application) => {
  app.use('/livros', router);
};
