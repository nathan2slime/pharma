import { AppI18nLang } from '@phar/i18n';

import ProductModel, { Product } from '@/database/schemas/product.schema';
import { PriceSort, ProductsPaginate } from '@/types/product.types';
import { AppError } from '@/utils/err';
import { log } from '@/log';

export class ProductServices {
  private lang: AppI18nLang;

  constructor(lang: AppI18nLang = 'en') {
    this.lang = lang;
  }

  async create(data: Product, user?: number) {
    log.start('new product added by admin', user);
    const product = await ProductModel.create({ ...data });

    log.success('product has been added', product._id);
    return product;
  }

  async update(data: Product, id: string, user?: number) {
    log.start('update product by admin', user);
    log.start('looking for product with id', id);

    const product = await ProductModel.findById(id);

    if (!product || product.deleted_at)
      throw new AppError(123, this.lang).getError();

    log.success('product found with id', product?._id);

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      { ...data },
      { new: true }
    );

    log.success('product has been updated', updatedProduct?._id);
    return updatedProduct;
  }

  async describe(id: string) {
    log.start('looking for product with id', id);

    const product = await ProductModel.findById(id);
    if (!product || product.deleted_at)
      throw new AppError(123, this.lang).getError();

    log.success('product found with id', product?._id);

    return product;
  }

  async remove(id: string) {
    log.start('remove product operation with id', id);
    log.start('looking for product with id', id);

    const product = await ProductModel.findById(id);

    if (product?.deleted_at) throw new AppError(123, this.lang).getError();

    log.success('product found with id', product?._id);
    log.start('removing product', product?._id);

    return ProductModel.findByIdAndUpdate(id, { deleted_at: Date.now() })
      .then(() => log.success('product has been removed'))
      .catch(err => new Error(err));
  }

  async filter(options: ProductsPaginate) {
    const { filters, search, priceSort } = options;

    const queries: Record<string, object | any> = {
      deleted_at: { $exists: false },
    };

    log.start('searching products with the filter', options);

    // Creating query for name and description search
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

    // Creating query for categories
    if (filters?.category) {
      queries.categories = filters.category;
    }

    // Creating query for price ranges
    const priceQuery: Record<string, number> = {};

    if (filters?.minPrice || filters?.maxPrice) {
      priceQuery['$gte'] = filters?.minPrice || 0;
      priceQuery['$lte'] = filters?.maxPrice || Number.MAX_SAFE_INTEGER;
      queries.price = priceQuery;
    }

    // Creating a price sort query
    const priceSortQuery: Record<string, number> = {};

    if (priceSort === PriceSort.PRICE_ASC) {
      priceSortQuery.price = 1;
    } else if (priceSort === PriceSort.PRICE_DESC) {
      priceSortQuery.price = -1;
    }

    const results = await ProductModel.paginate(queries, {
      ...options,
      sort: priceSortQuery,
    });

    log.success(results.totalDocs + ' products found');

    return results;
  }
}
