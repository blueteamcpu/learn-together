import { connect } from 'react-redux';
import {
  getContent as _getContent,
  delayOver as _delayOver,
} from '../../actions/explore';
import Explore from './ExploreDumb';

const mapStateToProps = ({ explore }) => explore;

const mapDispatchToProps = dispatch => ({
  fetchContent(category, term, offset, distance) {
    dispatch(_getContent(category, term, offset, distance));
  },
  delayOver() {
    dispatch(_delayOver());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Explore);
