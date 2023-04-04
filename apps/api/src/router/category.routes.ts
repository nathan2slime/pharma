import { Router } from 'express';

import { CategoryControllers } from '@/controllers/category.controllers';
import { AuthMiddlewares } from '@/middlewares/auth.middlewares';

const categoryRouter = Router();

const categoryControllers = new CategoryControllers();
const authMiddlewares = new AuthMiddlewares();

categoryRouter.post(
  '/create',
  authMiddlewares.isAdmin,
  categoryControllers.create
);
categoryRouter.get('/describe/:id', categoryControllers.describe);
categoryRouter.get('/all', categoryControllers.getAll);
categoryRouter.delete(
  '/remove/:id',
  authMiddlewares.isAdmin,
  categoryControllers.remove
);

export default categoryRouter;
