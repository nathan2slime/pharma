import { AppI18nLang } from '@phar/i18n';

import ProductModel, { Product } from '@/database/schemas/product.schema';
import { ProductsPaginate } from '@/types/product.types';
import { AppError } from '@/utils/err';
import { log } from '@/log';

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

  async remove(id: string) {
    log.start('remove product operation with id', id);
    log.start('looking for product with id', id);

    const product = await ProductModel.findById(id);
    if (product?.deleted_at) throw new AppError(123, this.lang).getError();

    log.complete('product found with id', product?._id);
    log.start('removing product', product?._id);

    return ProductModel.findByIdAndUpdate(id, { deleted_at: Date.now() })
      .then(() => log.complete('product has been removed'))
      .catch(err => new Error(err));
  }

  async filter(options: ProductsPaginate) {
    const { filters, search } = options;
    const queries: any = {};

    if (search) {
      queries['$and'] = [
        {
          $or: [
            { searchTitle: { $regex: search, $options: 'i' } },
            { searchDescription: { $regex: search, $options: 'i' } },
          ],
        },
      ];
    }

    if (filters?.category) {
      queries['categories._id'] = filters.category;
    }

    if (filters?.maxPrice) {
      queries['price'] = { $lte: filters.maxPrice };
    }

    queries['price'] = {
      $gte: filters?.minPrice ? filters.minPrice : 0,
      ...queries['price'],
    };

    const results = await ProductModel.paginate(queries, options);

    return results;
  }
}
