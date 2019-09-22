// ACTION TYPES
export const GOT_USER = 'GOT_USER';
export const REMOVED_USER = 'REMOVED_USER';
export const FAILEDTOLOADUSER = 'FAILEDTOLOADUSER';
export const FAILEDTOLOGOUT = 'FAILEDTOLOGOUT';
export const SOCKET_AUTH = 'SOCKET_AUTH';

// ACTIONS
const failedToLoadUser = () => ({ type: FAILEDTOLOADUSER });

const failedToLogOut = () => ({ type: FAILEDTOLOGOUT });

export const gotUser = user => {
  return {
    type: GOT_USER,
    user,
  };
};

const loggedOut = () => ({ type: REMOVED_USER });

export const socketAuth = () => ({ type: SOCKET_AUTH });

// THUNKS
export const getMe = () => async (dispatch, _, axios) => {
  try {
    const { data: user } = await axios.get('/auth/me');

    if (user) {
      dispatch(gotUser(user));
    } else {
      dispatch(failedToLoadUser());
    }
  } catch (error) {
    dispatch(failedToLoadUser());
    console.error(error);
  }
};

export const logout = () => async (dispatch, _, axios) => {
  try {
    await axios.delete('/auth/logout');
    dispatch(loggedOut());
  } catch (error) {
    dispatch(failedToLogOut());
    console.error(error);
  }
};
