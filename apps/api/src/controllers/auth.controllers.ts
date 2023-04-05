import { Request, Response } from 'express';
import { AppI18nLang } from '@phar/i18n';

import { UserLogin } from '@/types/auth.types';

import { AuthServices } from '@/services/auth.services';
import { User } from '@/database/schemas/user.schema';

export class AuthControllers {
  async signup(req: Request, res: Response) {
    try {
      const { email, password, username } = req.body as User;

      const authServices = new AuthServices(
        req.headers['accept-language'] as AppI18nLang
      );
      const signup = await authServices.signup({
        email,
        password,
        username,
      });

      return res.json(signup);
    } catch (error) {
      return res.json({ error: true, message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body as UserLogin;

      const authServices = new AuthServices(
        req.headers['accept-language'] as AppI18nLang
      );
      const signup = await authServices.login({
        email,
        password,
      });

      return res.json(signup);
    } catch (error) {
      return res.json({ error: true, message: error.message });
    }
  }

  async authorization(req: Request, res: Response) {
    try {
      const token = req.headers.authorization;

      const authServices = new AuthServices(
        req.headers['accept-language'] as AppI18nLang
      );
      const user = await authServices.getUserByToken(token);

      return res.json(user);
    } catch (error) {
      return res.json({ error: true, message: error.message });
    }
  }
}
