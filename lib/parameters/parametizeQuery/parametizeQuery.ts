import { Parameters, ParametizerContent } from '../parametize';

export default (parameters: Parameters): ParametizerContent => {
  if (!parameters) {
    throw new Error('parametize query cannot take undefined or null argument');
  }

  return {
    query: parameters,
  };
};
