import parametizeUrl from './parametizeUrl';

describe('parametizeUrl', () => {
  it('should return empty object', () => {
    expect(
      parametizeUrl(),
    ).toEqual({
      urlParameters: {},
    });
  });

  it('should return the parameters for url', () => {
    expect(
      parametizeUrl({
        name: 'value',
      }),
    ).toEqual({
      urlParameters: {
        name: 'value',
      },
    });
  });
});
