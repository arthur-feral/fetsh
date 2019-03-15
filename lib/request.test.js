// const { Response, Request, Headers, fetch } = require('whatwg-fetch');
// global.Response = Response;
// global.Request = Request;
// global.Headers = Headers;
// global.fetch = fetch;
// import fetsh from './request';
// import {
//   parametize,
//   parametizeQuery,
// } from './parameters';
//
// describe('request', () => {
//   it('should work', async () => {
//     const contract = {
//       url: 'https://httpbin.org/get',
//       adapter: (response) => {
//         console.log(response);
//       },
//     };
//     const parameters = parametize(
//       parametizeQuery({
//         name: 'value',
//       }),
//     );
//     const response = await fetsh(contract, parameters);
//     expect(response).toEqual({});
//   });
// });
