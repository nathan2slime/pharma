import { User } from '@/types/auth.types';
import { createAction } from '@reduxjs/toolkit';

export const setUserIsAdminAction = createAction<boolean, string>(
  'setUserIsAdmin'
);
export const setUserDataAction = createAction<User, string>('setUserData');
export const setUserIsLoggedAction = createAction<boolean, string>(
  'setUserIsLogged'
);
export const setAuthTokenAction = createAction<string, string>('setAuthToken');
export const setUserIsLoadingAction = createAction<boolean, string>(
  'setUserIsLoading'
);
