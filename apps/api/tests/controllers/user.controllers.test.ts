import { Request, Response } from 'express';

import { UserControllers } from '../../src/controllers/user.controllers';
import { UserServices } from '../../src/services/user.services';

describe('user controllers', () => {
  let userControllers: UserControllers;

  const _res = { json: jest.fn() } as unknown as Response;
  const _req = {
    headers: {
      'accept-language': 'en',
    },
  } as unknown as Request;

  beforeEach(() => {
    const controllers = ['update'];

    controllers.forEach(async controller =>
      jest
        .spyOn(UserServices.prototype, controller as any)
        .mockImplementation(() => Promise.resolve())
    );

    userControllers = new UserControllers();
  });

  afterEach(() => jest.restoreAllMocks());

  describe('update', () => {
    const user = {
      username: 'finalboss',
    };
    const userId = '3019230';

    const req = {
      ..._req,
      body: { ...user, userId },
    } as unknown as Request;

    it('must call update user service with correct parameters', async () => {
      await userControllers.update(req, _res);

      expect(UserServices.prototype.update).toHaveBeenCalledWith(user, userId);
    });

    it('should return the result of update user service', async () => {
      const expected = [{ _id: '31230', email: 'example@gmail.com', ...user }];

      jest
        .spyOn(UserServices.prototype, 'update')
        .mockImplementation(() => Promise.resolve(expected));

      await userControllers.update(req, _res);

      expect(UserServices.prototype.update).toHaveBeenCalledWith(user, userId);
      expect(_res.json).toHaveBeenCalledWith(expected);
    });

    it('should return error triggered by update user service', async () => {
      const expected = { error: true, message: '721' };

      jest.spyOn(UserServices.prototype, 'update').mockImplementation(() => {
        throw new Error('721');
      });

      await userControllers.update(req, _res);

      expect(UserServices.prototype.update).toHaveBeenCalledWith(user, userId);
      expect(_res.json).toHaveBeenCalledWith(expected);
    });
  });
});
