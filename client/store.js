import { createStore, applyMiddleware, compose } from 'redux';
import loggingMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import Axios from 'axios';
import reducer from './reducers/index';

const middlewares = [
  loggingMiddleware,
  thunkMiddleware.withExtraArgument(Axios),
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
