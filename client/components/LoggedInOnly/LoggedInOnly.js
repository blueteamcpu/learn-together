import { connect } from 'react-redux';
import LoggedInOnly from './LoggedInOnlyDumb.js';

const mapStateToProps = ({ authentication }) => ({
  loggedIn: authentication.user.id,
  loading: authentication.loadingUser,
});

export default connect(mapStateToProps)(LoggedInOnly);
