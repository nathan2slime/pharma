import { Dispatch } from '@reduxjs/toolkit';

import { AppState } from '@/store';

import {
  addProductInCartUserAction,
  saveProductInUserAction,
  setUserDataAction,
} from '../actions/user.actions';
import { UserServices } from '@/services/user.services';

const userServices = new UserServices();

export const saveProductInUserThunk = (product: string) => {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    const user = getState().user;

    if (user.data && user.token) {
      const data = await userServices.update(user.token, { ...user.data });

      if (data) {
        dispatch(setUserDataAction(data));
      } else {
        dispatch(saveProductInUserAction(product));
      }
    }
  };
};

export const addProductInCartUserThunk = (product: string) => {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    const user = getState().user;

    if (user.data && user.token) {
      const data = await userServices.update(user.token, { ...user.data });

      if (data) {
        dispatch(setUserDataAction(data));
      } else {
        dispatch(addProductInCartUserAction(product));
      }
    }
  };
};
