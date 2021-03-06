// ACTION TYPES
export const GET_EVENTS = 'GET_EVENTS';
export const GET_EVENT_DETAIL = 'GET_EVENT_DETAIL';
export const CREATE_EVENT = 'CREATE_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';
export const JOIN_EVENT = 'JOIN_EVENT';
export const UNJOIN_EVENT = 'UNJOIN_EVENT';
export const UPDATE_EVENT = 'UPDATE_EVENT';
export const GET_MY_EVENTS = 'GET_MY_EVENTS';
export const CLEAR_STATE = 'CLEAR_STATE';

// ACTIONS
const gotMyEvents = events => ({ type: GET_MY_EVENTS, events });

export const clearState = () => ({ type: CLEAR_STATE });

// THUNKS

export const joinEvent = event => async (dispatch, _, axios) => {
  try {
    const result = await axios.post('/api/events/addattendee', event);
    const attendee = result.data;
    dispatch({
      type: JOIN_EVENT,
      attendee,
    });
  } catch (error) {
    console.error(error);
  }
};
export const unjoinEvent = event => async (dispatch, _, axios) => {
  try {
    const result = await axios.delete('/api/events/deleteattendee', {
      data: event,
    });
    const attendee = result.data;
    dispatch({
      type: UNJOIN_EVENT,
      attendee,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getEvents = () => async (dispatch, _, axios) => {
  try {
    const result = await axios.get('/api/events');
    const eventList = result.data;
    dispatch({
      type: GET_EVENTS,
      eventList,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getEventDetail = eventId => async (dispatch, _, axios) => {
  try {
    const result = await axios.get(`/api/events/${eventId}`);
    const event = result.data;
    dispatch({
      type: GET_EVENT_DETAIL,
      event,
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteEvent = eventId => async (dispatch, _, axios) => {
  try {
    const result = await axios.delete(`/api/events/${eventId}`);
    const event = result.data;
    dispatch({
      type: DELETE_EVENT,
      event,
    });
  } catch (error) {
    console.error(error);
  }
};

export const createEvent = event => async (dispatch, _, axios) => {
  try {
    dispatch({
      type: CREATE_EVENT,
      event,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getMyEvents = () => async (dispatch, _, axios) => {
  try {
    const { data: events } = await axios.get('/api/events/myevents');
    dispatch(gotMyEvents(events));
  } catch (error) {
    console.error(error);
  }
};
