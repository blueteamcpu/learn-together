//ACTIONS

import { gotUser } from "./authentication";

// THUNKS

export const updateUser = (firstName, lastName, username, email, zipcode) => async ( dispatch, _, axios) => {
    try {
      const user = {firstName, lastName, username, email, zipcode}
      const updatedUser = await axios.put('/user/updateUser', user)
      dispatch(gotUser(updatedUser));
    } catch (err){
      console.error(err);
    }
  };
