import express from 'express';
import * as usuarios from '../controllers/usuarioController';
import { tokenValidated, verifyAdmin, verifyAdminOrBibliotecario } from '../middlewares/auth';

const router = express.Router();

router.post('/', verifyAdmin, usuarios.criar);
router.get('/', verifyAdminOrBibliotecario, usuarios.listar);
router.get('/me/dados', tokenValidated, usuarios.buscarDadosProprios);
router.get('/:id', verifyAdminOrBibliotecario, usuarios.buscarPorId);
router.put('/:id', verifyAdminOrBibliotecario, usuarios.atualizar);
router.delete('/:id', verifyAdmin, usuarios.deletar);


export default (app: express.Application) => {
  app.use('/usuarios', router);
};
