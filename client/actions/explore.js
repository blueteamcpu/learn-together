// ACTION TYPES
export const FETCHING = 'FETCHING';
export const GOT_CONTENT = 'GOT_CONTENT';
export const FAILED_TO_FETCH_CONTENT = 'FAILED_TO_FETCH_CONTENT';

// ACTION CREATORS
const fetching = () => ({ type: FETCHING });
const failedToFetch = () => ({ type: FAILED_TO_FETCH_CONTENT });
const gotContent = items => ({ type: GOT_CONTENT, items });

// THUNKS
export const getGroups = (term, offset) => async (
  dispatch,
  getState,
  axios
) => {
  try {
    if (!getState().explore.fetching) {
      dispatch(fetching());
    }

    let url = '/api/groups/explore';

    const { data } = await axios.get(url);

    if (data) {
      dispatch(gotContent(data));
    } else {
      dispatch(failedToFetch());
    }
  } catch (error) {
    dispatch(failedToFetch());
    console.error(error);
  }
};
