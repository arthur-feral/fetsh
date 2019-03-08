import {
  parse as parseUrl,
} from 'url';
import queryString from 'query-string';
import reduce from 'lodash/reduce';
import omit from 'lodash/omit';
import size from 'lodash/size';
import has from 'lodash/has';
import {
  URL_VARIABLE_REGEXP,
} from './constants';
import { Parameters } from './parameters/parametize';

export interface UrlParameters extends Parameters {
  [name: string]: any;
}

export interface QueryParameters extends Parameters {
  [name: string]: any;
}

export const prepareQueryParameters = (queryParameters: QueryParameters = {}): string => {
  if (!queryParameters) {
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

export const applyUrlQueryParameters = (url: string, queryParameters: QueryParameters = {}): string => {
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
  urlVariables: UrlParameters,
): string => {
  let matches;
  let urlVariablesClone = {
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
      urlParameters,
    ),
    queryParameters,
  );
};
