import { Request, Response } from 'express';

import { AuthControllers } from '../../src/controllers/auth.controllers';
import { AuthServices } from '../../src/services/auth.services';

describe('auth controllers', () => {
  let authControllers: AuthControllers;

  const _res = { json: jest.fn() } as unknown as Response;
  const _req = {
    headers: {
      'accept-language': 'en',
    },
  } as unknown as Request;

  const authenticationExpectedData = {
    user: {
      _id: 'PK8H6UMXW',
      username: 'nathan3boss',
      email: 'example@gmail.com',
      roles: ['USER', 'ADMIN'],
      created_at: '2023-03-30T21:02:01.234Z',
      updated_at: '2023-03-30T21:02:01.234Z',
      favorites: [],
      saved: [],
      cart: [],
    },
    token: 'example',
  };

  beforeEach(() => {
    const controllers = ['login', 'getUserByToken', 'signup'];

    controllers.forEach(async controller =>
      jest
        .spyOn(AuthServices.prototype, controller as any)
        .mockImplementation(() => Promise.resolve())
    );

    authControllers = new AuthControllers();
  });

  afterEach(() => jest.restoreAllMocks());

  describe('login', () => {
    const data = {
      email: 'example@gmail.com',
      password: 'example',
    };

    const req = {
      ..._req,
      body: data,
    } as unknown as Request;

    it('should call login service with correct parameters', async () => {
      await authControllers.login(req, _res);

      expect(AuthServices.prototype.login).toHaveBeenCalledWith(data);
    });

    it('should return the result of login service', async () => {
      const expected = authenticationExpectedData;

      jest
        .spyOn(AuthServices.prototype, 'login')
        .mockImplementation(() => Promise.resolve(expected));

      await authControllers.login(req, _res);

      expect(AuthServices.prototype.login).toHaveBeenCalledWith(data);
      expect(_res.json).toHaveBeenCalledWith(expected);
    });

    it('should return error triggered by login service', async () => {
      const expected = { error: true, message: '725' };

      jest.spyOn(AuthServices.prototype, 'login').mockImplementation(() => {
        throw new Error('725');
      });

      await authControllers.login(req, _res);

      expect(AuthServices.prototype.login).toHaveBeenCalledWith(data);
      expect(_res.json).toHaveBeenCalledWith(expected);
    });
  });

  describe('signup', () => {
    const data = {
      email: 'example@gmail.com',
      password: 'example',
      username: 'example',
    };

    const req = {
      ..._req,
      body: data,
    } as unknown as Request;

    it('should call signup service with correct parameters', async () => {
      await authControllers.signup(req, _res);

      expect(AuthServices.prototype.signup).toHaveBeenCalledWith(data);
    });

    it('should return the result of signup service', async () => {
      const expected = authenticationExpectedData;

      jest
        .spyOn(AuthServices.prototype, 'signup')
        .mockImplementation(() => Promise.resolve(expected));

      await authControllers.signup(req, _res);

      expect(AuthServices.prototype.signup).toHaveBeenCalledWith(data);
      expect(_res.json).toHaveBeenCalledWith(expected);
    });

    it('should return error triggered by signup service', async () => {
      const expected = { error: true, message: '727' };

      jest.spyOn(AuthServices.prototype, 'signup').mockImplementation(() => {
        throw new Error('727');
      });

      await authControllers.signup(req, _res);

      expect(AuthServices.prototype.signup).toHaveBeenCalledWith(data);
      expect(_res.json).toHaveBeenCalledWith(expected);
    });
  });

  describe('authorization', () => {
    const token = 'example';
    const req = {
      ..._req,
      headers: {
        authorization: token,
      },
    } as unknown as Request;

    it('should call getUserByToken service with correct parameters', async () => {
      await authControllers.authorization(req, _res);

      expect(AuthServices.prototype.getUserByToken).toHaveBeenCalledWith(token);
    });

    it('should return the result of getUserByToken service', async () => {
      const expected = authenticationExpectedData['user'];

      jest
        .spyOn(AuthServices.prototype, 'getUserByToken')
        .mockImplementation(() => Promise.resolve(expected));

      await authControllers.authorization(req, _res);

      expect(AuthServices.prototype.getUserByToken).toHaveBeenCalledWith(token);
      expect(_res.json).toHaveBeenCalledWith(expected);
    });

    it('should return error triggered by getUserByToken service', async () => {
      const expected = { error: true, message: '113' };

      jest
        .spyOn(AuthServices.prototype, 'getUserByToken')
        .mockImplementation(() => {
          throw new Error('113');
        });

      await authControllers.authorization(req, _res);

      expect(AuthServices.prototype.getUserByToken).toHaveBeenCalledWith(token);
      expect(_res.json).toHaveBeenCalledWith(expected);
    });
  });
});
