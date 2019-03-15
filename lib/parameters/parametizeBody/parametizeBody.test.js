import parametizeBody from './parametizeBody';

describe('parametizeBody', () => {
  it('should throw if invalid parameter', () => {
    expect(() => {
      parametizeBody(null);
    }).toThrow('parameter body must be an object');
    expect(() => {
      parametizeBody(42);
    }).toThrow('parameter body must be an object');
    expect(() => {
      parametizeBody('foo');
    }).toThrow('parameter body must be an object');
  });
});
