import { AppI18nLang } from '@phar/i18n';

import { api } from '@/api';
import { AuthResponse, LoginData, SignupData, User } from '@/types/auth.types';
import { showAlert } from '@/utils/funcs';

export class AuthServices {
  private lang: AppI18nLang;

  constructor(lang: AppI18nLang) {
    this.lang = lang;
  }

  async login(payload: LoginData) {
    const { data } = await api.post('/api/auth/login', payload, {
      headers: {
        'accept-language': this.lang,
      },
    });

    if (data.error) {
      showAlert(data.message, 'danger');

      return;
    }

    return data as AuthResponse;
  }

  async signup(payload: SignupData) {
    const { data } = await api.post('/api/auth/signup', payload, {
      headers: {
        'accept-language': this.lang,
      },
    });

    if (data.error) {
      showAlert(data.message, 'danger');
      return;
    }

    return data as AuthResponse;
  }

  async auth(token: string) {
    const { data } = await api.get('/api/auth/authorization', {
      headers: {
        authorization: token,
      },
    });

    if (data.error) return;

    return data as User;
  }
}
