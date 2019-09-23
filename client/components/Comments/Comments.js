import { connect } from 'react-redux';
import {
  getInitialComments as _getInitialComments,
  getMoreComments as _getMoreComments,
} from '../../actions/comments';
import Comments from './CommentsDumb';

const mapStateToProps = ({
  comments,
  authentication: { user, socketAuth },
}) => ({ ...comments, loggedIn: user.id, socketAuth });

const mapDispatchToProps = dispatch => ({
  getInitialComments(type, id) {
    dispatch(_getInitialComments(type, id));
  },
  getMoreComments(type, id) {
    dispatch(_getMoreComments(type, id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
