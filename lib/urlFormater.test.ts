import urlFormater from './urlFormater';

describe('urlFormater', () => {
  it('should throw error if url contract is not vaildated', () => {
    const url = 'https://www.domain.ext/%{resourceName}/%{actionName1}';
    const urlVariables = {
      resourceName: 'theResourceName',
    };

    expect(() => {
      urlFormater(
        url,
        urlVariables,
      );
    }).toThrow('Incorrect variables for url https://www.domain.ext/%{resourceName}/%{actionName1}');
  });

  it('should throw error if url contract is not vaildated', () => {
    const url = 'https://www.domain.ext/%{resourceName}/%{actionName1}';
    const urlVariables = {
      resourceName: 'theResourceName',
      theActionName2: 'theActionName2',
    };

    expect(() => {
      urlFormater(
        url,
        urlVariables,
      );
    }).toThrow('Incorrect variables for url https://www.domain.ext/%{resourceName}/%{actionName1}');
  });

  it('should throw error if url contract is not vaildated', () => {
    const url = 'https://www.domain.ext/%{resourceName}/%{actionName1}';
    const urlVariables = {
      resourceName: 'theResourceName',
      theActionName2: null,
    };

    expect(() => {
      urlFormater(
        url,
        urlVariables,
      );
    }).toThrow('Incorrect variables for url https://www.domain.ext/%{resourceName}/%{actionName1}');
  });

  it('should throw error if url contract is not vaildated', () => {
    const url = 'https://www.domain.ext/%{resourceName}/%{actionName1}';
    const urlVariables = {
      resourceName: 'theResourceName',
      theActionName2: undefined,
    };

    expect(() => {
      urlFormater(
        url,
        urlVariables,
      );
    }).toThrow('Incorrect variables for url https://www.domain.ext/%{resourceName}/%{actionName1}');
  });

  it('should format url', () => {
    const url = 'https://www.domain.ext/%{resourceName}/%{actionName1}';
    const urlVariables = {
      resourceName: 'theResourceName',
      actionName1: 'theActionName1',
    };

    expect(urlFormater(
      url,
      urlVariables,
    )).toEqual('https://www.domain.ext/theResourceName/theActionName1');
  });
});
