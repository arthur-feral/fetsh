import isPlainObject from 'lodash/isPlainObject';
import {
  QueryParameters,
} from '../../types';

type $QueryParameters = QueryParameters & {
  query: object;
};

export default (query: object = {}): QueryParameters => {
  if (!isPlainObject(query)) {
    throw new Error('parameter query must be an object');
  }

  return {
    query,
  } as $QueryParameters;
};
