import isPlainObject from 'lodash/isPlainObject';
import {
  QueryParameters,
} from '../../types';

type $QueryParameters = QueryParameters & {
  query: object;
};

export const getQueryParameters = (queryParameters: QueryParameters): object => {
  const parameters = queryParameters as $QueryParameters;

  return parameters.query;
};

export default (query: object = {}): QueryParameters => {
  if (!isPlainObject(query)) {
    throw new Error('parameter query must be an object');
  }

  return {
    query,
  } as $QueryParameters;
};
