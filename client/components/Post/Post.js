import { connect } from 'react-redux';
import { loadPost as _loadPost } from '../../actions/post';
import Post from './PostDumb';

const mapDispatchToProps = (dispatch) => ({
  loadPost(postId) {
    dispatch(_loadPost(postId));
  },
});

export default connect(
  null,
  mapDispatchToProps
)(Post);
