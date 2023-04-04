import { Request, Response } from 'express';
import { AppI18nLang } from '@phar/i18n';

import { CategoryServices } from '@/services/category.services';
import { Category } from '@/database/schemas/category.schema';

export class CategoryControllers {
  async create(req: Request, res: Response) {
    try {
      const categoryServices: CategoryServices = new CategoryServices(
        req.headers['accept-language'] as AppI18nLang
      );

      const { color, name } = req.body as Category;
      const data = { color, name };

      const category = await categoryServices.create(data);

      return res.json(category);
    } catch (error) {
      return res.json({ error: true, message: error.message });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const categoryServices: CategoryServices = new CategoryServices(
        req.headers['accept-language'] as AppI18nLang
      );

      await categoryServices.remove(id);

      return res.json({ success: true });
    } catch (error) {
      return res.json({ error: true, message: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const categoryServices: CategoryServices = new CategoryServices(
        req.headers['accept-language'] as AppI18nLang
      );

      const categories = await categoryServices.getAll();

      return res.json(categories);
    } catch (error) {
      return res.json({ error: true, message: error.message });
    }
  }

  async describe(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const categoryServices: CategoryServices = new CategoryServices(
        req.headers['accept-language'] as AppI18nLang
      );

      const category = await categoryServices.describe(id);

      return res.json(category);
    } catch (error) {
      return res.json({ error: true, message: error.message });
    }
  }
}
