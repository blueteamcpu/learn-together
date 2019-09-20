import { connect } from 'react-redux';
import ExploreForm from './ExploreFormDumb';
import { changeTerm } from '../../../actions/explore';

const mapStateToProps = ({
  authentication,
  explore: { category, term, distance },
}) => ({
  category,
  term,
  distance,
  isLoggedIn: authentication.user.id,
});

const mapDispatchToProps = dispatch => ({
  handleChange(e) {
    dispatch(changeTerm(e.target.value));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExploreForm);
