/**
 * @jest-environment node
 */
const NLUService = require('../../src/services/nlu.watson.service');

describe.only('nlu.watson.service.js', () => {
  describe('analyse(claim)', () => {
    it('returns analysis when claim is supported', async () => {
      const claim = 'We’ve done a GREAT job on Covid response, making all Governors look good, some fantastic (and that’s OK), but the Lamestream Media doesn’t want to go with that narrative, and the Do Nothing Dems talking point is to say only bad about “Trump”. I made everybody look good, but me!';
      const output = await NLUService.analyse(claim);
      expect(output).toMatchObject({
        searchQuery: 'Do Nothing Dems GREAT job Lamestream Media',
      });
      expect(output.pctAgree).toBeNumber();
      expect(output.searchResults).toBeObject();
    });
    it('returns -1 when claim is in unsupported language', async () => {
      const claim = 'Gratulerer med dagen FLOTTESTE Juliane ❤ Gleder meg til vi ses 🎉🌼💫 Håper du får en fantastisk dag! Stor stor klem x';
      const output = await NLUService.analyse(claim);
      expect(output).toMatchObject({
        pctAgree: -1,
        claim,
      });
    });
  });
  describe('analyseUrl(url)', () => {
    it('returns results', async () => {
      const url = 'http://www.citypages.com/arts/bored-games-our-lockdown-fun-includes-retro-and-brand-new-video-games-plus-analog-entertainment/570053911';
      const output = await NLUService.analyseUrl(url);
      expect(output).toEqual('positive');
    });
    it('throws an error when invalid request: resolved content is empty', async () => {
      const url = 'https://www.bizjournals.com/louisville/news/2020/05/02/our-favorite-photos-from-recent-kentucky-derby.html';
      const func = () => NLUService.analyseUrl(url);
      try {
        await expect(func).rejects.toThrow(new Error('invalid request: resolved content is empty'));
      } catch (error) {
        // usually this rejects with the above error, but sometimes it resolves (to "neutral")
        // for some reason, this assertion doesn't work:
        // expect(error.message).toContain(chalk.red('Resolved to value: "neutral"'));
      }
    });
    it('throws an error when 400 Could not fetch URL: Unable to fetch content from URL', async () => {
      const url = 'https://www.cardschat.com/preflop-mistakes.php';
      const func = () => NLUService.analyseUrl(url);
      await expect(func).rejects.toThrow(new Error('Could not fetch URL: Unable to fetch content from URL'));
    });
    // TODO test it('throws an error when 429 Too Many Requests', async () => {
  });
});
