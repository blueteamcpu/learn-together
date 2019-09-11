import { connect } from 'react-redux';
import UserProfileDumb from './UserProfileDumb';
import {updateUser as _updateUser, updateUserPass as _updateUserPass} from '../../actions/user';
import { getMe as _getMe } from '../../actions/authentication';

const mapStateToProps = (state) => {
  if (!state.authentication.user){
    return null;
  } else {
    const {user} = state.authentication;
    return {userInfo: user}
}
}

const mapDispatchToProps = (dispatch, {history}) => ({
  updateUser(firstName, lastName, username, email, zipcode) {
    dispatch(_updateUser(firstName, lastName, username, email, zipcode));
  },
  updateUserPass(firstName, lastName, username, email, zipcode, password, NPass) {
    dispatch(_updateUserPass(firstName, lastName, username, email, zipcode, password, NPass))
  },
  getUser() {
    dispatch(_getMe());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileDumb);
