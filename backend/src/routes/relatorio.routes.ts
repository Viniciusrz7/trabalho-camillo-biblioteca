import { Application } from 'express';
import express from 'express';
import * as relatorioController from '../controllers/relatoriosControler';
import { verifyAdminOrBibliotecario } from '../middlewares/auth';
export default (app: Application) => {
 const router = express.Router();

 router.get('/emprestimos-ativos', verifyAdminOrBibliotecario, relatorioController.relatorioEmprestimosAtivos);
 router.get('/emprestimos-atrasados', verifyAdminOrBibliotecario, relatorioController.relatorioEmprestimosAtrasados);
 router.get('/livros-mais-emprestados', verifyAdminOrBibliotecario, relatorioController.relatorioLivrosMaisEmprestados);
 router.get('/dashboard', verifyAdminOrBibliotecario, relatorioController.dashboard);

 app.use('/relatorios', router);
};
