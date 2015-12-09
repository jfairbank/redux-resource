# redux-resource

Redux action creator for server resources

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
