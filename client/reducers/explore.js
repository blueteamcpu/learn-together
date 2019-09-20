import {
  FETCHING,
  GOT_CONTENT,
  FAILED_TO_FETCH_CONTENT,
  CHANGED_CATEGORY,
  DELAY_OVER,
  GET_MORE_CONTENT,
  NO_MORE_CONTENT,
  CHANGE_TERM,
  CHANGE_DISTANCE,
} from '../actions/explore';

const initialState = {
  fetching: true,
  defaultDelay: true,
  failedToFetch: false,
  items: [],
  category: 'Groups',
  term: '',
  distance: '25',
  offset: 0,
  noMoreContent: false,
};

// eslint-disable-next-line complexity
export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TERM: {
      return { ...state, term: action.term };
    }
    case FETCHING: {
      return { ...state, fetching: true, defaultDelay: true };
    }
    case DELAY_OVER: {
      if (state.fetching === false) {
        return state;
      }
      return { ...state, defaultDelay: false };
    }
    case GOT_CONTENT: {
      const { items } = action;
      return { ...state, fetching: false, defaultDelay: true, items };
    }
    case GET_MORE_CONTENT: {
      const { items } = action;
      return {
        ...state,
        fetching: false,
        defaultDelay: true,
        items: [...state.items, ...items],
        offset: state.offset + 1,
      };
    }
    case CHANGED_CATEGORY: {
      return {
        ...state,
        category: action.category,
        items: action.items,
        fetching: false,
        offset: 0,
      };
    }
    case CHANGE_DISTANCE: {
      return {
        ...state,
        distance: action.distance,
        items: action.items,
        fetching: false,
        offset: 0,
      };
    }
    case NO_MORE_CONTENT: {
      return { ...state, noMoreContent: true, fetching: false };
    }
    case FAILED_TO_FETCH_CONTENT: {
      return { ...state, fetching: false, failedToFetch: true };
    }
    default:
      return state;
  }
};
