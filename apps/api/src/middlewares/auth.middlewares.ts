import { AppI18nLang } from '@phar/i18n';
import { NextFunction, Request, Response } from 'express';

import { AuthServices } from '@/services/auth.services';
import { UserRole } from '@/types/auth.types';
import { AppError } from '@/utils/err';
import { log } from '@/log';

export class AuthMiddlewares {
  async isAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;
      const lang = req.headers['accept-language'] as AppI18nLang;

      log.start('checking authorization for token', token);

      const authServices = new AuthServices();

      const user = await authServices.getUserByToken(token);

      if (!user) throw new AppError(111, lang).getError();

      const isAdmin = user.roles?.find(role => role == UserRole.ADMIN);

      if (isAdmin) {
        req.body.adminId = user._id;

        log.success('authorized operation for user', user._id);
        return next();
      }

      throw new AppError(111, lang).getError();
    } catch (error) {
      return res.json({ error: true, message: error.message });
    }
  }

  async isLogged(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;
      const lang = req.headers['accept-language'] as AppI18nLang;

      log.start('checking if user is logged in');
      const authServices = new AuthServices();
      const user = await authServices.getUserByToken(token);

      if (user) {
        req.body.userId = user._id;
        log.success('authorized operation for logged in user', user.id);
        return next();
      }

      throw new AppError(111, lang).getError();
    } catch (error) {
      return res.json({ error: true, message: error.message });
    }
  }
}
