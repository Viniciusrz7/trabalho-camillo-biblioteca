
import express from 'express';
import { verifyAdminOrBibliotecario } from '../middlewares/auth';
import * as devolucaoController from '../controllers/devolucaoController';

const router = express.Router();


router.post('/', verifyAdminOrBibliotecario, devolucaoController.registrarDevolucao);

export default (app: express.Application) => {
  app.use('/devolucoes', router);
};
