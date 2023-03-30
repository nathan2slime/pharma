import {
  configureStore,
  combineReducers,
  Store,
  AnyAction,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { createWrapper } from 'next-redux-wrapper';
import { AppI18nLang } from '@phar/i18n';

import langReducer from './reducers/lang.reducer';

export type AppState = {
  lang: AppI18nLang;
};

const reducer = combineReducers<AppState>({
  lang: langReducer,
});

const makeStore = () =>
  configureStore({
    reducer,
    middleware: getDefaultMiddleware => [
      ...getDefaultMiddleware({ serializableCheck: false }),
      thunk,
    ],
  });

export const wrapper = createWrapper<Store<AppState>>(makeStore, {
  debug: false,
});

const store = makeStore();

export type AppDispatch = typeof store.dispatch;
export type ReduxState = ReturnType<typeof reducer>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  AnyAction
>;

export const useTypedSelector: TypedUseSelectorHook<ReduxState> = useSelector;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
