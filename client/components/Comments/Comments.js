import { connect } from 'react-redux';
import { getInitialComments as _getInitialComments } from '../../actions/comments';
import Comments from './CommentsDumb';

const mapStateToProps = ({ comments }) => comments;

const mapDispatchToProps = dispatch => ({
  getInitialComments(type, id) {
    dispatch(_getInitialComments(type, id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
