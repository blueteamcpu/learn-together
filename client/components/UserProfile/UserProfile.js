import { connect } from 'react-redux';
import UserProfileDumb from './UserProfileDumb';
import {updateUser as _updateUser} from '../../actions/user';
import { getMe as _getMe } from '../../actions/authentication';

const mapStateToProps = (state) => {
  if (!state.authentication.user){
    return null;
  } else {
    const {user} = state.authentication;
    return {userInfo: user}
}
}

const mapDispatchToProps = (dispatch) => ({
  updateUser(firstName, lastName, username, email, zipcode) {
    dispatch(_updateUser(firstName, lastName, username, email, zipcode));
  },
  getUser() {
    dispatch(_getMe());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileDumb);
