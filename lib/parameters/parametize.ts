import reduce from 'lodash/reduce';

export interface Parameter {
  [name: string]: any;
}

export interface ParametizerContent {
  [name: string]: Parameter;
}

export interface Parameters {
  [name: string]: ParametizerContent;
}

export default (...parametizerContents: ParametizerContent[]): Parameters => {
  return reduce(
    parametizerContents,
    (result, parametizerContent) => ({
      ...result,
      ...parametizerContent,
    }),
    {},
  );
};
