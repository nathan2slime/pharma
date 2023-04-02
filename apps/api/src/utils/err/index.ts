import { getErrorMessage } from '@phar/err';
import { AppI18nLang } from '@phar/i18n';

import { log } from '@/log';

export class AppError {
  code: number;
  lang: AppI18nLang;
  message: string;

  constructor(code: number, lang: AppI18nLang = 'en') {
    this.code = code;
    this.lang = lang;
    this.message = getErrorMessage(code, lang);
  }

  getMessage() {
    return this.message;
  }

  getError() {
    log.error(getErrorMessage(this.code, 'en'), {
      code: this.code,
    });

    return new Error(this.message);
  }
}
