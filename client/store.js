import { createStore, applyMiddleware, compose } from 'redux';
import loggingMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import Axios from 'axios';
import reducer from './reducers/index';
import socket from './socket';
import { GOT_USER } from './actions/authentication';

const socketLogIn = _ => next => action => {
  if (action.type === GOT_USER) {
    socket.emit('login', action.user.id);
  }
  let result = next(action);
  return result;
};

const middlewares = [
  loggingMiddleware,
  thunkMiddleware.withExtraArgument(Axios),
  socketLogIn,
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
