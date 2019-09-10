import { combineReducers } from 'redux';
import authentication from './authentication';
import groups from './groupReducer';

export default combineReducers({
  authentication, groups,
});
