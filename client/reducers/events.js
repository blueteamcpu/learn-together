import {
    GET_EVENTS,
    CREATE_EVENT,
    DELETE_EVENT
  } from '../actions/events';

export default (state = [], action) => {
    switch (action.type) {
      case GET_EVENTS: {
        return state;
      }     
      case CREATE_EVENT: {
          return state;
      }
      case DELETE_EVENT: {
          return state;
      }
      default:
        return state;
    }
  };
  