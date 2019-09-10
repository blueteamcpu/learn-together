import axios from 'axios';

const SET_GROUPS = 'SET_GROUPS';
const FAILED_GROUPS_GET = 'FAILED_GROUPS_GET';

export const getGroupList = (dispatch) => {
  const groupList = axios.get('/group/all')
        .then(data => {
	  dispatch({ type: SET_GROUPS, newGroups: data });
	})
        .catch(e => dispatch({ type: FAILED_GROUPS_GET, groupGetFailed: true }));
};

// Presumabely we will need some sort of tracking thing which manages the groups
// that a user is connected to for updates
// I'm not sure if this is groups plural, or if we only want to connect to one at a time
const initialState = {
  groupGetFailed: false,
  groupList: [],
  groupDetailed: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
  case SET_GROUPS: {
    return { ...state, groupList: [...state.groupList, action.newGroups] };
  }
  case FAILED_GROUPS_GET: {
    return { ...state, greoupGetFailed: action.groupGetFailed };
  }
  default:
    return { ...state };
  }
};
