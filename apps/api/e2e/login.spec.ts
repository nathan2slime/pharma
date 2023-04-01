import request from 'supertest';

import app from '../index';

describe('login integration', () => {
  const user = {
    email: 'example@gmail.com',
    password: '12345',
    username: 'example',
  };

  beforeEach(async () => {
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

  it('must login and return user and authentication token', async () => {
    const { status, body: data } = await request(app)
      .post('/api/auth/login')
      .send({ email: user.email, password: user.password });

    expect(status).toBe(200);
    expect(data.user).toMatchObject({
      username: user.username,
      email: user.email,
    });
    expect(data.token).not.toBeNull();
  });

  it('must login with incorrect password and return error', async () => {
    const { status, body: data } = await request(app)
      .post('/api/auth/login')
      .send({ email: user.email, password: 'space' });

    expect(status).toBe(200);
    expect(data).toMatchObject({
      error: true,
      message: '725',
    });
  });

  it('must login with user that does not exist and return error', async () => {
    const { status, body: data } = await request(app)
      .post('/api/auth/login')
      .send({ email: 'astro@gmail.com', password: 'space' });

    expect(status).toBe(200);
    expect(data).toMatchObject({
      error: true,
      message: '721',
    });
  });

  it('must call and return a valid token with userid', async () => {
    const { status, body: data } = await request(app)
      .post('/api/auth/login')
      .send({ email: user.email, password: user.password });

    const token = data.token;

    const authResponse = await request(app).get('/api/auth/authorization').set({
      authorization: token,
    });
    expect(status).toBe(200);
    expect(authResponse.status).toBe(200);
    expect(data.user).toMatchObject({
      username: user.username,
      email: user.email,
    });
    expect(data.user).toMatchObject(authResponse.body);
  });
});
