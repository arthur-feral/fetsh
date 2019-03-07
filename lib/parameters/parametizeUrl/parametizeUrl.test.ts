import parametizeUrl from './parametizeUrl';

describe('parametizeUrl', () => {
  it('should return the parameters for url', () => {
    expect(
      parametizeUrl({
        name: 'value',
      }),
    ).toEqual({
      url: {
        name: 'value',
      },
    });
  });
});
