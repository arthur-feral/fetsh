import json from './input.fixture.json';
import expected from './expected.fixture.json';
import jsonapi from './jsonapi';

describe('transform/jsonapi', () => {
  it('should normalize data', () => {
    expect(jsonapi(json, null)).toEqual(expected);
  });
});
