//ACTION TYPES
export const UPDATEUSER = 'UPDATEUSER';

//ACTIONS

export const _updateUser = user => ({
    type: UPDATEUSER,
    user,
  });

// THUNKS

export const updateUser = (firstName, lastName, username, email, zipcode) => async ( dispatch, _, axios) => {
    try {
      const user = {firstName, lastName, username, email, zipcode}
      const updatedUser = await axios.post('/user/updateUser', user)
      dispatch(_updateUser(updatedUser));
    } catch (err){
      console.error(err);
    }
  };
