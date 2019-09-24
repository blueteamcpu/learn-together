import { combineReducers } from 'redux';
import authentication from './authentication';
import events from './events';
import groups from './groupReducer';
import explore from './explore';
import posts from './post';
import comments from './comments';

export default combineReducers({
  authentication,
  groups,
  explore,
  events,
  posts,
  comments,
});
