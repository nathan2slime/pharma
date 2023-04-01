import request from 'supertest';

import app from '../index';

describe('login integration', () => {
  const user = {
    email: 'example@gmail.com',
    password: '12345',
    username: 'example',
  };

  it('must create user', async () => {
    const { status, body: data } = await request(app)
      .post('/api/auth/signup')
      .send(user);

    expect(status).toBe(200);
    expect(data.user).toMatchObject({
      username: user.username,
      email: user.email,
    });
    expect(data.token).not.toBeNull();
  });

  it('should return error when trying to create user that already exists', async () => {
    await request(app).post('/api/auth/signup').send(user);

    const { status, body: data } = await request(app)
      .post('/api/auth/signup')
      .send(user);

    expect(status).toBe(200);
    expect(data).toMatchObject({
      error: true,
      message: '727',
    });
  });

  it('must create user and validate authentication token', async () => {
    const { status, body: data } = await request(app)
      .post('/api/auth/signup')
      .send(user);

    const token = data.token;

    const authdataponse = await request(app)
      .get('/api/auth/authorization')
      .set({
        authorization: token,
      });
    expect(status).toBe(200);
    expect(authdataponse.status).toBe(200);
    expect(data.user).toMatchObject({
      username: user.username,
      email: user.email,
    });
    expect(data.user).toMatchObject(authdataponse.body);
  });

  it('must create user and then login', async () => {
    const res = await request(app).post('/api/auth/signup').send(user);

    await request(app).post('/api/auth/signup').send(user);

    const { status, body: data } = await request(app)
      .post('/api/auth/login')
      .send({ email: user.email, password: user.password });

    expect(status).toBe(200);
    expect(res.status).toBe(200);
    expect(data.user).toMatchObject({
      username: user.username,
      email: user.email,
    });
    expect(data.user).toMatchObject(res.body.user);
    expect(data.token).not.toBeNull();
  });
});
