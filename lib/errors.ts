import {
  NOT_FOUND_ERROR,
  SERVER_ERROR,
  BAD_PARAMS_ERROR,
  AUTH_ERROR,
  PARSING_ERROR,
  NETWORK_ERROR,
  CORS_ERROR, ABORT_ERROR,
} from './constants';

interface Body {
  [key: string]: any;
}

export class FetchError extends Error {
  body: Body;
  name: string;

  constructor(body: Body = {}, message: string = '') {
    super(message);

    this.body = body;
    this.name = 'FetchError';
  }
}

export class NotFoundError extends FetchError {
  constructor(body: Body | undefined = {}) {
    super(body, NOT_FOUND_ERROR);

    this.name = 'NotFoundError';
  }
}

export class ServerError extends FetchError {
  constructor(body: Body | undefined = {}) {
    super(body, SERVER_ERROR);

    this.name = 'ServerError';
  }
}

export class BadParamsError extends FetchError {
  constructor(body: Body | undefined = {}) {
    super(body, BAD_PARAMS_ERROR);

    this.name = 'BadParamsError';
  }
}

export class AuthError extends FetchError {
  constructor(body: Body | undefined = {}) {
    super(body, AUTH_ERROR);

    this.name = 'AuthError';
  }
}

export class ParsingError extends FetchError {
  constructor(body: Body | undefined = {}) {
    super(body, PARSING_ERROR);

    this.name = 'ParsingError';
  }
}

export class CorsError extends FetchError {
  constructor(body: Body | undefined = {}) {
    super(body, CORS_ERROR);

    this.name = 'CorsError';
  }
}

export class AbortError extends FetchError {
  constructor(body: Body | undefined = {}) {
    super(body, ABORT_ERROR);

    this.name = 'AbortError';
  }
}

export class NetworkError extends FetchError {
  constructor(body: Body | undefined = {}) {
    super(body, NETWORK_ERROR);

    this.name = 'NetworkError';
  }
}
