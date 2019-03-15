import parametizeQuery from './parametizeQuery';

describe('parametizeQuery', () => {
  it('should throw if invalid parameter', () => {
    expect(() => {
      parametizeQuery(null);
    }).toThrow('parameter query must be an object');
    expect(() => {
      parametizeQuery(42);
    }).toThrow('parameter query must be an object');
    expect(() => {
      parametizeQuery('foo');
    }).toThrow('parameter query must be an object');
  });
});
