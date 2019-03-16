import request, { createUrlFromContract } from './request';
import {
  parametize,
  parametizeQuery,
} from './parameters';
import { CONTENT_JSON } from './constants';
import { GlobalWithFetchMock } from 'jest-fetch-mock';


const customGlobal = global;
customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;

global.fetch = require('jest-fetch-mock');
global.fetchMock = customGlobal.fetch;

describe('request', () => {
  beforeEach(() => {
    global.fetch.resetMocks();
  });
  describe('bad params', () => {
    it('should throw', () => {
      expect(() => {
        request();
      }).toThrow('[fetsh][Error] HTTP method is incorrect, got undefined');
    });

    it('should throw', () => {
      expect(() => {
        request('foo');
      }).toThrow('[fetsh][Error] HTTP method is incorrect, must be one of get,post,patch,put,delete');
    });

    it('should throw', () => {
      expect(() => {
        request('get');
      }).toThrow('[fetsh][Error] Missing parameter url');
    });
  });
});
