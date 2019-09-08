import { connect } from 'react-redux';
import GuestOnly from './GuestOnlyDumb';

const mapStateToProps = ({ authentication }) => ({
  loggedIn: authentication.user.id,
});

export default connect(mapStateToProps)(GuestOnly);
