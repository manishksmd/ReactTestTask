/**
 * @Index.js
 * @description   :
 * @Created by    : smartData
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import { Router, browserHistory } from 'react-router';
import reducers from './reducers';
import promise from 'redux-promise';
import routes from './router';
import thunkMiddleware from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware( promise, thunkMiddleware )( createStore );

ReactDOM.render(
  <Provider store={ createStoreWithMiddleware(reducers) }>
    <Router history={ browserHistory } routes={ routes } />
  </Provider>, document.querySelector( '.root' ));
