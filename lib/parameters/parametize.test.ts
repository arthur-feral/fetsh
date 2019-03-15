import parametize from './parametize';
import parametizeUrl from './parametizeUrl';
import parametizeQuery from './parametizeQuery';

describe('parametize', () => {
  it('should format final parameters', () => {
    expect(
      parametize(
        parametizeUrl({
          name: 'url',
        }),
        parametizeQuery({
          name: 'query',
        }),
      ),
    ).toEqual({
      urlParameters: {
        name: 'url',
      },
      query: {
        name: 'query',
      },
    });
  });
});
