import {
  FETCHING,
  GOT_CONTENT,
  FAILED_TO_FETCH_CONTENT,
} from '../actions/explore';

const initialState = {
  fetching: true,
  failedToFetch: false,
  items: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING: {
      return { ...state, fetching: true };
    }
    case GOT_CONTENT: {
      const { items } = action;
      return { ...state, fetching: false, items };
    }
    case FAILED_TO_FETCH_CONTENT: {
      return { ...state, fetching: false, failedToFetch: true };
    }
    default:
      return state;
  }
};
