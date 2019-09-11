// ACTION TYPES
export const GET_EVENTS = 'GET_EVENTS';
export const CREATE_EVENT = 'CREATE_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';

// ACTIONS


// THUNKS
export const createEvent = (event) => async (dispatch, _, axios) => {
    try {
  
            dispatch({
                type: CREATE_EVENT,
                event
            });
        }
   catch (error) {
      console.error(error);
    }
  };
