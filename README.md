# Fetsh

Fetsh is a Javascript library that helps you building contracts between your application and your server by defining routes contracts.

### Installation
```bash
$ yarn add fetsh
```

### Principles
Fetsh follows a simple rule: any route should be able to be defined with its own response parser.
Let's give an example:

```Typescript
// routing.ts
import {
  createUrlContract,
  jsonApiTransform,
} from 'fetsh';

/**
* What if this API return 200 even if there is an error
* and you have to parse the payload to find the error
* @param response
*/
const adapterForShittyAPI = (response) => {
  if(response.error){
    throw new Error('Server Error special case');
  }
  
  return response.data;
};

export const GET_MOVIES_FROM_REST_API = createUrlContract({
  url: 'https://mydomain.ext/api/movies',
  adapter: (response) => response.movies,
});

export const GET_MOVIES_FROM_JSON_API = createUrlContract({
  url: 'https://mydomain.ext/jsonApi/movies',
  adapter: jsonApiTransform,
});

export const GET_MOVIES_FROM_SHITTY_API = createUrlContract({
  url: 'https://mydomain.ext/shittyApi/movies',
  adapter: adapterForShittyAPI,
});
```

```Typescript
// app.ts
import {
  get
} from 'fetsh';
import {
  GET_MOVIES_FROM_REST_API,
  GET_MOVIES_FROM_JSON_API
} from './routing.js';

get(GET_MOVIES_FROM_REST_API).then((movies: array[any]) => {
  // do whatever you want with your data
});

get(GET_MOVIES_FROM_JSON_API).then((movies: array[any]) => {
  // the data went through the json api adapter so they are properly formated
  // do whatever you want with your data
});


```

By simply doing this, you can deal with many different REST API endpoints that may return data with different shape,
by establish a contract in your routing file. 
This way is more readable, all your API call are defined in a single file, and you can easily see how the data is transformed.

### How to use
For all available http methods you will have to provide an UrlContract. You can also provide parameters depending on the need.

#### parametise
This helper will help you creating your request. Depending on what you are parametizing, it can throw errors to help you debugging code.


**parametizeUrl**: when you define your contract, you provide an url. This url may need to add an id in the url path.
For example you wanna fetch a specific resource with its ID: the url would looks like `https://api.domain.com/movies/12345`.
You just have to surround any variable like this: `${variable}` 
Using this helper, you will be protected from bad parameters and instead of querying `https://api.domain.com/movies/undefined`, it will throw an error on runtime telling you that one parameter is missing.
```Typescript
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
```Typescript
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
```Typescript
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
