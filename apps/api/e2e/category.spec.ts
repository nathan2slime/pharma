import supertest from 'supertest';

import UserModel from '../src/database/schemas/user.schema';
import app from '../index';

describe('category integration', () => {
  const admin = {
    email: 'admin@gmail.com',
    password: 'admin',
  };

  describe('create', () => {
    let token: string;

    const newCategory = {
      name: 'product',
      color: '#F90F90',
    };

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

    it('should create new category', async () => {
      const res = await supertest(app)
        .post('/api/category/create')
        .send(newCategory)
        .set({ authorization: token });

      expect(res.body).toMatchObject(newCategory);
      expect(res.status).toBe(200);
    });
  });

  describe('remove', () => {
    const newCategory = {
      name: 'product',
      color: '#F90F90',
    };

    afterAll(async () => {
      await UserModel.findOneAndRemove({ email: admin.email });
    });

    it('must remove a category', async () => {
      await UserModel.create({
        email: 'admin@gmail.com',
        password: 'admin',
        username: 'admin',
        roles: ['USER', 'ADMIN'],
      });

      const login = await supertest(app).post('/api/auth/login').send(admin);

      const token = login.body.token;

      expect(login.body.token).not.toBeNull();
      expect(login.status).toBe(200);
      expect(login.body.user.email).toBe(admin.email);

      const res = await supertest(app)
        .post('/api/category/create')
        .send(newCategory)
        .set({ authorization: token });

      expect(res.body).toMatchObject(newCategory);
      expect(res.status).toBe(200);

      const { status, body } = await supertest(app)
        .delete('/api/category/remove/' + res.body._id)
        .set({ authorization: token });

      expect(body).toMatchObject({ success: true });
      expect(status).toBe(200);
    });

    it("should return error when trying to remove a category that doesn't exist", async () => {
      await UserModel.create({
        email: 'admin@gmail.com',
        password: 'admin',
        username: 'admin',
        roles: ['USER', 'ADMIN'],
      });

      const login = await supertest(app).post('/api/auth/login').send(admin);

      const token = login.body.token;

      expect(login.body.token).not.toBeNull();
      expect(login.status).toBe(200);
      expect(login.body.user.email).toBe(admin.email);

      const { status, body } = await supertest(app)
        .delete('/api/category/remove/' + Math.random())
        .set({ authorization: token });

      expect(body).toMatchObject({ error: true, message: '632' });
      expect(status).toBe(200);
    });
  });
});
