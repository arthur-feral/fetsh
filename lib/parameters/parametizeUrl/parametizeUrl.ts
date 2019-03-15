import isPlainObject from 'lodash/isPlainObject';
import {
  UrlParameters,
} from '../../types';

type $UrlParameters = UrlParameters & {
  urlParameters: object;
};

export default (urlParameters: object = {}): UrlParameters => {
  if (!isPlainObject(urlParameters)) {
    throw new Error('parameter urlParameters must be an object');
  }

  return {
    urlParameters,
  } as $UrlParameters;
};
