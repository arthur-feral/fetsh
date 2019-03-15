import jsdom from 'jsdom';

const { JSDOM } = jsdom;
const globalAny: any = global;

const doc = new JSDOM(`
<!doctype html>
<html>
    <body></body>
</html>
`);

globalAny.window = doc.window;

import request, { createUrlFromContract } from './request';
import {
  parametize,
  parametizeQuery,
} from './parameters';

describe('request', () => {
  it('should work', async () => {
    const contract = createUrlFromContract({
      url: 'https://httpbin.org/get',
      adapter: (response: object) => {
        console.log(response);
      },
    });
    const parameters = parametize(
      parametizeQuery({
        name: 'value',
      }),
    );
    const response = await request('get', contract, parameters);
    expect(response).toEqual({});
  });
});
