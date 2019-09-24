import axios from 'axios';

const SET_GROUPS = 'SET_GROUPS';
const SET_DETAIL_GROUP = 'SET_DETAIL_GROUP';
const SET_DETAIL_ISMEMBER = 'SET_DETAIL_ISMEMBER';
const FAILED_GROUPS_GET = 'FAILED_GROUPS_GET';
const GET_MY_GROUPS = 'GET_MY_GROUPS';

// Eventually we will want to start passing the section here. Just not now
export const getGroupList = (section = 0) => dispatch => {
  const groupList = axios
    .get('api/groups/all')
    .then(data => {
      dispatch({ type: SET_GROUPS, newGroups: data });
    })
    .catch(e => dispatch({ type: FAILED_GROUPS_GET, groupGetFailed: true }));
};

export const postNewGroup = group => dispatch => {
  dispatch({ type: SET_DETAIL_GROUP, group });
};

export const getDetailGroup = (id, context) => dispatch => {
  axios
    .get(`/api/groups/detail/${id}/${context}`)
    .then(response => {
      dispatch({ type: SET_DETAIL_GROUP, group: response.data });
    })
    .catch(e => dispatch({ type: FAILED_GROUPS_GET, groupGetFailed: true }));
};

export const joinGroup = () => (dispatch, getState) => {
  axios.post('/api/groups/addself', {groupId: getState().groups.groupDetailed.group.id})
    .then(() => dispatch({ type: SET_DETAIL_ISMEMBER, isMember: true }))
    .catch(e => console.log('Failed to add user to group?'));
};

export const leaveGroup = () => (dispatch, getState) => {
  axios.delete('/api/groups/removeself', {data: {groupId: getState().groups.groupDetailed.group.id}})
    .then(() => dispatch({ type: SET_DETAIL_ISMEMBER, isMember: false }))
    .catch(e => console.log("I suck at math"));
};

export const adminRemoveMember = (userId, groupId) => (dispatch, getState) => {
  axios.delete('/api/groups/removemember', { data: { userId: userId, groupId: groupId }})
    .then(() => {
      dispatch(getDetailGroup(groupId, 'members'));
    })
    .catch((e) => console.log('failed to remove member'));
};

const gotMyGroups = groups => ({
  type: GET_MY_GROUPS,
  groups,
});

export const getMyGroups = () => async (dispatch, _, axios) => {
  try {
    const { data: groups } = await axios.get('/api/groups/mygroups');
    dispatch(gotMyGroups(groups));
  } catch (error) {
    console.error(error);
  }
};

//export const joinGroup = () => async (dispatch, _, axios)

// Presumabely we will need some sort of tracking thing which manages the groups
// that a user is connected to for updates
// I'm not sure if this is groups plural, or if we only want to connect to one at a time
const initialState = {
  groupGetFailed: false,
  groupList: [],
  groupDetailed: {
    group: {},
    members: {},
    posts: [],
    isMember: false,
    isAdmin: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GROUPS: {
      return { ...state, groupList: [...state.groupList, action.newGroups] };
    }
    case SET_DETAIL_GROUP: {
      return { ...state, groupDetailed: { ...action.group } };
    }
    case SET_DETAIL_ISMEMBER: {
      return { ...state, groupDetailed: {...state.groupDetailed, isMember: action.isMember}};
    }
    case FAILED_GROUPS_GET: {
      return { ...state, groupGetFailed: action.groupGetFailed };
    }
    case GET_MY_GROUPS: {
      return { ...state, groupList: action.groups };
    }
    default:
      return { ...state };
  }
};
