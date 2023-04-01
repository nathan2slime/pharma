import supertest from 'supertest';

import app from '../index';

describe('user integration', () => {
  describe('update', () => {
    let userId: string;
    let token: string;

    const newUser = {
      email: 'email@example.com',
      password: 'example',
      username: 'example',
    };

    beforeAll(async () => {
      const res = await supertest(app).post('/api/auth/signup').send(newUser);

      token = res.body.token;
      userId = res.body.user._id;
    });

    it('must update user', async () => {
      const { status, body } = await supertest(app)
        .put('/api/user/update/')
        .send({
          username: 'nathan',
        })
        .set({ authorization: token });

      expect(body.username).toBe('nathan');
      expect(status).toBe(200);
    });

    it('must return to tem update user without authorization', async () => {
      const { status, body } = await supertest(app)
        .put('/api/user/update/')
        .send({
          username: 'nathan',
        })
        .set({ authorization: null });

      expect(body).toMatchObject({ error: true, message: '113' });
      expect(status).toBe(200);
    });
  });
});
