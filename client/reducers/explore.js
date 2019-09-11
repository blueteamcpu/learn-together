import {
  FETCHING,
  GOT_CONTENT,
  FAILED_TO_FETCH_CONTENT,
  CHANGED_CATEGORY,
  DELAY_OVER,
} from '../actions/explore';

const initialState = {
  fetching: true,
  defaultDelay: true,
  failedToFetch: false,
  items: [],
  category: 'Groups',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING: {
      return { ...state, fetching: true, defaultDelay: true };
    }
    case DELAY_OVER: {
      return { ...state, defaultDelay: false };
    }
    case GOT_CONTENT: {
      const { items } = action;
      return { ...state, fetching: false, items };
    }
    case CHANGED_CATEGORY: {
      return {
        ...state,
        category: action.category,
        items: action.items,
        fetching: false,
      };
    }
    case FAILED_TO_FETCH_CONTENT: {
      return { ...state, fetching: false, failedToFetch: true };
    }
    default:
      return state;
  }
};
