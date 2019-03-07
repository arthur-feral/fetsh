import omit from 'lodash/omit';
import size from 'lodash/size';
import has from 'lodash/has';
import {
  URL_VARIABLE_REGEXP,
} from './constants';

interface UrlParameters {
  [name: string]: any;
}

export default (
  url: string,
  urlVariables: UrlParameters,
) => {
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
