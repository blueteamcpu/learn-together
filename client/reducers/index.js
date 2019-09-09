import { combineReducers } from 'redux';
import authentication from './authentication';
import events from './events';

export default combineReducers({
  authentication,
  events,
});
