import { combineReducers } from 'redux';
import authentication from './authentication';
import groups from './groupReducer';
import events from './events';

export default combineReducers({
  authentication, groups, events,
});
