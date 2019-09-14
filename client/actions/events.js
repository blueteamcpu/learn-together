// ACTION TYPES
export const GET_EVENTS = 'GET_EVENTS';
export const GET_EVENT_DETAIL = 'GET_EVENT_DETAIL';
export const CREATE_EVENT = 'CREATE_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';
export const JOIN_EVENT = 'JOIN_EVENT';

// ACTIONS

// THUNKS

export const joinEvent = (event) => async (dispatch, _, axios) => {
    try {
            axios.post('/api/events/addattendee', event)
            dispatch({
                type: JOIN_EVENT,
                event
            });
        }
   catch (error) {
      console.error(error);
    }
  };

export const getEvents = () => async (dispatch, _, axios) => {
    try {
            const result = await axios.get('/api/events/events');
            const eventList = result.data;
            dispatch({
                type: GET_EVENTS,
                eventList
            });
            
        }
   catch (error) {
      console.error(error);
    }
  };

export const getEventDetail = (eventId) => async (dispatch, _, axios) => {
    try {   
            console.log('EVENTID: ', eventId)
            const result = await axios.get(`/api/events/events/${eventId}`);
            const event = result.data;
            dispatch({
                type: GET_EVENT_DETAIL,
                event
            });
            
        }
   catch (error) {
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
