import { connect } from 'react-redux';
import { getMe } from '../../actions/authentication';
import App from './AppDumb';

const mapDispatchToProps = dispatch => ({
  getUser() {
    dispatch(getMe());
  },
});

export default connect(
  null,
  mapDispatchToProps
)(App);
