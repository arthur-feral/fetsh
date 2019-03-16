import { GlobalWithFetchMock } from 'jest-fetch-mock';
import request, { createUrlContract } from './request';
import {
  parametize,
  parametizeQuery,
} from './parameters';
import { CONTENT_JSON } from './constants';

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;

describe('request', () => {
  beforeEach(() => {
    global.fetch.resetMocks();
  });
  it('should work', async () => {
    global.fetch.mockResponse(
      JSON.stringify({ data: '12345' }),
      {
        headers: {
          'Content-Type': CONTENT_JSON,
        },
      },
    );
    const contract = createUrlContract({
      url: 'https://httpbin.org/get',
      adapter: (response: any) => {
        return {
          data: parseInt(response.data, 10),
        };
      },
    });
    const parameters = parametize(
      parametizeQuery({
        name: 'value',
      }),
    );
    const response = await request('get', contract, parameters);
    expect(response.data).toEqual(12345);
  });
});
