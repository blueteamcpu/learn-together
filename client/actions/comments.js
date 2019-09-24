export const INITIAL_COMMENTS = 'INITIAL_COMMENTS';
export const MORE_COMMENTS = 'MORE_COMMENTS';
export const SINGLE_COMMENT = 'SINGLE_COMMENT';
export const THREAD = 'THREAD';
export const SINGLE_THREAD_COMMENT = 'SINGLE_THREAD_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const REMOVE_THREAD_COMMENT = 'REMOVE_THREAD_COMMENT';
export const NO_MORE_COMMENTS = 'NO_MORE_COMMENTS';

const gotInitComments = comments => ({ type: INITIAL_COMMENTS, comments });

const gotMoreComments = comments => ({ type: MORE_COMMENTS, comments });

export const gotSingleComment = comment => ({ type: SINGLE_COMMENT, comment });

export const gotThread = (threadId, thread) => ({
  type: THREAD,
  threadId,
  thread,
});

export const gotSingleThreadComment = comment => ({
  type: SINGLE_THREAD_COMMENT,
  comment,
});

export const removeComment = id => ({ type: REMOVE_COMMENT, id });

export const removeThreadComment = (threadId, id) => ({
  type: REMOVE_THREAD_COMMENT,
  threadId,
  id,
});

export const noMoreComments = () => ({ type: NO_MORE_COMMENTS });

export const getInitialComments = (type, id) => async (dispatch, _, axios) => {
  try {
    const { data: comments } = await axios.get(`/api/comments/${type}/${id}`);
    comments.reverse();
    dispatch(gotInitComments(comments));
  } catch (error) {
    console.error(error);
  }
};

export const getMoreComments = (type, id) => async (
  dispatch,
  getState,
  axios
) => {
  try {
    const currentOffset = getState().comments.offset;

    const { data: comments } = await axios.get(
      `/api/comments/${type}/${id}?offset=${currentOffset + 1}`
    );

    if (comments.length === 0) {
      dispatch(noMoreComments());
    } else {
      comments.reverse();
      dispatch(gotMoreComments(comments));
    }
  } catch (error) {
    console.error(error);
  }
};

export const getThread = commentId => async (dispatch, _, axios) => {
  try {
    const { data: thread } = await axios.get(
      `/api/comments/thread/${commentId}`
    );

    thread.reverse();

    dispatch(gotThread(commentId, thread));
  } catch (error) {
    console.error(error);
  }
};
