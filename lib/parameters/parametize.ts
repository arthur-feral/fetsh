import reduce from 'lodash/reduce';

export interface Parameters {
  [name: string]: any;
}

export interface ParametizerContent {
  [name: string]: Parameters;
}

export interface FetchParameters {
  [name: string]: ParametizerContent;
}

export default (...parametizerContents: ParametizerContent[]): FetchParameters => {
  return reduce(
    parametizerContents,
    (result, parametizerContent) => ({
      ...result,
      ...parametizerContent,
    }),
    {},
  );
};
