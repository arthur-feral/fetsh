import inputFixtureJson from './input.fixture.json';
import expectedFixtureJson from './expected.fixture.json';
import jsonapi from './jsonapi';

describe('transform/jsonapi', () => {
  it('should normalize data', () => {
    expect(jsonapi(inputFixtureJson, null)).toEqual(expectedFixtureJson);
  });
});
