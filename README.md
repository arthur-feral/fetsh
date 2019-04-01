# Fetsh
Fetsh helps you to establish contracts between your complex web app and all the different API it requires.

### Installation
```bash
$ yarn add fetsh
```

### Principles
Fetsh follows a simple rule: any route should be able to be defined with its own response parser. This could be called a contract between an URI and the response returned.
Let's give an example:

```Typescript
// routing.ts
import {
  createUrlContract,
  jsonApiTransform,
  headers,
} from 'fetsh';

/**
* What if this API return 200 even if there is an error
* and you have to parse the payload to determine if the request returned an error or is on success
* (We all encountered legacy code or API...)
* @param response
*/
const adapterForLegacyAPI = (response: any) => {
  // Imagine your server return a key named `error` containing the error the server returned
  if(response.error){
    // You could simply throw an error and then where you call this route, you would be able to call catch on the promise
    throw new Error('Server Error special case');
  }
  
  // Or simply return your data or transform the data returned
  return response.data;
};

//After creating your adapter for a special API or route, create the contract

/**
* Here we want to return the array returned in the payload
*/
export const GET_MOVIES_FROM_REST_API = createUrlContract({
  url: 'https://mydomain.ext/api/movies',
  adapter: response => response.movies,
});

/**
* If you use JSON API
* https://jsonapi.org/
* Use the built-in adapter provided by Fetsh library
*/
export const GET_MOVIES_FROM_JSON_API = createUrlContract({
  url: 'https://mydomain.ext/jsonApi/movies',
  adapter: jsonApiTransform,
  contentType: headers.JSONAPI,
});

/**
* or use your own adapter for your legacy API
*/
export const GET_MOVIES_FROM_LEGACY_API = createUrlContract({
  url: 'https://mydomain.ext/legacyApi/movies',
  adapter: adapterForLegacyAPI,
});
```

```Typescript
// app.ts
import {
  get,
  parametize,
  parametizeFetch,
} from 'fetsh';
import {
  GET_MOVIES_FROM_REST_API,
  GET_MOVIES_FROM_JSON_API,
  GET_MOVIES_FROM_LEGACY_API,
} from './routing.js';

get(GET_MOVIES_FROM_REST_API).then((movies: any[]) => {
  // do whatever you want with your data
});

get(GET_MOVIES_FROM_JSON_API).then((movies: any[]) => {
  // the data went through the json api adapter so they are properly formated
  // do whatever you want with your data
});

get(GET_MOVIES_FROM_LEGACY_API).then((movies: any[]) => {
  // the data went through your custom legacy adapter so they are properly formated
  // do whatever you want with your data
});
```

By simply doing this, you can deal with many different REST API endpoints that may return data with different shape,
by establish a contract in your routing file. 
This way, all your API call are defined in a single file. It is more readable and convenient for the developers and you can easily see how the data is transformed.

### How to use
For all available http methods you will have to provide an UrlContract. You can also provide parameters depending on the need.

#### parametise
This helper must be used to compose all the parameters needed for your request. For some helpers like `parametizeUrl`, errors can be thrown if any parameter is not defined, making your app more secured. 

**parametizeUrl**: when you define your contract, you provide an url. This url may need to add an id in the url path.
For example you wanna fetch a specific resource with its ID: the url would looks like `https://api.domain.com/movies/12345`.
You just have to surround any variable like this: `${variable}` 
Using this helper, you will be protected from bad parameters and instead of querying `https://api.domain.com/movies/undefined`, it will throw an error on runtime telling you that one parameter is missing.
```javascript
// routing.js
import {
  createUrlContract,
} from 'fetsh';

// you will define your contract like this
const GET_MOVIE = createUrlContract({
  url: 'https://api.domain.com/movies/${id}'
});


// app.js
import {
  get,
  parametize,
  parametizeUrl,
} from 'fetsh';
import {
  GET_MOVIE,
} from './routing.js'

// declare your url parameters
const urlParameters = parametizeUrl({
  id: 12345,
});

// request the server
get(GET_MOVIE, parametize(urlParameters));
```

**parametizeQuery**: Your url may also need query params, here is how to add some:
```javascript
// routing.js
import {
  createUrlContract,
} from 'fetsh';

// you will define your contract like this
const GET_MOVIE = createUrlContract({
  url: 'https://api.domain.com/movies/${id}'
});


// app.js
import {
  get,
  parametize,
  parametizeUrl,
  parametizeQuery,
} from 'fetsh';
import {
  GET_MOVIE,
} from './routing.js'

// declare your url parameters
const urlParameters = parametizeUrl({
  id: 12345,
});
// declare your url query parameters
const queryParameters = parametizeQuery({
  rating: 5,
});

// request the server
get(GET_MOVIE, parametize(urlParameters, queryParameters));
```
and you will request `https://api.domain.com/movies/12345?rating=5`

**parametizeBody**: Use this helper if you wanna post data to the server
```javascript
// routing.js
import {
  createUrlContract,
} from 'fetsh';

// you will define your contract like this
const CREATE_MOVIE = createUrlContract({
  url: 'https://api.domain.com/movies'
});


// app.js
import {
  post,
  parametize,
  parametizeBody,
} from 'fetsh';
import {
  CREATE_MOVIE,
} from './routing.js'

// declare your url parameters
const body = parametizeBody({
  name: 'Interstellar',
  rating: 5
});

// request the server
post(CREATE_MOVIE, parametize(body));
```

**parametizeFetch**: Use this helper if you wanna add custom fetch options like headers etc.
The parameters are the same than for fetch, plus 2 extra options: `isCrossDomain`, to quickly specify in the request that you call a cross domain API 
and `useCredentials` to send your access_token througth cookie for example.

#### API
**createUrlContract** `(object)` => `UrlContract`: Creates a contract

it takes an object as parameter

|Property|Type|Required|Description|
|---|---|---|---|
| url |`string` |true|the API endpoint url|
| adapter |`function`|false|Your custom result payload adapter|
| contentType |`string`|false|You can quickly specify what content type is expected for this route|

**parametize** `(ParametizeParameters, ...ParametizeParameters[])` => `RequestParameters`: compose your request parameters
`type ParametizeParameters = UrlParameters | QueryParameters | BodyParameters | FetchParameters;`
it takes one, to many `ParametizeParameters` as arguments

**headers** `object`: hashmap containing different types of headers (see source code for the complete list)

**parametizeUrl** `(object)` => `UrlParameters`: Returns the url parameter to be passed in `parametize` method.

**parametizeQuery** `(object)` => `QueryParameters`: Returns the query parameters to be passed in `parametize` method.

**parametizeBody** `(object)` => `BodyParameters`: Returns the body content to be passed in `parametize` method for any post, patch,put request.

**parametizeFetch** `(object)` => `FetchParameters`: Returns the `fetch` parameters to be passed in `parametize` method. This is the same api than `fetch`. https://developer.mozilla.org/fr/docs/Web/API/Fetch_API

**get - post - put - patch - del** `(UrlContract, ParametizeParameters?)` => `Promise`: send a request with fetch
