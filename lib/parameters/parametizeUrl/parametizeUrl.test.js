import parametizeUrl from './parametizeUrl';

describe('parametizeUrl', () => {
  it('should throw if invalid parameter', () => {
    expect(() => {
      parametizeUrl(null);
    }).toThrow('parametize url cannot take undefined or null argument');
  });
});
