import { Parameter, ParametizerContent } from '../parametize';

export default (parameters: Parameter): ParametizerContent => {
  if (!parameters) {
    throw new Error('parametize url cannot take undefined or null argument');
  }

  return {
    url: parameters,
  };
};
