import express from 'express';
import * as emprestimos from '../controllers/emprestimoController';
import { tokenValidated, verifyAdminOrBibliotecario } from '../middlewares/auth';

const router = express.Router();

router.post('/', verifyAdminOrBibliotecario, emprestimos.criar);
router.get('/', verifyAdminOrBibliotecario, emprestimos.listar);
router.get('/me/emprestimos', tokenValidated, emprestimos.meusEmprestimos);
router.get('/:id', verifyAdminOrBibliotecario, emprestimos.buscarPorId);
router.get('/usuario/:usuarioId', verifyAdminOrBibliotecario, emprestimos.listarPorUsuario);

export default (app: express.Application) => {
  app.use('/emprestimos', router);
};
