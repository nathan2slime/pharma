import { User } from '@/types/auth.types';
import { createAction } from '@reduxjs/toolkit';

export const setUserIsAdminAction = createAction<boolean, string>(
  'setUserIsAdmin'
);
export const setUserDataAction = createAction<User | null, string>('setUserData');
export const setUserIsLoggedAction = createAction<boolean, string>(
  'setUserIsLogged'
);
export const setAuthTokenAction = createAction<string | null, string>('setAuthToken');
export const setUserIsLoadingAction = createAction<boolean, string>(
  'setUserIsLoading'
);
export const saveProductInUserAction = createAction<string, string>(
  'saveProductInUser'
);
export const addProductInCartUserAction = createAction<string, string>(
  'addProductInCartUser'
);
export const removeProductFromCartUserAction = createAction<string, string>(
  'removeProductFromCartUser'
);
