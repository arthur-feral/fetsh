import parametizeQuery from './parametizeQuery';

describe('parametizeQuery', () => {
  it('should throw if invalid parameter', () => {
    expect(() => {
      parametizeQuery(null);
    }).toThrow('parametize query cannot take undefined or null argument');
  });
});
