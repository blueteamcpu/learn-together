import { connect } from 'react-redux';
import {
  getGroups,
  changeCategory as _changeCategory,
} from '../../actions/explore';
import Explore from './ExploreDumb';

const mapStateToProps = ({
  explore: { items, fetching, failedToFetch, category },
}) => ({
  category,
  items,
  fetching,
  failedToFetch,
});

const mapDispatchToProps = dispatch => ({
  changeCategory(category) {
    dispatch(_changeCategory(category));
  },
  fetchGroups(term, offset) {
    dispatch(getGroups(term, offset));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Explore);
