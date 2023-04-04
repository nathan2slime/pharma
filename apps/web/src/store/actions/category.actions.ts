import { createAction } from '@reduxjs/toolkit';

import { Category } from '@/types/product.types';

export const setCategoryDataAction = createAction<Category[], string>(
  'setCategoryData'
);
