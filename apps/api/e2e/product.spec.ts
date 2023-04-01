import supertest from 'supertest';

import { Product } from '../src/database/schemas/product.schema';
import UserModel from '../src/database/schemas/user.schema';
import app from '../index';

describe('product integration', () => {
  const newProduct: Product = {
    title: 'Space',
    categories: [],
    description: 'Example',
    thumb: 'https://example.com',
    gallery: [],
    price: 20,
  };

  const admin = {
    email: 'admin@gmail.com',
    password: 'admin',
  };

  describe('create routes', () => {
    let token: string;

    afterAll(async () => {
      await UserModel.findOneAndRemove({ email: admin.email });
    });

    beforeAll(async () => {
      await UserModel.create({
        email: 'admin@gmail.com',
        password: 'admin',
        username: 'admin',
        roles: ['USER', 'ADMIN'],
      });

      const { status, body } = await supertest(app)
        .post('/api/auth/login')
        .send(admin);

      token = body.token;

      expect(body.token).not.toBeNull();
      expect(status).toBe(200);
      expect(body.user.email).toBe(admin.email);
    });

    it('must create a product', async () => {
      const { status, body } = await supertest(app)
        .post('/api/product/create')
        .send(newProduct)
        .set({
          authorization: token,
        });

      expect(body).toMatchObject(newProduct);
      expect(status).toBe(200);
    });

    it('should return error when trying to create product without authorization', async () => {
      const { status, body } = await supertest(app)
        .post('/api/product/create')
        .send(newProduct);

      expect(body).toMatchObject({ error: true, message: '111' });
      expect(status).toBe(200);
    });
  });

  describe('remove', () => {
    let productId: string;
    let token: string;

    afterAll(async () => {
      await UserModel.findOneAndRemove({ email: admin.email });
    });

    beforeAll(async () => {
      await UserModel.create({
        email: 'admin@gmail.com',
        password: 'admin',
        username: 'admin',
        roles: ['USER', 'ADMIN'],
      });

      const { status, body } = await supertest(app)
        .post('/api/auth/login')
        .send(admin);

      token = body.token;

      expect(body.token).not.toBeNull();
      expect(status).toBe(200);
      expect(body.user.email).toBe(admin.email);
    });

    beforeEach(async () => {
      const res = await supertest(app)
        .post('/api/product/create')
        .send(newProduct);

      productId = res.body._id;
    });

    it('must remove product', async () => {
      const { status, body } = await supertest(app)
        .delete('/api/product/remove/' + productId)
        .set({
          authorization: token,
        });

      expect(status).toBe(200);
      expect(body).toMatchObject({ success: true });
    });

    it('should return error when trying to remove product without authorization', async () => {
      const { status, body } = await supertest(app).delete(
        '/api/product/remove/' + productId
      );

      expect(status).toBe(200);
      expect(body).toMatchObject({ error: true, message: '111' });
    });
  });

  describe('update', () => {
    afterEach(async () => {
      await UserModel.findOneAndRemove({ email: admin.email });
    });

    it('must return error when updating invalid product', async () => {
      await UserModel.create({
        email: 'admin@gmail.com',
        password: 'admin',
        username: 'admin',
        roles: ['USER', 'ADMIN'],
      });

      const login = await supertest(app).post('/api/auth/login').send(admin);

      const adminHeaders = { authorization: login.body.token };

      const { status, body } = await supertest(app)
        .put('/api/product/update/' + Math.random())
        .send({ title: 'nathan' })
        .set(adminHeaders);

      expect(status).toBe(200);
      expect(body.error).toBe(true);
      expect(body.message).toBe('123');
    });

    it('must update product and return new data', async () => {
      await UserModel.create({
        email: 'admin@gmail.com',
        password: 'admin',
        username: 'admin',
        roles: ['USER', 'ADMIN'],
      });

      const login = await supertest(app).post('/api/auth/login').send(admin);

      const adminHeaders = { authorization: login.body.token };

      const res = await supertest(app)
        .post('/api/product/create')
        .send(newProduct)
        .set(adminHeaders);

      const { status, body } = await supertest(app)
        .put('/api/product/update/' + res.body._id)
        .send({ title: 'nathan' })
        .set(adminHeaders);

      expect(status).toBe(200);
      expect(body.title).toBe('nathan');
    });
  });

  describe('describe', () => {
    let productId: string;
    let token: string;

    const admin = {
      email: 'admin@gmail.com',
      password: 'admin',
      username: 'admin',
      roles: ['USER', 'ADMIN'],
    };

    beforeAll(async () => {
      await UserModel.create(admin);

      const res = await supertest(app).post('/api/auth/login').send(admin);
      token = res.body.token;

      const { status, body } = await supertest(app)
        .post('/api/product/create')
        .send(newProduct)
        .set({
          authorization: token,
        });

      productId = body._id;

      expect(body).toMatchObject(newProduct);
      expect(status).toBe(200);
    });

    it('must return requested product data', async () => {
      const res = await supertest(app).get(
        '/api/product/describe/' + productId
      );

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(newProduct);
    });

    it('should return error when requesting non-existent product', async () => {
      const res = await supertest(app).get(
        '/api/product/describe/' + Math.random()
      );

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ error: true, message: '123' });
    });
  });
});
