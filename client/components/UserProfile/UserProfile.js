import { connect } from 'react-redux';
import UserProfileDumb from './UserProfileDumb';
import {updateUser as _updateUser} from '../../actions/user';

const mapStateToProps = (state) => {
  if (!state.authentication.user.id){
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileDumb);
