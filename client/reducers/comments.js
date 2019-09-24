import {
  INITIAL_COMMENTS,
  MORE_COMMENTS,
  SINGLE_COMMENT,
  THREAD,
  SINGLE_THREAD_COMMENT,
  REMOVE_COMMENT,
  REMOVE_THREAD_COMMENT,
  NO_MORE_COMMENTS,
} from '../actions/comments';

const initialState = {
  comments: [],
  offset: 0,
  noMoreToLoad: false,
  threads: {},
};

// eslint-disable-next-line complexity
export default (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_COMMENTS: {
      return { ...state, comments: action.comments };
    }
    case MORE_COMMENTS: {
      return {
        ...state,
        offset: state.offset + 1,
        comments: [...action.comments, ...state.comments],
      };
    }
    case SINGLE_COMMENT: {
      return { ...state, comments: [...state.comments, action.comment] };
    }
    case THREAD: {
      const threads = { ...state.threads, [action.threadId]: action.thread };

      return { ...state, threads };
    }
    case SINGLE_THREAD_COMMENT: {
      const newState = { ...state };

      if (state.threads.hasOwnProperty(action.comment.threadId)) {
        newState.threads = {
          ...state.threads,
          [action.comment.threadId]: [
            ...state.threads[action.comment.threadId],
            action.comment,
          ],
        };
      }

      newState.comments = state.comments.map(c => {
        if (c.id !== action.comment.threadId) {
          return c;
        } else {
          return { ...c, threadCount: c.threadCount + 1 };
        }
      });

      return newState;
    }
    case REMOVE_COMMENT: {
      const comments = state.comments.filter(c => c.id !== action.id);

      return { ...state, comments };
    }
    case REMOVE_THREAD_COMMENT: {
      const comments = state.comments.map(c => {
        if (c.id !== action.threadId) {
          return c;
        } else {
          return {
            ...c,
            comments: c.comments.filter(_c => _c.id !== action.id),
          };
        }
      });

      return { ...state, comments };
    }
    case NO_MORE_COMMENTS: {
      return { ...state, noMoreToLoad: true };
    }
    default:
      return state;
  }
};
