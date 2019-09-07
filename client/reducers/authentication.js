import {
  GOT_USER,
  FAILEDTOLOADUSER,
  REMOVED_USER,
  FAILEDTOLOGOUT,
} from '../actions/authentication';

const initialState = {
  failedToGetUser: false,
  failedToLogOut: false,
  loadingUser: true,
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER: {
      return { ...state, user: action.user };
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
    default:
      return state;
  }
};
