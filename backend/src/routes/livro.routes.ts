import { Application } from 'express';
import * as livroController from '../controllers/livroController';
import express from 'express';

const router = express.Router();
router.post('/', livroController.cadastrarLivro);
router.get('/', livroController.listarLivros);
router.get('/:id', livroController.buscarLivroPorId);
router.put('/:id', livroController.atualizarLivro);
router.delete('/:id', livroController.deletarLivro);
router.get('/busca/:query', livroController.buscarLivrosPorTituloOuAutor);
router.get('/categoria/:categoria', livroController.buscarLivrosPorCategoria);

export default (app: Application) => {
  app.use('/livros', router);
};