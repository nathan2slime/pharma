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

productRouter.put(
  '/update/:id',
  authMiddlewares.isAdmin,
  productControllers.update
);

productRouter.delete(
  '/remove/:id',
  authMiddlewares.isAdmin,
  productControllers.remove
);
productRouter.get('/describe/:id', productControllers.describe);
productRouter.post('/', productControllers.paginate);

export default productRouter;
