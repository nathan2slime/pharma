import { AppError } from '@/utils/err';
import { AppI18nLang } from '@phar/i18n';

import UserModel from '@/database/schemas/user.schema';
import { UpdateUser } from '@/types/user.types';
import { log } from '@/log';

export class UserServices {
  private lang: AppI18nLang;

  constructor(lang: AppI18nLang = 'en') {
    this.lang = lang;
  }

  async update(data: UpdateUser, userId: string) {
    log.start('user update');
    log.info('looking for user with id', userId);
    const user = await UserModel.findById(userId);

    if (!user) throw new AppError(721, this.lang).getError();

    log.info('updating user with id', userId);
    const newUser = await UserModel.findByIdAndUpdate(userId, data, {
      new: true,
    });
    log.complete('user updated');

    return newUser;
  }
}
