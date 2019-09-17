import { connect } from 'react-redux';
import Dashboard from './DashboardDumb';
import { getMyEvents as _getMyEvents } from '../../actions/events';
import { getMyGroups as _getMyGroups } from '../../reducers/groupReducer';

const mapStateToProps = ({ events: { eventList }, groups: { groupList } }) => ({
  events: eventList,
  groups: groupList,
});

const mapDispatchToProps = dispatch => ({
  getMyGroups() {
    dispatch(_getMyGroups());
  },
  getMyEvents() {
    dispatch(_getMyEvents());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
