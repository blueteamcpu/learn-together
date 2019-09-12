import { combineReducers } from 'redux';
import authentication from './authentication';
import events from './events';
import groups from './groupReducer';

export default combineReducers({
  authentication,
  events,
  groups
});
