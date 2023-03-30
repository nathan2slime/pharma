import { Router } from 'express';

import { AuthMiddlewares } from '@/middlewares/auth.middlewares';
import { ProductControllers } from '@/controllers/product.controllers';

const productRouter = Router();

const authMiddlewares = new AuthMiddlewares();
const productControllers = new ProductControllers();

productRouter.post(
  '/create',
  authMiddlewares.isAdmin,
  productControllers.create
);

productRouter.delete(
  '/remove/:id',
  authMiddlewares.isAdmin,
  productControllers.remove
);

productRouter.post('/', productControllers.paginate);

export default productRouter;
