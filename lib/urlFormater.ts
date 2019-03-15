import queryString from 'query-string';
import reduce from 'lodash/reduce';
import { parse as parseUrl } from 'url';
import { QueryParameters, UrlParameters } from './types';
import { URL_VARIABLE_REGEXP } from './constants';
import has from 'lodash/has';
import omit from 'lodash/omit';
import size from 'lodash/size';
import { getUrlParameters } from './parameters/parametizeUrl/parametizeUrl';
import { getQueryParameters } from './parameters/parametizeQuery/parametizeQuery';

export const prepareQueryParameters = (queryParameters: object = {}): string => {
  if (typeof queryParameters !== 'object') {
    throw new Error(`Invalid query parameters: expected an object, got ${queryParameters}`);
  }

  return queryString.stringify(
    reduce(
      queryParameters,
      (result, value: any, param) => ({
        ...result,
        [param]: Array.isArray(value) ? value.join(',') : value,
      }),
      {},
    ),
  );
};

export const applyUrlQueryParameters = (url: string, queryParameters: object = {}): string => {
  const parsedUrl = parseUrl(url);

  if (Object.keys(queryParameters).length === 0) {
    return url;
  }

  let result = url;

  const urlQueryParameters = queryString.parse(parsedUrl.query || '');
  if (Object.keys(urlQueryParameters).length === 0) {
    if (url.indexOf('?') === -1) {
      result = `${result}?`;
    }
  }

  if (Object.keys(urlQueryParameters).length !== 0) {
    result = `${result}&`;
  }

  result += prepareQueryParameters(queryParameters);

  return result;
};

export const applyUrlParameters = (
  url: string,
  urlVariables: object,
): string => {
  let matches;
  let urlVariablesClone: {
    [index: string]: any;
  } = {
    ...urlVariables,
  };
  let finalUrl = url;
  const urlFormaterError = new Error(`Incorrect variables for url ${url}`);
  while ((matches = URL_VARIABLE_REGEXP.exec(url)) !== null) {
    if (
      !has(urlVariablesClone, matches[1])
      || urlVariablesClone[matches[1]] === null
      || urlVariablesClone[matches[1]] === undefined
    ) {
      throw urlFormaterError;
    }

    finalUrl = finalUrl.replace(matches[0], urlVariablesClone[matches[1]]);
    urlVariablesClone = omit(urlVariablesClone, matches[1]);
  }

  if (size(urlVariablesClone) !== 0) {
    throw urlFormaterError;
  }

  if (URL_VARIABLE_REGEXP.test(finalUrl)) {
    throw urlFormaterError;
  }

  return finalUrl;
};

export default (url: string, urlParameters: UrlParameters, queryParameters: QueryParameters): string => {
  return applyUrlQueryParameters(
    applyUrlParameters(
      url,
      getUrlParameters(urlParameters),
    ),
    getQueryParameters(queryParameters),
  );
};
