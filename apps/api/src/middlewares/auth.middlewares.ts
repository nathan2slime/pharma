import { AppI18nLang } from '@phar/i18n';
import { NextFunction, Request, Response } from 'express';

import { AuthServices } from '@/services/auth.services';
import { UserRole } from '@/types/auth.types';
import { AppError } from '@/utils/err';
import { log } from '@/log';

export class AuthMiddlewares {
  async isAdmin(req: Request, _res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;
      const lang = req.headers['accept-language'] as AppI18nLang;

      log.start('checking authorization for token', token);

      const authServices = new AuthServices();
      const user = await authServices.getUserByToken(token);

      const isAdmin = user.roles?.find(role => role == UserRole.ADMIN);

      if (isAdmin) {
        req.body.admin = user._id;
        
        log.success('authorized operation for user', user._id);
        next();
      }

      throw new AppError(111, lang);
    } catch (error) {
      return next(error);
    }
  }

  async isLogged(req: Request, _res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;
      const lang = req.headers['accept-language'] as AppI18nLang;

      log.start('checking if user is logged in');
      const authServices = new AuthServices();
      const user = await authServices.getUserByToken(token);

      if (user) {
        log.success('authorized operation for logged in user', user.id);
        next();
      }

      throw new AppError(111, lang);
    } catch (error) {
      return next(error);
    }
  }
}
