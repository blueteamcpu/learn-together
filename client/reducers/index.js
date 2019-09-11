import { combineReducers } from 'redux';
import authentication from './authentication';
<<<<<<< HEAD
import events from './events';

export default combineReducers({
  authentication,
  events,
=======
import groups from './groupReducer';

export default combineReducers({
  authentication, groups,
>>>>>>> e2fe4e6963f2b6390a9f3af884160892430e11e4
});
