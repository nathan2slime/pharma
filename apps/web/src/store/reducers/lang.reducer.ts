import { AnyAction, createReducer } from '@reduxjs/toolkit';
import { AppI18nLang } from '@phar/i18n';

import { setLocalStorageItem } from '@/utils/funcs';
import { setLangAction } from '@/store/actions/lang.actions';

const INITIAL: AppI18nLang = 'en';

export default createReducer<AppI18nLang>(INITIAL, builder => {
  builder.addCase<string, AnyAction>(setLangAction.type, (__, action) => {
    const lang = action.payload;

    setLocalStorageItem('lang', lang);

    return lang;
  });
});
