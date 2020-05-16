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
          claim: 'The Mueller probe was launched not to find wrongdoing from the Trump administration, but to cover up wrongdoing by Mueller\'s colleagues, by his protege James Comey, by the corrupt Obama administration Department of Justice',
        });
      expect(res.status).toEqual(200);
      expect(res.body).toMatchObject({
        pctAgree: 25,
        searchQuery: 'Trump administration Mueller probe wrongdoing',
      });
    });
  });
});
