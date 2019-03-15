import parametizeFetch from './parametizeFetch';

describe('parametizeFetch', () => {
  it('should return empty object', () => {
    expect(
      parametizeFetch(),
    ).toEqual({
      fetch: {},
    });
  });

  it('should return the parameters for fetch', () => {
    expect(
      parametizeFetch({
        name: 'value',
      }),
    ).toEqual({
      fetch: {
        name: 'value',
      },
    });
  });
});
