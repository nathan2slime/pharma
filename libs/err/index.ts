import { AppI18nLang } from '@phar/i18n';

import { ErrorCode } from './src/types';
import { getErrors } from './src/index';

export * from './src/types';

export const getErrorMessage = (code: ErrorCode, lang: AppI18nLang = 'en') =>
  getErrors(lang)[code];
