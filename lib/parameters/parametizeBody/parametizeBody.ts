import isPlainObject from 'lodash/isPlainObject';
import {
  BodyParameters,
} from '../../types';

type $BodyParameters = BodyParameters & {
  body: object;
};

export default (body: object = {}): BodyParameters => {
  if (!isPlainObject(body)) {
    throw new Error('parameter body must be an object');
  }

  return {
    body,
  } as $BodyParameters;
};
