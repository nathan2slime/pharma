import request from 'supertest';

import app from '../index';

describe('app integration', () => {
  it('should return status 200 when calling route /', async () => {
    const res = await request(app).get('/');

    expect(res.status).toBe(200);
  });

  it('should return object with app information when accessing route /', async () => {
    const res = await request(app).get('/');

    expect(res.body).toEqual({ title: 'Pharma', version: '0.0.1' });
  });
});
