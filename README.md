# redux-resource

[![Circle CI](https://circleci.com/gh/jfairbank/redux-resource.svg?style=svg)](https://circleci.com/gh/jfairbank/redux-resource)

Easily create actions for managing server resources like fetching, creating, or
updating. Provide action types used in your reducer function for updating your
redux store based on results from the server.

## Install

    $ npm install redux-resource

## Usage

Use `createResourceAction` to create an action for fetching a resource. Supply a
URL (with optional path parameter placeholders) along with three action types to
represent the act of sending the request, receiving a successful response from
the server, and receiving an error from the server.  Make sure to use these
action types in your reducer function!

```js
import { createResourceAction } from 'redux-resource';

const fetchTodo = createResourceAction(
  '/todos/:id', 'FETCH_TODO', 'RCV_TODO', 'ERR_RCV_TODO'
);
```

When calling the action, pass in any parameters to fill in the placeholders or
add additional search query parameters.

```js
// make request to '/todos/42'
store.dispatch(fetchTodo({ id: 42 }));

// make request to '/todos/42?extraParam=hi'
store.dispatch(fetchTodo({
  id: 1,
  extraParam: 'hi'
}));
```

`createResourceAction` defaults to `GET` requests. To use other verbs swap out
the URL string with an object literal that defines the URL and HTTP verb.

```js
const addTodo = createResourceAction(
  { url: '/todos/add', method: 'POST' },
  'ADD_TODO', 'ADDED_TODO', 'ERR_ADDING_TODO'
);
```

You can also supply headers inside the object literal. This is useful if your
request content type needs to be something other than `application/json`.

```js
const resource = {
  url: '/todos/add',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

const addTodoFromForm = createResourceAction(
  resource, 'ADD_TODO', 'ADDED_TODO', 'ERR_ADDING_TODO'
);
```

In addition to taking parameters, the action can take request data. You can
pass in `null` for params if you don't have any.

```js
// make request to '/todos/add' with JSON '{"title":"Finish tests"}'
store.dispatch(
  addTodo(null, { title: 'Finish tests' })
);

// make request to '/todos/add' with form data 'title="Add%20more%20features"'
store.dispatch(
  addTodoFromForm(null, { title: 'Add more features' })
);
```

Actions return a thunk (an anonymous function). To use the actions with your
store you **must** include the middleware. (redux-resource uses
[redux-thunk](https://github.com/gaearon/redux-thunk) under the hood.)

```js
// configureStore.js

import { applyMiddleware, createStore } from 'redux';
import { resourceMiddleware } from 'redux-resource';
import myReducer from './myReducer';

const createStoreWithMiddleWare = applyMiddleware(resourceMiddleware)(createStore);
const store = createStoreWithMiddleWare(myReducer);
```

Make sure to add the action types to your reducer function!

```js
function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'FETCH_TODO':
      // ...

    case 'RCV_TODO':
      return { ...state, todo: action.payload };

    case 'ADD_TODO':
      // ...

    case 'ERR_ADDING_TODO':
      return { ...state, error: action.payload };

    // etc.

    default:
      return state;
  }
}
```

Dispatching the actions will return a promise that resolves when a request
_succeeds_ or _fails_. Therefore, `catch` won't work on failed requests. Your
reducer should manage how your state reacts to failed requests. This allows you
to gracefully handle state changes from errors for React applications for
example.

```js
// Successful request
store.dispatch(fetchTodo({ id: 42 })).then(() => {
  const todo = store.getState().todo;
});

// Failing request
store.dispatch(addTodo(null, { title: 'Finish tests' })).then(() => {
  const error = store.getState().error;
});
```

## API

### `createResourceAction`

```js
createResourceAction(
  url: string | {
    url: string,
    [method: string],
    [headers: Object]
  },
  sendType: string,
  successType: string,
  errorType: string
)
```

`url` - URL for resource. Allows path parameter placeholders like `/users/:id`.

`sendType` - The action type when dispatching the request.

`successType` - The action type when successfully receiving back the resource
from the server.

`errorType` - The action type when a server request fails.

## Example

```js
import { applyMiddleware, createStore } from 'redux';
import { resourceMiddleware, createResourceAction } from 'redux-resource';

const createStoreWithMiddleWare = applyMiddleware(resourceMiddleware)(createStore);

const INITIAL_STATE = {
  fetching: false,
  user: null,
  error: null
};

function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'FETCH_USER':
      return { ...state, fetching: true };

    case 'RECEIVE_USER':
      return { ...state, fetching: false, user: action.payload };

    case 'ERR_RECEIVE_USER':
      return { ...state, fetching: false, error: action.payload };

    default:
      return state;
  }
}

const store = createStoreWithMiddleWare(reducer);

const fetchUser = createResourceAction(
  '/users/:id', 'FETCH_USER', 'RECEIVE_USER', 'ERR_RECEIVE_USER'
);

store.dispatch(fetchUser({ id: 1 }))
  .then(() => console.log(store.getState()));

// {
//   fetching: false,
//   user: { id: 1, name: 'Jeremy' },
//   error: null
// }
```
