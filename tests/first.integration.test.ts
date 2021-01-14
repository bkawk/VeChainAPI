import request from 'supertest';
import { app } from '../api/app';

describe('Test PingController', () => {
  it('Request /ping should return Pong!', async () => {
    const result = await request(app)
      .get('/v1/ping')
      .send();

    expect(result.status).toBe(200);
    expect(result.body.data).toBe('Pong!');
  });
});
