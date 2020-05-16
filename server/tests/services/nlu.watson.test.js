/**
 * @jest-environment node
 */

const NLUService = require('../../src/services/nlu.watson.service');

describe('nlu.watson.service.js', () => {
  describe('analyse(claim)', () => {
    it('returns results', async () => {
      const claim = 'We’ve done a GREAT job on Covid response, making all Governors look good, some fantastic (and that’s OK), but the Lamestream Media doesn’t want to go with that narrative, and the Do Nothing Dems talking point is to say only bad about “Trump”. I made everybody look good, but me!';
      const output = await NLUService.analyse(claim);
      expect(output).toMatchObject({
        pctAgree: 80,
        searchQuery: 'Do Nothing Dems GREAT job Lamestream Media',
      });
    }, 30000);
  });
});
