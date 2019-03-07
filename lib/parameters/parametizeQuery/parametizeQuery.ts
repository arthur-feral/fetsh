import { Parameter, ParametizerContent } from '../parametize';

export default (parameters: Parameter): ParametizerContent => {
  if (!parameters) {
    throw new Error('parametize query cannot take undefined or null argument');
  }

  return {
    query: parameters,
  };
};
