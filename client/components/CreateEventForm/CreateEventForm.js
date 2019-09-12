import { connect } from 'react-redux';
import CreateEventForm from './CreateEventFormDumb';
import { createEvent as _createEvent } from '../../actions/events';

const mapDispatchToProps = (dispatch) => ({
    createEvent(event) {
        dispatch(_createEvent(event));
    }
});

export default connect(
  null,
  mapDispatchToProps
)(CreateEventForm);
