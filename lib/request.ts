import 'whatwg-fetch';
import get from 'lodash/get';
import urlFormater from './urlFormater';
import {
  LOG_ERROR_PREFIX,
  CONTENT_JSON,
  CONTENT_JSONAPI,
  VERBS,
} from './constants';
import { getErrorWithStatus } from './errors';
import {
  UrlContract,
  Adapter,
  RequestResponse,
  RequestParameters,
} from './types';
import { getFetchParameters } from './parameters/parametize';

type $RequestResponse = RequestResponse & {
  [index: string]: any;
};

type $UrlContract = UrlContract & {
  url: string;
  adapter?: Adapter;
};

export const createUrlContract = (urlContract: object): UrlContract => {
  return urlContract as $UrlContract;
};

const getUrlFromContract = (urlContract: UrlContract | string): string => {
  const contract = urlContract as $UrlContract;

  return contract.url;
};

const getAdapterFromContract = (urlContract: UrlContract | string): Adapter => {
  const contract = urlContract as $UrlContract;

  return contract.adapter || (response => response) as Adapter;
};

const request = (verb: string, url: string, adapter: Adapter, requestParameters: RequestParameters): Promise<any> => {
  const method = verb.toUpperCase();
  // const abortAvailable = window.AbortController !== undefined;
  // let abortController;
  // let signal;

  // if (abortAvailable) {
  //   abortController = new window.AbortController();
  //   signal = abortController.signal;
  // }

  const fetchParameters = getFetchParameters(requestParameters);
  const customHeaders = get(fetchParameters, 'headers', {});
  const isCrossDomain = get(fetchParameters, 'isCrossDomain', false);
  const useCredentials = get(fetchParameters, 'useCredentials', false);
  const headers = {
    ...customHeaders,
    'Content-Type': get(fetchParameters, 'contentType', CONTENT_JSON),
  };

  let options: any = {
    headers,
    method,
    mode: 'no-cors',
    credentials: 'omit',
  };

  // if (signal) {
  //   options.signal = signal;
  // }

  if (isCrossDomain) {
    options.mode = 'cors';
  }

  if (useCredentials) {
    if (isCrossDomain) {
      options.credentials = 'include';
    } else {
      options.credentials = 'same-origin';
    }
  }

  if (['GET', 'DELETE'].indexOf(method) === -1) {
    const body = get(requestParameters, 'body', {});
    options.body = JSON.stringify(body);
  }

  options = Object.assign(
    options,
    fetchParameters,
  );

  const requestPromise = window.fetch(
    url,
    options,
  ).then((response: any) => {
    const buildResult = (body: any) => [body, response.ok, response.status, response.type];

    if (
      response.headers
      && response.headers.get('Content-Type')
      && [CONTENT_JSON, CONTENT_JSONAPI].includes(response.headers.get('Content-Type'))
    ) {
      return response.json().then(buildResult);
    }
    if (
      response.headers
      && response.headers.get('Content-Type')
      && response.headers.get('Content-Type').indexOf('text') !== -1
    ) {
      return response.text().then(buildResult);
    }

    return response.blob().then(buildResult);
  }).then(([requestResponse, isSuccess, status, type]) => {
    const body = (requestResponse || {}) as $RequestResponse;
    if (isSuccess) {
      return adapter(body);
    }

    throw getErrorWithStatus(
      body,
      status,
      type,
    );
  }).catch((error) => {
    throw error;
  });

  // requestPromise.abort = abortAvailable ? abortController.abort : noop;

  return requestPromise;
};

const prepareRequest = (verb: string, urlContract: UrlContract, requestParameters: RequestParameters): Promise<any> => {
  if (!verb || typeof verb !== 'string') {
    throw new Error(`${LOG_ERROR_PREFIX} HTTP method is incorrect, got ${typeof verb}`);
  }

  if (VERBS.indexOf(verb) === -1) {
    throw new Error(`${LOG_ERROR_PREFIX} HTTP method is incorrect, must be one of ${VERBS.join(',')}`);
  }

  if (!urlContract) {
    throw new Error(`${LOG_ERROR_PREFIX} Missing parameter url`);
  }

  const urlRaw = getUrlFromContract(urlContract);
  const adapter = getAdapterFromContract(urlContract);
  const url = urlFormater(urlRaw, requestParameters);

  return request(verb, url, adapter, requestParameters);
};

export const createRequestResponse = (response: object = {}): RequestResponse => {
  return response as $RequestResponse;
};

export default prepareRequest;
