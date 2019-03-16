import {
  parametize,
  parametizeUrl,
  parametizeQuery,
  parametizeBody,
  parametizeFetch,
  createUrlContract,
  get,
  put,
  patch,
  post,
  del,
} from './index';

const URL_CONTRACT = createUrlContract({
  url: 'https://endpoint.ext/resourceName/${id}',
});
describe('Index', () => {
  it('should export parametize', () => {
    expect(
      parametize(
        parametizeUrl({
          id: '1',
        }),
        parametizeQuery({
          include: 'messages',
        }),
        parametizeBody({
          login: 'login',
          password: 'password',
        }),
        parametizeFetch({
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      ),
    ).toEqual({
      urlParameters: {
        id: '1',
      },
      query: {
        include: 'messages',
      },
      body: {
        login: 'login',
        password: 'password',
      },
      fetch: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    });
  });

  it('should export get', async () => {
    expect(async () => {
      try {
        await get(
          URL_CONTRACT,
          parametize(
            parametizeUrl({
              id: '1',
            }),
          ),
        );
      } catch (e) {
        throw e;
      }
    }).not.toThrow();
  });

  it('should export post', async () => {
    expect(async () => {
      try {
        await post(
          URL_CONTRACT,
          parametize(
            parametizeUrl({
              id: '1',
            }),
          ),
        );
      } catch (e) {
        throw e;
      }
    }).not.toThrow();
  });

  it('should export patch', async () => {
    expect(async () => {
      try {
        await patch(
          URL_CONTRACT,
          parametize(
            parametizeUrl({
              id: '1',
            }),
          ),
        );
      } catch (e) {
        throw e;
      }
    }).not.toThrow();
  });

  it('should export put', async () => {
    expect(async () => {
      try {
        await put(
          URL_CONTRACT,
          parametize(
            parametizeUrl({
              id: '1',
            }),
          ),
        );
      } catch (e) {
        throw e;
      }
    }).not.toThrow();
  });

  it('should export del', async () => {
    expect(async () => {
      try {
        await del(
          URL_CONTRACT,
          parametize(
            parametizeUrl({
              id: '1',
            }),
          ),
        );
      } catch (e) {
        throw e;
      }
    }).not.toThrow();
  });
});
