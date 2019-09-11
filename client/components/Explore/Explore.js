import { connect } from 'react-redux';
import { getContent as _getContent } from '../../actions/explore';
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
  fetchContent(category, term, offset) {
    dispatch(_getContent(category, term, offset));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Explore);
