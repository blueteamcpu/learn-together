//ACTION TYPES
export const UPDATEUSER = 'UPDATEUSER';
export const UPDATEUSERPASS = 'UPDATEUSERPASS';

//ACTIONS

export const _updateUser = user => ({
    type: UPDATEUSER,
    user,
  });

// THUNKS

export const updateUser = (firstName, lastName, username, email, zipcode) => async ( dispatch, _, axios) => {
    try {
      const user = {firstName, lastName, username, email, zipcode}
      const updatedUser = await axios.put('/user/updateUser', user)
      console.log('updated user: ', updatedUser);
      dispatch(_updateUser(updatedUser));
    } catch (err){
      console.error(err);
    }
  };
