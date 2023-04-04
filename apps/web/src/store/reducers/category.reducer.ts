import { AnyAction, createReducer } from '@reduxjs/toolkit';

import { setCategoryDataAction } from '../actions/category.actions';

import { CategoryState } from '@/types/product.types';

export const INITIAL: CategoryState = {
  data: [],
};

export default createReducer<CategoryState>(INITIAL, builder =>
  builder.addCase<string, AnyAction>(
    setCategoryDataAction.type,
    (__, action) => ({
      data: action.payload,
    })
  )
);
