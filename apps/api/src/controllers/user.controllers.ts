import { Request, Response } from 'express';
import { AppI18nLang } from '@phar/i18n';

import { UserServices } from '@/services/user.services';
import { UpdateUser } from '@/types/user.types';

export class UserControllers {
  async update(req: Request, res: Response) {
    try {
      const { username, favorites, cart, saved } = req.body as UpdateUser;

      const userServices = new UserServices(
        req.headers['accept-language'] as AppI18nLang
      );

      const user = await userServices.update(
        {
          username,
          favorites,
          cart,
          saved,
        },
        req.body.userId
      );

      return res.json(user);
    } catch (error) {
      return res.json({ error: true, message: error.message });
    }
  }
}
