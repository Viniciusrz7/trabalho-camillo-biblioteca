import express from 'express';
import * as emprestimos from '../controllers/emprestimoController';
import { tokenValidated, verifyAdminOrBibliotecario, verificarBloqueioUsuarioSeTiverMultas } from '../middlewares/auth';

const router = express.Router();
// adicionada verificação de bloqueio por multas no momento de criar empréstimo
router.post('/', verifyAdminOrBibliotecario,verificarBloqueioUsuarioSeTiverMultas, emprestimos.criar);
router.get('/', verifyAdminOrBibliotecario, emprestimos.listar);
// Rotas específicas ANTES de rotas com parâmetros dinâmicos
router.get('/me/emprestimos', tokenValidated, emprestimos.meusEmprestimos);
router.get('/usuario/:usuarioId', verifyAdminOrBibliotecario, emprestimos.listarPorUsuario);
// Rota com parâmetro dinâmico por último
router.get('/:id', verifyAdminOrBibliotecario, emprestimos.buscarPorId);

export default (app: express.Application) => {
  app.use('/emprestimos', router);
};
