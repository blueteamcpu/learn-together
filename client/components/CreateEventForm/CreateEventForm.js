import { connect } from 'react-redux';
import CreateEventForm from './LoginFormDumb';
import { createEvent as _createEvent } from '../../actions/authentication';

const mapDispatchToProps = (dispatch) => ({
    createEvent(event) {
        dispatch(_createEvent(event));
    }
});

export default connect(
  null,
  mapDispatchToProps
)(CreateEventForm);
