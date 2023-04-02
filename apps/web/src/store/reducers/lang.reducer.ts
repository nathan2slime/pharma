import { AnyAction, createReducer } from '@reduxjs/toolkit';
import { AppI18nLang } from '@phar/i18n';

import { getLocalStorageItem, setLocalStorageItem } from '@/utils/funcs';
import {
  setDefultLangAction,
  setLangAction,
} from '@/store/actions/lang.actions';

const INITIAL: AppI18nLang = 'en';

export default createReducer<AppI18nLang>(INITIAL, builder => {
  builder
    .addCase<string, AnyAction>(setLangAction.type, (__, action) => {
      const lang = action.payload;

      setLocalStorageItem(
        process.env.NEXT_PUBLIC_LANGUAGE_STORAGE_KEY || 'lang',
        lang
      );
      document.documentElement.lang = lang;

      return lang;
    })
    .addCase<string, AnyAction>(setDefultLangAction.type, (state, __) => {
      const langLocal = getLocalStorageItem(
        process.env.NEXT_PUBLIC_LANGUAGE_STORAGE_KEY || 'lang'
      ) as unknown as string;

      const lang =
        langLocal == 'undefined'
          ? document.documentElement.lang || 'en'
          : langLocal;

      const newState = (lang || state) as AppI18nLang;
      document.documentElement.lang = newState;

      return newState;
    });
});
