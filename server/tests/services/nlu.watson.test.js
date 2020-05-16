/**
 * @jest-environment node
 */

const NLUService = require('../../src/services/nlu.watson.service');

describe('nlu.watson.service.js', () => {
  describe('analyse(claim)', () => {
    it('returns results', async () => {
      const claim = 'In the rugged Colorado Desert of California';
      const output = await NLUService.analyse(claim);
      expect(output).toStrictEqual({ score: 0 });
    });
  });
});
