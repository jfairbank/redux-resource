import 'babel-polyfill';
import { applyMiddleware, createStore } from 'redux';
import { resourceMiddleware } from '../../../src';

const createStoreWithMiddleWare = applyMiddleware(resourceMiddleware)(createStore);

export default function configureStore(reducer, initialState) {
  return createStoreWithMiddleWare(reducer, initialState);
}
