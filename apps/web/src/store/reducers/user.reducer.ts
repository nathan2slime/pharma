import { AnyAction, createReducer } from '@reduxjs/toolkit';

import { UserState } from '@/types/auth.types';
import {
  setAuthTokenAction,
  setUserDataAction,
  setUserIsAdminAction,
  setUserIsLoggedAction,
  setUserIsLoadingAction,
  saveProductInUserAction,
  addProductInCartUserAction,
} from '../actions/user.actions';
import { setLocalStorageItem } from '@/utils/funcs';

const INITIAL: UserState = {
  isLoading: true,
};

export default createReducer<UserState>(INITIAL, builder => {
  builder
    .addCase<string, AnyAction>(setUserDataAction.type, (state, action) => ({
      ...state,
      data: action.payload,
    }))
    .addCase<string, AnyAction>(
      setUserIsLoggedAction.type,
      (state, action) => ({
        ...state,
        isLogged: action.payload,
      })
    )
    .addCase<string, AnyAction>(setUserIsAdminAction.type, (state, action) => ({
      ...state,
      isAdmin: action.payload,
    }))
    .addCase<string, AnyAction>(setAuthTokenAction.type, (state, action) => {
      const token = action.payload;

      setLocalStorageItem(
        process.env.NEXT_PUBLIC_TOKEN_STORAGE_KEY || 'token',
        token
      );

      return {
        ...state,
        token,
      };
    })
    .addCase<string, AnyAction>(
      setUserIsLoadingAction.type,
      (state, action) => ({
        ...state,
        isLoading: action.payload,
      })
    )
    .addCase<string, AnyAction>(
      saveProductInUserAction.type,
      (state, action) => {
        const user = state.data;
        const product = action.payload;

        if (user) {
          let saved = [...user.saved];

          if (saved) {
            const index = saved.indexOf(product);

            if (index === -1) {
              saved = [...saved, product];
            } else {
              saved = saved.filter(sat => sat != product);
            }

            return { ...state, data: { ...user, saved } };
          }
        }

        return state;
      }
    )
    .addCase<string, AnyAction>(
      addProductInCartUserAction.type,
      (state, action) => {
        const user = state.data;

        if (user) {
          const cart = [...user.cart, action.payload];

          return {
            ...state,
            data: { ...user, cart: cart },
          };
        }

        return state;
      }
    );
});
