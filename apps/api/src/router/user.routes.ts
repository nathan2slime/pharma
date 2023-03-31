import { Router } from 'express';

import { AuthMiddlewares } from '@/middlewares/auth.middlewares';
import { UserControllers } from '@/controllers/user.controllers';

const userRouter = Router();

const authMiddlewares = new AuthMiddlewares();
const userControllers = new UserControllers();

userRouter.put('/update', authMiddlewares.isLogged, userControllers.update);

export default userRouter;
