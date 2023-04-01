import { AppI18nLang } from '@phar/i18n';

import CategoryModel, { Category } from '@/database/schemas/category.schema';
import { log } from '@/log';
import { AppError } from '@/utils/err';

export class CategoryServices {
  private lang: AppI18nLang;

  constructor(lang: AppI18nLang = 'en') {
    this.lang = lang;
  }

  async create(data: Category) {
    log.start('starting category creation');
    const res = await CategoryModel.create({
      color: data.color,
      name: data.name,
    });

    log.complete('category created');
    return res;
  }

  async describe(id: string) {
    log.start('looking for category with id', id);

    const category = await CategoryModel.findById(id);
    if (!category || category.deleted_at)
      throw new AppError(632, this.lang).getError();

    log.success('category found with id', category?._id);

    return category;
  }

  async remove(id: string) {
    log.start('searching category with id', id);
    const res = await CategoryModel.findById(id);

    if (!res || res.deleted_at) throw new AppError(632).getError();
    log.complete('category found', res.toObject());
    log.start('removing category');

    return CategoryModel.findByIdAndUpdate(id, { deleted_at: Date.now() })
      .then(() => log.success('category has been removed'))
      .catch(err => new Error(err));
  }
}
