import {
    GET_EVENTS,
    GET_EVENT_DETAIL,
    CREATE_EVENT,
    DELETE_EVENT,
    JOIN_EVENT,
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
      case GET_EVENT_DETAIL: {
        return {...state, detailedEvent: action.event};
      }
      case JOIN_EVENT: {
          return state;
      }
      default:
        return state;
    }
  };
  