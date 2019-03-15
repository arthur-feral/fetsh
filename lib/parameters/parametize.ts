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
  urlParameters: UrlParameters;
  query: QueryParameters;
  body: BodyParameters;
  fetch: FetchParameters;
};

export const getUrlParameters = (requestParameters: RequestParameters): UrlParameters => {
  const parameters = requestParameters as $RequestParameters;

  return parameters.urlParameters;
};

export const getQueryParameters = (requestParameters: RequestParameters): QueryParameters => {
  const parameters = requestParameters as $RequestParameters;

  return parameters.query;
};

export const getBodyParameters = (requestParameters: RequestParameters): BodyParameters => {
  const parameters = requestParameters as $RequestParameters;

  return parameters.body;
};

export const getFetchParameters = (requestParameters: RequestParameters): FetchParameters => {
  const parameters = requestParameters as $RequestParameters;

  return parameters.fetch;
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
