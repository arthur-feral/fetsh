export type Opaque<K, T = {}> = T & { readonly __TYPE__: K };

export type UrlParameters = Opaque<'UrlParameters'>;

export type QueryParameters = Opaque<'QueryParameters'>;

export type BodyParameters = Opaque<'BodyParameters'>;

export type FetchParameters = Opaque<'FetchParameters'>;

export type RequestParameters = Opaque<'RequestParameters'>;

export type ParametizeParameters = UrlParameters | QueryParameters | BodyParameters | FetchParameters;

export type RequestResponse = Opaque<'RequestResponse'>;

export type UrlContract = Opaque<'UrlContract'>;

export type Adapter = (payload: object) => RequestResponse;
