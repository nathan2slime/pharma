import { CategoryServices } from '../../src/services/category.services';
import { Category } from '../../src/database/schemas/category.schema';

describe('category services', () => {
  let categoryServices: CategoryServices;

  const newCategory = {
    name: 'Phone',
    color: '#434390',
  };

  beforeEach(() => {
    categoryServices = new CategoryServices();
  });

  describe('create', () => {
    it('must create category and return it', async () => {
      const category = await categoryServices.create(newCategory);

      expect(category).toMatchObject(newCategory);
    });
  });

  describe('remove', () => {
    let category: Category;

    beforeEach(async () => {
      category = await categoryServices.create(newCategory);

      expect(category).toMatchObject(newCategory);
    });

    it('should remove category and return error when trying to fetch information from it', async () => {
      await categoryServices.remove(`${category?._id}`);

      try {
        await categoryServices.describe(`${category._id}`);
        fail();
      } catch (error) {
        expect(error.message).toBe('632');
      }
    });

    it('should return error when trying to remove already removed category', async () => {
      await categoryServices.remove(`${category?._id}`);

      try {
        await categoryServices.remove(`${category?._id}`);
      } catch (error) {
        expect(error.message).toBe('632');
      }
    });
  });

  describe('describe', () => {
    let category: Category;

    beforeEach(async () => {
      category = await categoryServices.create(newCategory);

      expect(category).toMatchObject(newCategory);
    });
    it('must return data from a category', async () => {
      const data = await categoryServices.describe(`${category._id}`);

      expect(data).toMatchObject(newCategory);
    });

    it('should return error when receiving category id that does not exist', async () => {
      const categoryId = Math.random().toString();

      try {
        await categoryServices.describe(categoryId);
        fail();
      } catch (error) {
        expect(error.message).toBe('632');
      }
    });

    it('should return error when receiving deleted category id', async () => {
      await categoryServices.remove(`${category._id}`);

      try {
        await categoryServices.describe(`${category._id}`);

        fail();
      } catch (error) {
        expect(error.message).toBe('632');
      }
    });
  });
});
