import {
  URL_VARIABLE_REGEXP,
} from './constants';

describe('constants', () => {
  describe('URL_VARIABLE_REGEXP', () => {
    it('should match different styles of variable', () => {
      expect('%{theVariable}'.replace(URL_VARIABLE_REGEXP, '$1').split(/$\{/)[0]).toEqual('theVariable');
      expect('%{variable_name}'.replace(URL_VARIABLE_REGEXP, '$1').split(/$\{/)[0]).toEqual('variable_name');
      expect('%{variable-name}'.replace(URL_VARIABLE_REGEXP, '$1').split(/$\{/)[0]).toEqual('variable-name');
      expect('%{a1b2-3c_4d}'.replace(URL_VARIABLE_REGEXP, '$1').split(/$\{/)[0]).toEqual('a1b2-3c_4d');
    });
  });
});
