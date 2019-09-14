import { connect } from 'react-redux';
import UserProfileDumb from './UserProfileDumb';
import { updateUser as _updateUser } from '../../actions/user';

const mapStateToProps = state => ({ user: state.authentication.user });

const mapDispatchToProps = dispatch => ({
  updateUser(firstName, lastName, username, email, zipcode) {
    dispatch(_updateUser(firstName, lastName, username, email, zipcode));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileDumb);
