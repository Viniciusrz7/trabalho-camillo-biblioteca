import express from 'express';
import * as multaController from '../controllers/multaController';
import { verifyAdminOrBibliotecario, verifyAdmin } from '../middlewares/auth';

const router = express.Router();

//  Rotas específicas PRIMEIRO
router.get('/com-relacionamentos', verifyAdminOrBibliotecario, multaController.listarMultasComRelacionamentos);
router.get('/com-relacionamentos/:id', verifyAdminOrBibliotecario, multaController.buscarMultaPorIdComRelacionamentos);
router.get('/status/:status', verifyAdminOrBibliotecario, multaController.buscarMultasPorStatus);
router.get('/usuario/:id/pendentes', verifyAdminOrBibliotecario, multaController.buscarMultasPendentesPorUsuario);
router.get('/usuario/:id/total-pendentes', verifyAdminOrBibliotecario, multaController.calcularTotalMultasPendentes);
router.get('/usuario/:id', verifyAdminOrBibliotecario, multaController.buscarMultasPorUsuario);

// Listar e buscar
router.get('/', verifyAdminOrBibliotecario, multaController.listarMultas);
router.get('/:id', verifyAdminOrBibliotecario, multaController.buscarMultaPorId);

// Operações
router.post('/pagar/:id', verifyAdminOrBibliotecario, multaController.pagarMulta);
router.patch('/:id/status', verifyAdminOrBibliotecario, multaController.atualizarStatusMulta);
router.delete('/:id', verifyAdminOrBibliotecario, multaController.deletarMulta);

export default (app: express.Application) => {
  app.use('/multas', router);
};
