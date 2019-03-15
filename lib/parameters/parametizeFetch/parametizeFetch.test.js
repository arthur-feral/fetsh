import parametizeFetch from './parametizeFetch';

describe('parametizeFetch', () => {
  it('should throw if invalid parameter', () => {
    expect(() => {
      parametizeFetch(null);
    }).toThrow('parameter fetchOptions must be an object');
    expect(() => {
      parametizeFetch(42);
    }).toThrow('parameter fetchOptions must be an object');
    expect(() => {
      parametizeFetch('foo');
    }).toThrow('parameter fetchOptions must be an object');
  });
});
