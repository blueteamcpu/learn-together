import {
  GET_EVENTS,
  GET_EVENT_DETAIL,
  CREATE_EVENT,
  DELETE_EVENT,
  JOIN_EVENT,
  UNJOIN_EVENT,
  UPDATE_EVENT,
  GET_MY_EVENTS,
} from '../actions/events';

const initialState = {
  eventList: [],
  detailedEvent: {},
};

// eslint-disable-next-line complexity
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS: {
      return { ...state, eventList: action.eventList };
    }
    case GET_MY_EVENTS: {
      return { ...state, eventList: action.events };
    }
    case CREATE_EVENT: {
      const newState = {
        ...state,
        eventList: [...state.eventList, action.event],
      };
      return newState;
    }
    case GET_EVENT_DETAIL: {
      return { ...state, detailedEvent: action.event };
    }
    case JOIN_EVENT: {
      return {
        ...state,
        detailedEvent: {
          ...state.detailedEvent,
          users: [...state.detailedEvent.users, action.attendee],
        },
      };
    }
    case UNJOIN_EVENT: {
      console.log('redux: action.attendee', action.attendee)
      console.log('redux: event users', state.detailedEvent.users)
      return {
        ...state,
        detailedEvent: {
          ...state.detailedEvent,
          users: state.detailedEvent.users.filter(
            user => user.id !== action.attendee.userId
          ),
        },
      };
    }
    case UPDATE_EVENT: {
      return { ...state, detailedEvent: action.event };
    }
    case DELETE_EVENT: {
      return {
        ...state,
        eventList: state.eventList.filter(ev => ev.id !== action.event.id),
        detailedEvent: {},
      };
    }
    default:
      return state;
  }
};
