import {
  NOT_FOUND_ERROR,
  SERVER_ERROR,
  BAD_PARAMS_ERROR,
  AUTH_ERROR,
  PARSING_ERROR,
  NETWORK_ERROR,
  CORS_ERROR, ABORT_ERROR,
} from './constants';
import {
  RequestResponse,
} from './types';

export class FetchError extends Error {
  body: RequestResponse;
  name: string;

  constructor(body: RequestResponse, message: string = '') {
    super(message);

    this.body = body;
    this.name = 'FetchError';
  }
}

export class NotFoundError extends FetchError {
  constructor(body: RequestResponse) {
    super(body, NOT_FOUND_ERROR);

    this.name = 'NotFoundError';
  }
}

export class ServerError extends FetchError {
  constructor(body: RequestResponse) {
    super(body, SERVER_ERROR);

    this.name = 'ServerError';
  }
}

export class BadParamsError extends FetchError {
  constructor(body: RequestResponse) {
    super(body, BAD_PARAMS_ERROR);

    this.name = 'BadParamsError';
  }
}

export class AuthError extends FetchError {
  constructor(body: RequestResponse) {
    super(body, AUTH_ERROR);

    this.name = 'AuthError';
  }
}

export class ParsingError extends FetchError {
  constructor(body: RequestResponse) {
    super(body, PARSING_ERROR);

    this.name = 'ParsingError';
  }
}

export class CorsError extends FetchError {
  constructor(body: RequestResponse) {
    super(body, CORS_ERROR);

    this.name = 'CorsError';
  }
}

export class AbortError extends FetchError {
  constructor(body: RequestResponse) {
    super(body, ABORT_ERROR);

    this.name = 'AbortError';
  }
}

export class NetworkError extends FetchError {
  constructor(body: RequestResponse) {
    super(body, NETWORK_ERROR);

    this.name = 'NetworkError';
  }
}

export const getErrorWithStatus = (body: RequestResponse, status: number, type: string = ''): FetchError => {
  switch (status) {
    case 400:
      return new BadParamsError(body);
    case 401:
    case 403:
      return new AuthError(body);

    case 404:
      return new NotFoundError(body);

    case 0: {
      if (type === 'opaque') {
        return new CorsError(body);
      }

      if (type === 'error') {
        return new NetworkError(body);
      }

      return new ServerError(body);
    }

    default:
      return new ServerError(body);
  }
};
