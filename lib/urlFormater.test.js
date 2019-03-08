import urlFormater, {
  prepareQueryParameters,
  applyUrlParameters,
  applyUrlQueryParameters,
} from './urlFormater';

describe('urlFormater', () => {
  describe('prepareQueryParameters', () => {
    it('should return an empty string', () => {
      expect(() => {
        prepareQueryParameters(null);
      }).toThrow;
    });
  });
});
