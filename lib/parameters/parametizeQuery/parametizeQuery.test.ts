import parametizeQuery from './parametizeQuery';

describe('parametizeQuery', () => {
  it('should return empty object', () => {
    expect(
      parametizeQuery(),
    ).toEqual({
      query: {},
    });
  });

  it('should return the parameters for query', () => {
    expect(
      parametizeQuery({
        name: 'value',
      }),
    ).toEqual({
      query: {
        name: 'value',
      },
    });
  });
});
