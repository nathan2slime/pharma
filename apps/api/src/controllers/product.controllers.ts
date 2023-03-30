import { AppI18nLang } from '@phar/i18n';
import { NextFunction, Request, Response } from 'express';

import { Product } from '@/database/schemas/product.schema';
import { ProductServices } from '@/services/product.services';

export class ProductControllers {
  async create(req: Request, res: Response, next: NextFunction) {
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
        req.body.admin
      );

      return res.json(product);
    } catch (error) {
      return next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const productServices = new ProductServices(
        req.headers['accept-language'] as AppI18nLang
      );
      
      const product = await productServices.remove(parseInt(id));

      return res.json(product);
    } catch (error) {
      return next(error);
    }
  }
}
