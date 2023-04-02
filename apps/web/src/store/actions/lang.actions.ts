import { AppI18nLang } from '@phar/i18n';
import { createAction } from '@reduxjs/toolkit';

export const setLangAction = createAction<AppI18nLang, string>('setLang');
export const setDefultLangAction = createAction<undefined, string>('setDefaultLang');