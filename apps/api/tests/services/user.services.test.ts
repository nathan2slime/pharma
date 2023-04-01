import { AppI18nLang } from '@phar/i18n';

import { UserServices } from '../../src/services/user.services';
import { AuthServices } from '../../src/services/auth.services';

describe('user services', () => {
  const lang: AppI18nLang = 'en';
  const userServices = new UserServices(lang);
  const authServices = new AuthServices(lang);

  const newUser = {
    email: 'example@gmail.co',
    password: 'nathan12345',
    username: 'nathan3boss',
  };

  const data = {
    favorites: ['21323'],
    saved: ['12231'],
    cart: ['ADSALD'],
    username: 'example@',
  };

  it('must update and return updated user', async () => {
    const { user } = await authServices.signup(newUser);

    const updatedUser = await userServices.update(data, user._id);

    expect(updatedUser).toMatchObject(data);
  });

  it('should return error when trying to update user that does not exist', async () => {
    const id = Math.random().toString();

    try {
      await userServices.update(data, id);
      fail();
    } catch (error) {
      expect(error.message).toBe('721');
    }
  });
});
