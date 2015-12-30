import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import reducer from './reducer';
import configureStore from './store/configureStore';

const store = configureStore(reducer);

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('main')
);
