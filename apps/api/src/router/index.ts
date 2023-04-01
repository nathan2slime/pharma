import { Router } from 'express';

import authRouter from './auth.routes';
import categoryRouter from './category.routes';
import productRouter from './product.routes';
import userRouter from './user.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.use('/product', productRouter);

export default router;
