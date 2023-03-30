import { AppI18nLang } from '@phar/i18n';
import bcrypt from 'bcrypt';

import UserModel, { User } from '@/database/schemas/user.schema';
import { createToken, decodeToken } from '@/utils/token';
import { AuthJWTSecret, UserLogin } from '@/types/auth.types';
import { AppError } from '@/utils/err';
import { log } from '@/log';

export class AuthServices {
  lang: AppI18nLang;

  constructor(lang: AppI18nLang = 'en') {
    this.lang = lang;
  }

  async signup(data: User) {
    const { email, password, username } = data;

    log.start('starting email verification');
    const userAlreadyExists = await UserModel.findOne({ email });
    if (!!userAlreadyExists) throw new AppError(727, this.lang);

    log.complete('verified email');
    log.start('starting user creation');

    await UserModel.create({
      email,
      password,
      username,
    });

    const user = await UserModel.findOne({ email });
    const token = await createToken({ user: user?._id });

    log.success('user created with id', user?._id);

    return { user, token };
  }

  async login(data: UserLogin) {
    const { email, password } = data;

    log.start('starting login operation');
    log.start('checking user existence');
    const user = await UserModel.findOne({ email }).select('+password');

    if (user) {
      const userData = user.toObject();

      log.complete('user found with id', userData._id);
      log.start('starting password verification');
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) throw new AppError(725, this.lang);

      const token = await createToken({ user: user._id });

      log.success('authenticated user with id', user._id);

      return { user: { ...userData, password: undefined }, token };
    }

    throw new AppError(721, this.lang);
  }

  async getUserByToken(token?: string) {
    log.start('searching for user by token');
    const sessionExpired = new AppError(113, this.lang);

    if (!token) throw sessionExpired;

    const tokenSecret = (await decodeToken(token)) as AuthJWTSecret;
    const user = await UserModel.findById(tokenSecret.user);

    if (!user) throw sessionExpired;

    log.success('user found with id');
    return user;
  }
}
