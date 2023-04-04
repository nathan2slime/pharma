import { api } from '@/api';
import { User } from '@/types/auth.types';

export class UserServices {
  async update(token: string, user: User) {
    const { data } = await api.put(
      '/api/user/update',
      { saved: user.saved, cart: user.cart },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (data.error) return;

    return data;
  }
}
