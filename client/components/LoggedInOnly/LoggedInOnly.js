import { connect } from 'react-redux';
import LoggedInOnly from './LoggedInOnlyDumb.js';

const mapStateToProps = ({ authentication }) => ({
  loggedIn: authentication.user.id,
});

export default connect(mapStateToProps)(LoggedInOnly);
