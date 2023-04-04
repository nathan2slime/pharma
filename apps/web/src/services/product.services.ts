import { AppI18nLang } from '@phar/i18n';

import { api } from '@/api';

import { showAlert } from '@/utils/funcs';
import {
  CategoryProductResponse,
  ProductFilterResponse,
  ProductType,
  ProductsFilterParams,
} from '@/types/product.types';

export class ProductServices {
  private lang: AppI18nLang;

  constructor(lang: AppI18nLang) {
    this.lang = lang;
  }

  async filter(
    payload: ProductsFilterParams = {
      page: 1,
      limit: 20,
    }
  ) {
    const { data } = await api.post('/api/product', payload, {
      headers: {
        'accept-language': this.lang,
      },
    });

    if (data.error) {
      if (data.error) showAlert(data.message, 'danger');

      return;
    }

    return data as ProductFilterResponse;
  }

  async getById(id: string) {
    const { data } = await api.get('/api/product/describe/' + id, {
      headers: {
        'accept-language': this.lang,
      },
    });

    if (data.error) return;

    return data as ProductType;
  }

  async fetchCategories() {
    const { data } = await api.get<CategoryProductResponse>(
      '/api/category/all',
      {
        headers: {
          'accept-language': this.lang,
        },
      }
    );

    return data;
  }

  async fetchCategory(id: string) {
    const { data } = await api.get('/api/category/describe/' + id, {
      headers: {
        'accept-language': this.lang,
      },
    });

    if (data.error) return;

    return data;
  }
}
