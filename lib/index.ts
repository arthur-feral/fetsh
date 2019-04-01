import { RequestParameters, UrlContract } from './types';

import request, {
  createUrlContract as _createUrlContract,
} from './request';
import { HEADERS } from './constants';

export const get = (urlContract: UrlContract, requestParameters?: RequestParameters) =>
  request('get', urlContract, requestParameters);
export const post = (urlContract: UrlContract, requestParameters?: RequestParameters) =>
  request('post', urlContract, requestParameters);
export const put = (urlContract: UrlContract, requestParameters?: RequestParameters) =>
  request('put', urlContract, requestParameters);
export const patch = (urlContract: UrlContract, requestParameters?: RequestParameters) =>
  request('patch', urlContract, requestParameters);
export const del = (urlContract: UrlContract, requestParameters?: RequestParameters) =>
  request('delete', urlContract, requestParameters);
export * from './parameters';
export const createUrlContract = _createUrlContract;
export const headers = HEADERS;
