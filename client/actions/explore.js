import qs from 'query-string';

// ACTION TYPES
export const FETCHING = 'FETCHING';
export const FAILED_TO_FETCH_CONTENT = 'FAILED_TO_FETCH_CONTENT';
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';
export const GOT_CONTENT = 'GOT_CONTENT';

// ACTION CREATORS
const fetching = () => ({ type: FETCHING });
const failedToFetch = () => ({ type: FAILED_TO_FETCH_CONTENT });
const gotContent = items => ({ type: GOT_CONTENT, items });
export const changeCategory = (category, items) => ({
  type: CHANGE_CATEGORY,
  category,
  items,
});

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
    const queries = {};
    let addedQueries = false;

    if (term) {
      queries.term = term;
      addedQueries = true;
    }

    if (offset) {
      queries.offset = offset;
      addedQueries = true;
    }

    if (addedQueries) {
      url += `?${qs.stringify(queries)}`;
    }

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
