import { connect } from 'react-redux';
import { loadPost as _loadPost, removePost as _removePost } from '../../actions/post';
import Post from './PostDumb';

const mapStateToProps = ({posts, authentication}) => ({
  currentPost: posts.currentPost,
  user: authentication.user,
})

const mapDispatchToProps = (dispatch) => ({
  loadPost(postId) {
    dispatch(_loadPost(postId));
  },
  removePost(postId) {
    dispatch(_removePost(postId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
