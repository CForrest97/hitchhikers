/**
 * @jest-environment node
 */

const supertest = require('supertest');

const app = require('../../src/app');

describe('API tests', () => {
  describe('/', () => {
    it('returns status 200', async () => {
      const res = await supertest(app()).get('/');
      expect(res.status).toEqual(200);
      expect(res.text).toStrictEqual('hello world');
    });
  });
  describe('/analyze', () => {
    it('returns status 200', async () => {
      const res = await supertest(app())
        .post('/analyse')
        .send({
          origin: 'foo',
          claim: 'In the rugged Colorado Desert of California',
        });
      expect(res.status).toEqual(200);
      expect(res.body).toStrictEqual({ score: 0 });
    });
  });
});
