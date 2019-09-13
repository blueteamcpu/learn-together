import {
    GET_EVENTS,
    CREATE_EVENT,
    DELETE_EVENT
  } from '../actions/events';

const initialState = {
  allEvents: [],
  detailedEvent: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
      case GET_EVENTS: {
        return {...state, allEvents: action.eventList};
      }     
      case CREATE_EVENT: {
          const newState = {...state, allEvents: [...state.allEvents, action.event]}
          return newState;
      }
      case DELETE_EVENT: {
          return state;
      }
      default:
        return state;
    }
  };
  