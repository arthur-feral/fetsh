import reduce from 'lodash/reduce';
import {
  BodyParameters,
  FetchParameters,
  ParametizeParameters,
  QueryParameters,
  RequestParameters,
  UrlParameters,
} from '../types';

type $RequestParameters = RequestParameters & {
  url?: UrlParameters;
  query?: QueryParameters;
  body?: BodyParameters;
  fetch?: FetchParameters;
};

export default (...parametizeParameters: ParametizeParameters[]): RequestParameters => {
  return reduce(
    parametizeParameters,
    (result, parametizeParameter) => ({
      ...result,
      ...parametizeParameter,
    }),
    {},
  ) as $RequestParameters;
};
