import isPlainObject from 'lodash/isPlainObject';
import {
  FetchParameters,
} from '../../types';

type $FetchParameters = FetchParameters & {
  fetch: object;
};

export default (fetchOptions: object = {}): FetchParameters => {
  if (!isPlainObject(fetchOptions)) {
    throw new Error('parameter fetchOptions must be an object');
  }

  return {
    fetch: fetchOptions,
  } as $FetchParameters;
};
