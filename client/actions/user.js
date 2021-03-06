//ACTIONS

import { gotUser } from './authentication';

// THUNKS

export const updateUser = (
  firstName,
  lastName,
  username,
  email,
  zipcode,
  imageURL,
) => async (dispatch, _, axios) => {
  try {
    const user = { firstName, lastName, username, email, zipcode, imageURL };
    const { data: updatedUser } = await axios.put('api/user/updateUser', user);
    dispatch(gotUser(updatedUser));
  } catch (err) {
    console.error(err);
  }
};
