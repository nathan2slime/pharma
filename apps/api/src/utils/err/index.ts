import { getErrorMessage } from '@phar/err';
import { AppI18nLang } from '@phar/i18n';

import { log } from '@/log';

export class AppError {
  constructor(code: number, lang: AppI18nLang = 'en') {
    const err = getErrorMessage(code, lang);
    log.error(err, { code: code });
    
    return Error(err);
  }
}
