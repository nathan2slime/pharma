import { Request, Response } from 'express';

import { ProductControllers } from '../../src/controllers/product.controllers';
import { ProductServices } from '../../src/services/product.services';

describe('product controllers', () => {
  let productControllers: ProductControllers;

  const _res = { json: jest.fn() } as unknown as Response;
  const _req = {
    headers: {
      'accept-language': 'en',
    },
  } as unknown as Request;

  const products = [
    {
      title: 'Phone',
      categories: [],
      description: 'Example',
      thumb: 'https://example.png',
      gallery: [],
      price: 230,
    },
    {
      title: 'Smash',
      categories: [],
      description: 'Example',
      thumb: 'https://example.png',
      gallery: [],
      price: 230,
    },
  ];

  beforeEach(() => {
    const controllers = ['filter', 'describe', 'create', 'update', 'remove'];

    controllers.forEach(async controller =>
      jest
        .spyOn(ProductServices.prototype, controller as any)
        .mockImplementation(() => Promise.resolve())
    );

    productControllers = new ProductControllers();
  });

  afterEach(() => jest.restoreAllMocks());

  describe('paginate', () => {
    const req = {
      ..._req,
      body: {
        filters: {},
        limit: 10,
        page: 1,
        search: '',
        sort: 'PRICE_ASC',
      },
    } as unknown as Request;

    it('should call filter product service with correct parameters', async () => {
      await productControllers.paginate(req, _res);

      expect(ProductServices.prototype.filter).toHaveBeenCalledWith(req.body);
    });

    it('should return the result of filter product service', async () => {
      const expected = [{ _id: '29103', title: 'Phone' }];
      jest
        .spyOn(ProductServices.prototype, 'filter')
        .mockImplementation(() => Promise.resolve(expected));

      await productControllers.paginate(req, _res);

      expect(_res.json).toHaveBeenCalledWith(expected);
    });
  });

  describe('describe', () => {
    const id = '3123910';
    const req = { ..._req, params: { id } } as unknown as Request;

    it('should call describe product service with correct parameters', async () => {
      await productControllers.describe(req, _res);

      expect(ProductServices.prototype.describe).toHaveBeenCalledWith(id);
    });

    it('should return the result of describe product service', async () => {
      const expected = {
        _id: '321390',
        title: 'Phone',
        description: 'Example',
      };

      jest
        .spyOn(ProductServices.prototype, 'describe')
        .mockImplementation(() => Promise.resolve(expected));

      await productControllers.describe(req, _res);

      expect(_res.json).toHaveBeenCalledWith(expected);
    });

    it('should return an error from the describe product service', async () => {
      const expectedError = new Error('123');

      jest
        .spyOn(ProductServices.prototype, 'describe')
        .mockImplementation(() => {
          throw expectedError;
        });

      await productControllers.describe(req, _res);

      expect(ProductServices.prototype.describe).toHaveBeenCalledWith(id);
      expect(_res.json).toHaveBeenCalledWith({
        error: true,
        message: expectedError.message,
      });
    });
  });

  describe('create', () => {
    const newProduct = products[0];
    const req = {
      ..._req,
      body: newProduct,
    } as unknown as Request;

    it('should call create product service with correct parameters', async () => {
      await productControllers.create(req, _res);

      expect(ProductServices.prototype.create).toHaveBeenCalledWith(
        newProduct,
        undefined
      );
    });

    it('should return the result of create product service', async () => {
      const expected = { _id: '32013', ...newProduct };
      jest
        .spyOn(ProductServices.prototype, 'create')
        .mockImplementation(() => Promise.resolve(expected));

      await productControllers.create(req, _res);

      expect(ProductServices.prototype.create).toHaveBeenCalledWith(
        newProduct,
        undefined
      );
      expect(_res.json).toHaveBeenCalledWith(expected);
    });
  });

  describe('update', () => {
    const newProduct = products[0];
    const productId = '3901381';
    const req = {
      ..._req,
      params: {
        id: productId,
      },
      body: newProduct,
    } as unknown as Request;

    it('should call update product service with correct parameters', async () => {
      await productControllers.update(req, _res);

      expect(ProductServices.prototype.update).toHaveBeenCalledWith(
        newProduct,
        productId,
        undefined
      );
    });

    it('should return the result of update product service', async () => {
      const expected = { _id: productId, ...newProduct };
      jest
        .spyOn(ProductServices.prototype, 'update')
        .mockImplementation(() => Promise.resolve(expected));

      await productControllers.update(req, _res);

      expect(ProductServices.prototype.update).toHaveBeenCalledWith(
        newProduct,
        productId,
        undefined
      );
      expect(_res.json).toHaveBeenCalledWith(expected);
    });

    it('should return error triggered by update product service', async () => {
      const expected = { error: true, message: '123' };

      jest.spyOn(ProductServices.prototype, 'update').mockImplementation(() => {
        throw new Error('123');
      });

      await productControllers.update(req, _res);

      expect(ProductServices.prototype.update).toHaveBeenCalledWith(
        newProduct,
        productId,
        undefined
      );
      expect(_res.json).toHaveBeenCalledWith(expected);
    });
  });

  describe('remove', () => {
    const id = '319230';

    const req = {
      ..._req,
      params: {
        id,
      },
    } as unknown as Request;

    it('should call remove product service with correct parameters', async () => {
      await productControllers.remove(req, _res);

      expect(ProductServices.prototype.remove).toHaveBeenCalledWith(id);
    });

    it('should return the result of remove product service', async () => {
      const expected = { success: true };

      jest
        .spyOn(ProductServices.prototype, 'remove')
        .mockImplementation(() => Promise.resolve(id));

      await productControllers.remove(req, _res);

      expect(ProductServices.prototype.remove).toHaveBeenCalledWith(id);
      expect(_res.json).toHaveBeenCalledWith(expected);
    });

    it('should return error triggered by remove product service', async () => {
      const expected = { error: true, message: '123' };

      jest.spyOn(ProductServices.prototype, 'remove').mockImplementation(() => {
        throw new Error('123');
      });

      await productControllers.remove(req, _res);

      expect(ProductServices.prototype.remove).toHaveBeenCalledWith(id);
      expect(_res.json).toHaveBeenCalledWith(expected);
    });
  });
});
