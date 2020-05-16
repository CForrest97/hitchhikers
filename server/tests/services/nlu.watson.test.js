/**
 * @jest-environment node
 */

const NLUService = require('../../src/services/nlu.watson.service');

describe.skip('nlu.watson.service.js', () => {
  describe('analyse(claim)', () => {
    it('returns results', async () => {
      const claim = 'We’ve done a GREAT job on Covid response, making all Governors look good, some fantastic (and that’s OK), but the Lamestream Media doesn’t want to go with that narrative, and the Do Nothing Dems talking point is to say only bad about “Trump”. I made everybody look good, but me!';
      // const claim = 'New fire harms homes in southern California';
      const output = await NLUService.analyse(claim);
      expect(output).toStrictEqual({ score: 0 });
    }, 30000);
  });
});
