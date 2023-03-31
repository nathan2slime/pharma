import { AppError } from '@/utils/err';
import { AppI18nLang } from '@phar/i18n';

import UserModel from '@/database/schemas/user.schema';
import { UpdateUser } from '@/types/user.types';

export class UserServices {
  lang: AppI18nLang;

  constructor(lang: AppI18nLang = 'en') {
    this.lang = lang;
  }

  async update(data: UpdateUser, userId: string) {
    const user = await UserModel.findById(userId);

    if (!user) throw new AppError(721).getError();

    const newUser = await UserModel.findByIdAndUpdate(userId, data, { new: true });

    return newUser;
  }
}
