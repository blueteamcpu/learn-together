import { connect } from 'react-redux';
import GuestOnly from './GuestOnlyDumb';

const mapStateToProps = ({ authenticated }) => ({
  loggedIn: authenticated.user.id,
});

export default connect(mapStateToProps)(GuestOnly);
