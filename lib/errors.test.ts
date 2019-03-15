import {
  FetchError,
  NotFoundError,
  ServerError,
  BadParamsError,
  AuthError,
  ParsingError,
  CorsError,
  AbortError,
  NetworkError,
} from './errors';
import { createRequestResponse } from './request';

describe('Errors', () => {
  it('should support the body response', () => {
    const error = new FetchError(createRequestResponse(), 'An error has occured');
    expect(error.message).toEqual('An error has occured');
    expect(error.name).toEqual('FetchError');
    expect(error.body).toEqual({});
  });

  it('should support the body response', () => {
    const error = new FetchError(
      createRequestResponse({
        errors: [
          {
            code: 42,
            message: 'Error details',
          },
        ],
      }),
      'An error has occured',
    );
    expect(error.message).toEqual('An error has occured');
    expect(error.name).toEqual('FetchError');
    expect(error.body).toEqual({
      errors: [
        {
          code: 42,
          message: 'Error details',
        },
      ],
    });
  });

  describe('NotFoundError', () => {
    it('should own error properties', () => {
      const error = new NotFoundError(createRequestResponse());
      expect(error.message).toEqual('Resource not found');
      expect(error.name).toEqual('NotFoundError');
    });
  });

  describe('ServerError', () => {
    it('should own error properties', () => {
      const error = new ServerError(createRequestResponse());
      expect(error.message).toEqual('The server responded with an error');
      expect(error.name).toEqual('ServerError');
      expect(error.body).toEqual({});
    });
  });

  describe('BadParamsError', () => {
    it('should own error properties', () => {
      const error = new BadParamsError(createRequestResponse());
      expect(error.message).toEqual('Please check query or body parameters');
      expect(error.name).toEqual('BadParamsError');
      expect(error.body).toEqual({});
    });
  });

  describe('AuthError', () => {
    it('should own error properties', () => {
      const error = new AuthError(createRequestResponse());
      expect(error.message).toEqual('You don\'t have the permission to access the resource');
      expect(error.name).toEqual('AuthError');
      expect(error.body).toEqual({});
    });
  });

  describe('ParsingError', () => {
    it('should own error properties', () => {
      const error = new ParsingError(createRequestResponse());
      expect(error.message).toEqual('Error while parsing response');
      expect(error.name).toEqual('ParsingError');
      expect(error.body).toEqual({});
    });
  });

  describe('CorsError', () => {
    it('should own error properties', () => {
      const error = new CorsError(createRequestResponse());
      expect(error.message).toEqual('Error with CORS configuration');
      expect(error.name).toEqual('CorsError');
      expect(error.body).toEqual({});
    });
  });

  describe('AbortError', () => {
    it('should own error properties', () => {
      const error = new AbortError(createRequestResponse());
      expect(error.message).toEqual('Request has been aborted');
      expect(error.name).toEqual('AbortError');
      expect(error.body).toEqual({});
    });
  });

  describe('NetworkError', () => {
    it('should own error properties', () => {
      const error = new NetworkError(createRequestResponse());
      expect(error.message).toEqual('Network seems unreachable');
      expect(error.name).toEqual('NetworkError');
      expect(error.body).toEqual({});
    });
  });
});
