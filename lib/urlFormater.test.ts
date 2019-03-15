import urlFormater, {
  prepareQueryParameters,
  applyUrlParameters,
  applyUrlQueryParameters,
} from './urlFormater';
import { parametize, parametizeQuery, parametizeUrl } from './parameters';

describe('urlFormater', () => {
  describe('prepareQueryParameters', () => {
    it('should return an empty string', () => {
      expect(prepareQueryParameters({})).toEqual('');
    });

    it('should return an empty string', () => {
      expect(prepareQueryParameters()).toEqual('');
    });

    it('should format query params properly from an object', () => {
      expect(prepareQueryParameters({
        key: 'value',
        ids: [1, 2, 3],
        redirect: 'https://www.domain.ext/endpoint/1?lol=tulip#/anhash',
      })).toEqual(
        'ids=1%2C2%2C3&key=value&redirect=https%3A%2F%2Fwww.domain.ext%2Fendpoint%2F1%3Flol%3Dtulip%23%2Fanhash',
      );
    });
  });

  describe('applyUrlQueryParameters', () => {
    it('should add ? if no query params', () => {
      expect(
        applyUrlQueryParameters(
          'http://www.howtank.com/concurrence/',
          {
            key: 'value',
          },
        ),
      ).toEqual(
        'http://www.howtank.com/concurrence/?key=value',
      );
    });

    it('should not add an extra & ? present with no query params', () => {
      expect(
        applyUrlQueryParameters(
          'http://www.howtank.com/concurrence/?',
          {
            key: 'value',
          },
        ),
      ).toEqual(
        'http://www.howtank.com/concurrence/?key=value',
      );
    });

    it('should not add an extra ?', () => {
      expect(
        applyUrlQueryParameters(
          'http://www.howtank.com/concurrence/?cogip=1',
          {
            key: 'value',
          },
        ),
      ).toEqual(
        'http://www.howtank.com/concurrence/?cogip=1&key=value',
      );
    });

    it('should format an url with query params properly from an object', () => {
      expect(
        applyUrlQueryParameters(
          'http://www.howtank.com/concurrence/?cogip=1',
          {
            key: 'value',
            ids: [1, 2, 3],
            redirect: 'https://www.iadvize.com/endpoint/1?lol=tulip#/anhash',
          },
        ),
      ).toEqual(
        'http://www.howtank.com/concurrence/?cogip=1&ids=1%2C2%2C3&key=value&redirect=https%3A%2F%2Fwww.iadvize.com%2Fendpoint%2F1%3Flol%3Dtulip%23%2Fanhash', // tslint:disable:max-line-length
      );
    });
  });

  describe('applyUrlParameters', () => {
    it('should throw error if url contract is not vaildated', () => {
      const url = 'https://www.domain.ext/${resourceName}/${actionName1}';
      const urlVariables = {
        resourceName: 'theResourceName',
      };

      expect(() => {
        applyUrlParameters(
          url,
          urlVariables,
        );
      }).toThrow('Incorrect variables for url https://www.domain.ext/${resourceName}/${actionName1}');
    });

    it('should throw error if url contract is not vaildated', () => {
      const url = 'https://www.domain.ext/${resourceName}/${actionName1}';
      const urlVariables = {
        resourceName: 'theResourceName',
        theActionName2: 'theActionName2',
      };

      expect(() => {
        applyUrlParameters(
          url,
          urlVariables,
        );
      }).toThrow('Incorrect variables for url https://www.domain.ext/${resourceName}/${actionName1}');
    });

    it('should throw error if url contract is not vaildated', () => {
      const url = 'https://www.domain.ext/${resourceName}/${actionName1}';
      const urlVariables = {
        resourceName: 'theResourceName',
        theActionName2: null,
      };

      expect(() => {
        applyUrlParameters(
          url,
          urlVariables,
        );
      }).toThrow('Incorrect variables for url https://www.domain.ext/${resourceName}/${actionName1}');
    });

    it('should throw error if url contract is not vaildated', () => {
      const url = 'https://www.domain.ext/${resourceName}/${actionName1}';
      const urlVariables = {
        resourceName: 'theResourceName',
        theActionName2: undefined,
      };

      expect(() => {
        applyUrlParameters(
          url,
          urlVariables,
        );
      }).toThrow('Incorrect variables for url https://www.domain.ext/${resourceName}/${actionName1}');
    });

    it('should format url', () => {
      const url = 'https://www.domain.ext/${resourceName}/${actionName1}';
      const urlVariables = {
        resourceName: 'theResourceName',
        actionName1: 'theActionName1',
      };

      expect(applyUrlParameters(
        url,
        urlVariables,
      )).toEqual('https://www.domain.ext/theResourceName/theActionName1');
    });
  });

  describe('urlFormater', () => {
    it('should format url with all provided parameters', () => {
      expect(
        urlFormater(
          'https://www.domain.ext/${domain}/${resourceName}/${resourceId}?name1=value1',
          parametize(
            parametizeUrl({
              domain: 'theDomain',
              resourceName: 'theResourceName',
              resourceId: 'theResourceId',
            }),
            parametizeQuery({
              name2: 'value2',
              array1: [
                1, 2, 3,
              ],
            }),
          ),
        ),
      ).toEqual(
        'https://www.domain.ext/theDomain/theResourceName/theResourceId?name1=value1&array1=1%2C2%2C3&name2=value2',
      );
    });
  });
});
