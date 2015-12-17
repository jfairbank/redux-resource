import 'babel-polyfill';
import { applyMiddleware, createStore } from 'redux';
import { resourceMiddleware, createResourceAction } from '../src';

const createStoreWithMiddleWare = applyMiddleware(resourceMiddleware)(createStore);

const match = (expression, matchers, defaultState) => {
  for (const key of Object.keys(matchers)) {
    if (expression === key) {
      return matchers[key]();
    }
  }

  return defaultState;
};

const INITIAL_STATE = {
  fetching: false,
  user: null,
  error: null
};

const reducer = (state = INITIAL_STATE, action) => match(action.type, {
  FETCH_USER:       () => ({ ...state, fetching: true }),
  RECEIVE_USER:     () => ({ ...state, fetching: false, user: action.payload }),
  ERR_RECEIVE_USER: () => ({ ...state, fetching: false, error: action.payload }),
  ADD_USER:         () => ({ ...state, adding: true }),
  ADDED_USER:       () => ({ ...state, adding: false, user: action.payload }),
  ERR_ADDING_USER:  () => ({ ...state, adding: false, error: action.payload })
}, state);

const store = createStoreWithMiddleWare(reducer);

const fetchUser = createResourceAction(
  '/users/:id', 'FETCH_USER', 'RECEIVE_USER', 'ERR_RECEIVE_USER'
);

//const createUser = createResourceAction(
//  { url: '/users/create', method: 'POST' },
//  'ADD_USER', 'ADDED_USER', 'ERR_ADDING_USER'
//);

//store.dispatch(createUser(null, { name: 'Tom' })).then(() => {
//  document.getElementById('main').innerHTML =
//    JSON.stringify(store.getState(), null, '  ');
//});

store.dispatch(fetchUser({ id: 1 })).then(() => {
  document.getElementById('main').innerHTML =
    JSON.stringify(store.getState(), null, '  ');
});
