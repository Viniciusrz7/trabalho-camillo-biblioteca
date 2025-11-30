import express from 'express';
import * as emprestimos from '../controllers/emprestimoController';
import { tokenValidated, verifyAdminOrBibliotecario, verificarBloqueioUsuarioSeTiverMultas } from '../middlewares/auth';

const router = express.Router();
// adicionada verificação de bloqueio por multas no momento de criar empréstimo
router.post('/', verifyAdminOrBibliotecario,verificarBloqueioUsuarioSeTiverMultas, emprestimos.criar);
router.get('/', verifyAdminOrBibliotecario, emprestimos.listar);
router.get('/me/emprestimos', tokenValidated, emprestimos.meusEmprestimos);
router.get('/:id', verifyAdminOrBibliotecario, emprestimos.buscarPorId);
router.get('/usuario/:usuarioId', verifyAdminOrBibliotecario, emprestimos.listarPorUsuario);

export default (app: express.Application) => {
  app.use('/emprestimos', router);
};
