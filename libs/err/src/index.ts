import { AppI18nLang, langs } from '@phar/i18n';

import { AppErrors } from './types';

export const getErrors = (lang: AppI18nLang = 'en'): AppErrors => {
  const err = (langs[lang] || langs['en']).err;

  return {
    721: err.userNotFound,
    727: err.emailAlredyExists,
    719: err.emailAlredyExists,
    123: err.productNotFound,
    632: err.categoryNotFound,
    726: err.errorUnknow,
    725: err.invalidCredentials,
    724: err.isNotAuthenticated,
    112: err.languageNotAvailable,
    111: err.notAuthorized,
    113: err.sessionExpired,
    116: err.timeoutError,
  };
};
