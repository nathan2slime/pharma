import { AppI18nLang } from '@phar/i18n';

import ProductModel, { Product } from '@/database/schemas/product.schema';
import { log } from '@/log';
import { AppError } from '@/utils/err';

export class ProductServices {
  lang: AppI18nLang;

  constructor(lang: AppI18nLang = 'en') {
    this.lang = lang;
  }

  async create(data: Product, user: number) {
    log.start('new product added by admin', user);
    const product = await ProductModel.create({ ...data });

    log.success('product has been added', product._id);
    return product;
  }

  async remove(id: number) {
    log.start('remove product operation with id', id);
    log.start('looking for product with id', id);

    const product = await ProductModel.findById(id);
    if (!product) throw new AppError(1423, this.lang);

    log.complete('product found with id', product?._id);
    log.start('removing product', product?._id);

    return ProductModel.findByIdAndUpdate(id, { deleted_at: Date.now() })
      .then(() => log.complete('product has been removed'))
      .catch(err => new Error(err));
  }
}
