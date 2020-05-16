const { search } = require('../../src/services/bing.service');

describe('bing service', () => {
  it('should query bing api', async () => {
    const query = 'coronavirus';
    const responses = await search(query);
    expect(JSON.stringify(responses)).toContain(query);
  });
});
