import { AppI18nLang } from '@phar/i18n';
import { Request, Response } from 'express';

import { Product } from '@/database/schemas/product.schema';
import { ProductServices } from '@/services/product.services';
import { ProductsPaginate } from '@/types/product.types';

export class ProductControllers {
  async paginate(req: Request, res: Response) {
    const { filters, limit, page, search, priceSort } =
      req.body as ProductsPaginate;

    try {
      const productServices = new ProductServices();
      const products = await productServices.filter({
        filters,
        limit,
        page,
        search,
        priceSort,
      });

      return res.json(products);
    } catch (error) {
      return res.json({ error: true, message: error.message });
    }
  }

  async describe(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const productServices = new ProductServices();
      const products = await productServices.describe(id);

      return res.json(products);
    } catch (error) {
      return res.json({ error: true, message: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { title, categories, description, gallery, price, thumb } =
        req.body as Product;

      const productServices = new ProductServices(
        req.headers['accept-language'] as AppI18nLang
      );
      const product = await productServices.create(
        {
          title,
          categories,
          description,
          gallery,
          price,
          thumb,
        },
        req.body.adminId
      );

      return res.json(product);
    } catch (error) {
      return res.json({ error: true, message: error.message });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const productServices = new ProductServices(
        req.headers['accept-language'] as AppI18nLang
      );

      await productServices.remove(id);

      return res.json({ success: true });
    } catch (error) {
      return res.json({ error: true, message: error.message });
    }
  }
}
