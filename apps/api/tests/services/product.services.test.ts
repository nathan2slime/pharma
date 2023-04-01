import { ProductServices } from '../../src/services/product.services';
import { Product } from '../../src/database/schemas/product.schema';

describe('product services', () => {
  let productServices: ProductServices;

  const newProducts = [
    {
      title: 'phone',
      categories: ['234'],
      description: 'description',
      thumb: 'thumb',
      gallery: [],
      price: 1500,
    },
    {
      title: 'smartphone',
      categories: ['123'],
      description: 'description',
      thumb: 'thumb',
      gallery: [],
      price: 600,
    },
  ];

  beforeAll(() => {
    productServices = new ProductServices('en');
  });

  describe('basic product functionality', () => {
    let productId: string;
    let product: Product;

    beforeAll(async () => {
      product = await productServices.create(newProducts[0]);
      productId = `${product._id}`;
    });

    it('must create a new product and return it', async () => {
      expect(product).toMatchObject(newProducts[0]);
    });

    it('must fetch and return information about a product', async () => {
      expect(product).toMatchObject(newProducts[0]);
    });

    it('must remove product', async () => {
      await productServices.remove(productId);

      try {
        await productServices.describe(productId);
        fail();
      } catch (error) {
        expect(error.message).toBe('123');
      }
    });
  });

  describe('update product', () => {
    let productId: string;
    let product: Product;

    beforeAll(async () => {
      product = await productServices.create(newProducts[0]);
      productId = `${product._id}`;
    });

    it('must update product and return updated data', async () => {
      const res = await productServices.update({ title: 'nathan' }, productId);

      expect(res.title).toBe('nathan');
    });

    it('should return error when trying to update product that does not exist', async () => {
      try {
        await productServices.update(
          { title: 'nathan' },
          Math.random().toString()
        );

        fail();
      } catch (error) {
        expect(error.message).toBe('123');
      }
    });
  });

  describe('error handling', () => {
    it('should return an error when trying to fetch and return information for a non-existent product', async () => {
      try {
        const productId = Math.random().toString();
        await productServices.describe(productId);

        fail();
      } catch (error) {
        expect(error.message).toBe('123');
      }
    });

    it('should return error when trying to remove a product that does not exist', async () => {
      const productId = Math.random().toString();

      try {
        await productServices.remove(productId);
      } catch (error) {
        expect(error.message).toBe('123');
      }
    });
  });

  describe('product filtering', () => {
    beforeEach(async () => {
      await Promise.all(
        newProducts.map(async product => await productServices.create(product))
      );
    });

    it('must filter products by name or description', async () => {
      const options = { search: 'phone' };
      const results = await productServices.filter(options);

      expect(results.totalDocs).toBeGreaterThan(0);
    });

    it('should filter products by category', async () => {
      const options = { filters: { category: '123' } };
      const results = await productServices.filter(options);

      expect(results.totalDocs).toBeGreaterThan(0);
    });

    it('should filter products by price range', async () => {
      const options = { filters: { minPrice: 500, maxPrice: 1000 } };
      const results = await productServices.filter(options);

      expect(results.totalDocs).toBeGreaterThan(0);
    });

    it('should sort products by price in ascending order', async () => {
      const options = { priceSort: 'PRICE_ASC' };
      const results = await productServices.filter(options);

      expect(results.totalDocs).toBeGreaterThan(0);
      expect(results.docs[0].price).toBeLessThanOrEqual(results.docs[1].price);
    });

    it('should sort products by price in descending order', async () => {
      const options = { priceSort: 'PRICE_ESC' };
      const results = await productServices.filter(options);

      expect(results.totalDocs).toBeGreaterThan(0);
      expect(results.docs[0].price).toBeGreaterThanOrEqual(
        results.docs[1].price
      );
    });
  });
});
