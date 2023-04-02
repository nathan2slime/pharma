import { AnyAction, createReducer } from '@reduxjs/toolkit';

import { closeAlertAction, setAlertAction } from '../actions/alert.actions';
import { AlertState } from '@/types/alert.types';

const INITIAL: AlertState = {
  color: 'info',
  message: '',
  open: false,
};

export default createReducer(INITIAL, builder => {
  builder
    .addCase<string, AnyAction>(setAlertAction.type, (state, action) => ({
      ...state,
      ...action.payload,
    }))
    .addCase<string, AnyAction>(closeAlertAction.type, (state, __) => ({
      ...state,
      open: false,
    }));
});
