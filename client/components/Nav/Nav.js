import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NavDumb from './NavDumb';
import { logout } from '../../actions/authentication';

const mapStateToProps = ({ authentication }) => ({
  loggedIn: authentication.user.id,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  logOut() {
    dispatch(logout()).then(() => history.push('/explore'));
  },
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavDumb)
);
