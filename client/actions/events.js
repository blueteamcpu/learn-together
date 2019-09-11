// ACTION TYPES
export const GET_EVENTS = 'GET_EVENTS';
export const CREATE_EVENT = 'CREATE_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';

// ACTIONS


// THUNKS
export const createEvent = (event) => async (dispatch, _, axios) => {
    try {
      const ev = await axios.post('/newevent', event);
  
      if (ev) {
            dispatch({
                type: CREATE_EVENT,
                ev
            });
        }
    } catch (error) {
      console.error(error);
    }
  };
