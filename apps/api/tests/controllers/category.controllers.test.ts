import { Request, Response } from 'express';

import { CategoryControllers } from '../../src/controllers/category.controllers';
import { CategoryServices } from '../../src/services/category.services';
import { Category } from '../../src/database/schemas/category.schema';

describe('category controllers', () => {
  let categoryControllers: CategoryControllers;

  const _res = { json: jest.fn() } as unknown as Response;
  const _req = {
    headers: {
      'accept-language': 'en',
    },
  } as unknown as Request;

  const category = {
    _id: 'PK8H6UMXW',
    name: 'Nathan',
    color: '#3AC123',
    created_at: '2023-03-30T21:02:01.234Z',
    updated_at: '2023-03-30T21:02:01.234Z',
  };

  beforeEach(() => {
    const controllers = ['remove', 'describe', 'create'];

    controllers.forEach(async controller =>
      jest
        .spyOn(CategoryServices.prototype, controller as any)
        .mockImplementation(() => Promise.resolve())
    );

    categoryControllers = new CategoryControllers();
  });

  afterEach(() => jest.restoreAllMocks());

  describe('create', () => {
    const data: Category = {
      name: 'App',
      color: '#3AC123',
    };

    const req = {
      ..._req,
      body: data,
    } as unknown as Request;

    it('should call create service with correct parameters', async () => {
      await categoryControllers.create(req, _res);

      expect(CategoryServices.prototype.create).toHaveBeenCalledWith(data);
    });

    it('should return the result of create service', async () => {
      jest
        .spyOn(CategoryServices.prototype, 'create')
        .mockImplementation(() => Promise.resolve(category));

      await categoryControllers.create(req, _res);

      expect(CategoryServices.prototype.create).toHaveBeenCalledWith(data);
      expect(_res.json).toHaveBeenCalledWith(category);
    });
  });

  describe('remove', () => {
    const id = 'CDAKLDSD';

    const req = {
      ..._req,
      body: {},
      params: {
        id,
      },
    } as unknown as Request;

    it('should call remove category service with correct parameters', async () => {
      await categoryControllers.remove(req, _res);

      expect(CategoryServices.prototype.remove).toHaveBeenCalledWith(id);
    });

    it('should return the result of category remove service', async () => {
      const expected = { success: true };
      jest
        .spyOn(CategoryServices.prototype, 'remove')
        .mockImplementation(() => Promise.resolve(expected));

      await categoryControllers.remove(req, _res);

      expect(CategoryServices.prototype.remove).toHaveBeenCalledWith(id);
      expect(_res.json).toHaveBeenCalledWith(expected);
    });

    it('should return error triggered by category service', async () => {
      const expected = { error: true, message: '632' };

      jest
        .spyOn(CategoryServices.prototype, 'remove')
        .mockImplementation(() => {
          throw new Error('632');
        });

      await categoryControllers.remove(req, _res);

      expect(CategoryServices.prototype.remove).toHaveBeenCalledWith(id);
      expect(_res.json).toHaveBeenCalledWith(expected);
    });
  });

  describe('describe', () => {
    const id = 'CDAKLDSD';

    const req = {
      ..._req,
      body: {},
      params: {
        id,
      },
    } as unknown as Request;

    it('should call describe category service with correct parameters', async () => {
      await categoryControllers.describe(req, _res);

      expect(CategoryServices.prototype.describe).toHaveBeenCalledWith(id);
    });

    it('should return the result of category describe service', async () => {
      const expected = category;

      jest
        .spyOn(CategoryServices.prototype, 'describe')
        .mockImplementation(() => Promise.resolve(expected));

      await categoryControllers.describe(req, _res);

      expect(CategoryServices.prototype.describe).toHaveBeenCalledWith(id);
      expect(_res.json).toHaveBeenCalledWith(expected);
    });

    it('should return error triggered by category service', async () => {
      const expected = { error: true, message: '632' };

      jest
        .spyOn(CategoryServices.prototype, 'describe')
        .mockImplementation(() => {
          throw new Error('632');
        });

      await categoryControllers.describe(req, _res);

      expect(CategoryServices.prototype.describe).toHaveBeenCalledWith(id);
      expect(_res.json).toHaveBeenCalledWith(expected);
    });
  });
});
