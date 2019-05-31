export const URL_VARIABLE_REGEXP: RegExp = /\$\{([a-zA-Z0-9-_]+)\}/g;
export const NOT_FOUND_ERROR = 'Resource not found';
export const ABORT_ERROR = 'Request has been aborted';
export const SERVER_ERROR = 'The server responded with an error';
export const BAD_PARAMS_ERROR = 'Please check query or body parameters';
export const AUTH_ERROR = 'You don\'t have the permission to access the resource';
export const PARSING_ERROR = 'Error while parsing response';
export const CORS_ERROR = 'Error with CORS configuration';
export const NETWORK_ERROR = 'Network seems unreachable';
export const VERBS = [
  'get',
  'post',
  'patch',
  'put',
  'delete',
];
export const CONTENT_JSON = 'application/json;charset=UTF-8';
export const CONTENT_JSONAPI = 'application/vnd.api+json';
export const CONTENT_FORM_URL_ENCODED = 'application/x-www-form-urlencoded;charset=UTF-8';
export const LOG_INFO_PREFIX = '[fetsh][Info]';
export const LOG_ERROR_PREFIX = '[fetsh][Error]';
export const HEADERS = {
  JSON: CONTENT_JSON,
  JSONAPI: CONTENT_JSONAPI,
  FORM_URL_ENCODED: CONTENT_FORM_URL_ENCODED,
};
