import {
  FETCHING,
  GOT_CONTENT,
  FAILED_TO_FETCH_CONTENT,
  CHANGE_CATEGORY,
} from '../actions/explore';

const initialState = {
  fetching: true,
  failedToFetch: false,
  items: [],
  category: 'Groups',
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
    case CHANGE_CATEGORY: {
      return { ...state, category: action.category };
    }
    case FAILED_TO_FETCH_CONTENT: {
      return { ...state, fetching: false, failedToFetch: true };
    }
    default:
      return state;
  }
};
