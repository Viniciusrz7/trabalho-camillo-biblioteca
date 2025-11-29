import express from 'express';
import * as auth from '../controllers/authController';

const router = express.Router();

router.post('/login', auth.login);
router.post('/refresh', auth.refresh);
router.post('/logout', auth.logout);

export default (app: express.Application) => {
  app.use('/auth', router);
};
