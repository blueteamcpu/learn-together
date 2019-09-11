import {
  GOT_USER,
  FAILEDTOLOADUSER,
  REMOVED_USER,
  FAILEDTOLOGOUT,
} from '../actions/authentication';

import {
  UPDATEUSER,
  UPDATEUSERPASS,
} from '../actions/user';

const initialState = {
  failedToGetUser: false,
  failedToLogOut: false,
  loadingUser: true,
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER: {
      return { ...state, user: action.user, loadingUser: false };
    }
    case REMOVED_USER: {
      return { ...state, user: {} };
    }
    case FAILEDTOLOADUSER: {
      return { ...state, failedToGetUser: true };
    }
    case FAILEDTOLOGOUT: {
      return { ...state, failedToLogOut: true };
    }
    case UPDATEUSER: {
      const user = action.user;
      return {...state, user};
    }
    case UPDATEUSERPASS: {
      const {firstName, lastName, username, email, zipcode, password, NPass} = action.user;
      const newUser = {firstName, lastName, username, email, zipcode};
      return {...state, user: newUser};
    }
    default:
      return state;
  }
};
