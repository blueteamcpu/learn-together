//ACTION TYPES
export const UPDATEUSER = 'UPDATEUSER';
export const UPDATEUSERPASS = 'UPDATEUSERPASS';

//ACTIONS

export const _updateUser = user => ({
    type: UPDATEUSER,
    user,
  });

export const _updateUserPass = user => ({
    type: UPDATEUSERPASS,
    user
})

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

  export const updateUserPass = (firstName, lastName, username, email, zipcode, password, NPass) => async ( dispatch, _, axios) => {
    try {
      const user = {firstName, lastName, username, email, zipcode, password, NPass}
      const updatedUser = await axios.post('/user/updateUserPass', user)
      dispatch(_updateUser(updatedUser));
    } catch (err){
      console.error(err);
    }
  };
