/* eslint-disable complexity */
import qs from 'query-string';

// ACTION TYPES
export const FETCHING = 'FETCHING';
export const DELAY_OVER = 'DELAY_OVER';
export const FAILED_TO_FETCH_CONTENT = 'FAILED_TO_FETCH_CONTENT';
export const GOT_CONTENT = 'GOT_CONTENT';
export const CHANGED_CATEGORY = 'CHANGED_CATEGORY';
export const GET_MORE_CONTENT = 'GET_MORE_CONTENT';
export const NO_MORE_CONTENT = 'NO_MORE_CONTENT';
export const CHANGE_TERM = 'CHANGE_TERM';
export const CHANGE_DISTANCE = 'CHANGE_DISTANCE';

// ACTION CREATORS
const fetching = () => ({ type: FETCHING });

export const delayOver = () => ({ type: DELAY_OVER });

const failedToFetch = () => ({ type: FAILED_TO_FETCH_CONTENT });

const gotContent = items => ({ type: GOT_CONTENT, items });

const gotMoreContent = items => ({ type: GET_MORE_CONTENT, items });

const changeCategory = (category, items) => ({
  type: CHANGED_CATEGORY,
  category,
  items,
});

const changeDistance = (distance, items) => ({
  type: CHANGE_DISTANCE,
  distance,
  items,
});

export const changeTerm = term => ({ type: CHANGE_TERM, term });

const noMoreContent = () => ({ type: NO_MORE_CONTENT });

// HELPER
const generateUrl = (category, term, offset, distance) => {
  let url = '/api';

  if (category === 'Groups') {
    url += '/groups/explore';
  } else if (category === 'Events') {
    url += '/events/explore';
  }

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

  if (distance) {
    queries.distance = distance;
    addedQueries = true;
  }

  if (addedQueries) {
    url += `?${qs.stringify(queries)}`;
  }

  return url;
};

// THUNKS
export const getContent = (category, term, offset, distance) => async (
  dispatch,
  getState,
  axios
) => {
  try {
    const currentState = getState();
    if (!currentState.explore.fetching) {
      dispatch(fetching());
    }

    const url = generateUrl(category, term, offset, distance);

    const { data } = await axios.get(url);

    if (data) {
      if (offset) {
        if (data.length) {
          dispatch(gotMoreContent(data));
        } else {
          dispatch(noMoreContent());
        }
      } else if (distance && currentState.explore.distance !== distance) {
        dispatch(changeDistance(distance, data));
      } else if (currentState.explore.category === category) {
        dispatch(gotContent(data));
      } else {
        dispatch(changeCategory(category, data));
      }
    } else {
      dispatch(failedToFetch());
    }
  } catch (error) {
    dispatch(failedToFetch());
    console.error(error);
  }
};
