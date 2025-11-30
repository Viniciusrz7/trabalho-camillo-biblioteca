import express from 'express';
import * as multaController from '../controllers/multaController';
import { verifyAdminOrBibliotecario, verifyAdmin } from '../middlewares/auth';

const router = express.Router();

//  Rotas específicas PRIMEIRO
router.get('/com-relacionamentos', verifyAdminOrBibliotecario, multaController.listarMultasComRelacionamentos);
router.get('/com-relacionamentos/:id', verifyAdminOrBibliotecario, multaController.buscarMultaPorIdComRelacionamentos);

// Listar e buscar
router.get('/', verifyAdminOrBibliotecario, multaController.listarMultas);
router.get('/:id', verifyAdminOrBibliotecario, multaController.buscarMultaPorId);

// Operações
router.post('/pagar/:id', verifyAdminOrBibliotecario, multaController.pagarMulta);
router.post('/pagar-varias', verifyAdminOrBibliotecario, multaController.pagarMultiplasMultas);
router.delete('/:id', verifyAdmin, multaController.deletarMulta);

export default (app: express.Application) => {
  app.use('/multas', router);
};
