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
