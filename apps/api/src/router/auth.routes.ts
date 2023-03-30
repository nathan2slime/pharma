import { Router } from 'express';

import { AuthControllers } from '@/controllers/auth.controllers';

const authRouter = Router();
const authController = new AuthControllers();

authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);
authRouter.get('/authorization', authController.authorization);

export default authRouter;
