import { connect } from 'react-redux';
import CreateEventForm from './CreateEventFormDumb';
import { createEvent as _createEvent } from '../../../actions/events';


const mapStateToProps = state => ({
  group: state.groups.groupDetailed.group,
});

const mapDispatchToProps = (dispatch) => ({
    createEvent(event) {
        dispatch(_createEvent(event));
    }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEventForm);
