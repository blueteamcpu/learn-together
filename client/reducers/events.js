import {
    GET_EVENTS,
    CREATE_EVENT,
    DELETE_EVENT
  } from '../actions/events';

export default (state = [], action) => {
    switch (action.type) {
      case GET_EVENTS: {
        return action.eventList;
      }     
      case CREATE_EVENT: {
          const newState = [...state, action.event]
          return newState;
      }
      case DELETE_EVENT: {
          return state;
      }
      default:
        return state;
    }
  };
  