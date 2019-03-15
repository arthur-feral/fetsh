import parametizeBody from './parametizeBody';

describe('parametizeBody', () => {
  it('should return empty object', () => {
    expect(
      parametizeBody(),
    ).toEqual({
      body: {},
    });
  });

  it('should return the parameters for body', () => {
    expect(
      parametizeBody({
        name: 'value',
      }),
    ).toEqual({
      body: {
        name: 'value',
      },
    });
  });
});
