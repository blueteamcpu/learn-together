import { connect } from 'react-redux';
import { getThread as _getThread } from '../../../actions/comments';
import SingleComment from './SingleCommentDumb';

const mapStateToProps = (
  { comments: { threads }, authentication: { user } },
  { comment: { id } }
) => ({
  thread: threads[id],
  loggedIn: user.id,
});

const mapDispatchToProps = dispatch => ({
  getThread(commentId) {
    dispatch(_getThread(commentId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleComment);
