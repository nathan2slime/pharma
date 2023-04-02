import { AppI18nLang } from '@phar/i18n';

import { api } from '@/api';

import { showAlert } from '@/utils/funcs';
import { ProductFilterResponse } from '@/types/product.types';

export class ProductServices {
  private lang: AppI18nLang;

  constructor(lang: AppI18nLang) {
    this.lang = lang;
  }

  async filter() {
    const { data } = await api.post(
      '/api/product',
      {
        limit: 20,
        page: 1,
      },
      {
        headers: {
          'accept-language': this.lang,
        },
      }
    );

    if (data.error) {
      if (data.error) showAlert(data.message, 'danger');

      return;
    }

    return data as ProductFilterResponse;
  }
}
