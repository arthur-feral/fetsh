import parametizeUrl from './parametizeUrl';

describe('parametizeUrl', () => {
  it('should throw if invalid parameter', () => {
    expect(() => {
      parametizeUrl(null);
    }).toThrow('parameter urlParameters must be an object');
    expect(() => {
      parametizeUrl(42);
    }).toThrow('parameter urlParameters must be an object');
    expect(() => {
      parametizeUrl('foo');
    }).toThrow('parameter urlParameters must be an object');
  });
});
