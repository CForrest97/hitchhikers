require('dotenv').config();
const { search } = require('../../src/services/bing.service');

describe('bing service', () => {
  it('should query bing api', async () => {
    let responses;
    let error;
    const query = 'coronavirus';
    try {
      responses = await search(query);
    } catch (err) {
      error = err;
    }
    expect(error).toBeUndefined();
    expect(JSON.stringify(responses)).toContain(query);
  });
});
