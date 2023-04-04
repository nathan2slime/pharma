import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AuthServices } from '@/services/auth.services';
import { AppState } from '@/store';
import {
  setAuthTokenAction,
  setUserDataAction,
  setUserIsAdminAction,
  setUserIsLoggedAction,
  setUserIsLoadingAction,
} from '@/store/actions/user.actions';
import { getLocalStorageItem } from '@/utils/funcs';

import { AuthProviderProps } from './model';
import { ProductServices } from '@/services/product.services';
import { setCategoryDataAction } from '@/store/actions/category.actions';

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useDispatch();
  const { lang } = useSelector((state: AppState) => state);

  useEffect(() => {
    onAuth();
  }, []);

  const onAuth = async () => {
    const token = getLocalStorageItem(
      process.env.NEXT_PUBLIC_TOKEN_STORAGE_KEY || 'token'
    );

    const userServices = new AuthServices(lang);
    const productServices = new ProductServices(lang);

    const categories = await productServices.fetchCategories();
    if (categories) {
      dispatch(setCategoryDataAction(categories));
    }

    const user = await userServices.auth(token);
    if (user) {
      const isAdmin = user.roles.includes('ADMIN');

      dispatch(setUserDataAction(user));
      dispatch(setUserIsLoggedAction(true));
      dispatch(setUserIsAdminAction(isAdmin));
      dispatch(setAuthTokenAction(token));
    }

    dispatch(setUserIsLoadingAction(false));
  };

  return <>{children}</>;
};
