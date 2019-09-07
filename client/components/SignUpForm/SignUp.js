import { connect } from 'react-redux';
import { gotUser as _gotUser } from '../../actions/authentication';
import SignUpDumb from './SignUpDumb';

const mapDispatchToProps = (dispatch, { history }) => ({
  gotUser(user) {
    dispatch(_gotUser(user));
    history.push('/dashboard');
  },
});

export default connect(
  null,
  mapDispatchToProps
)(SignUpDumb);
