import { connect } from 'react-redux';
import ExploreForm from './ExploreFormDumb';
import { changeTerm } from '../../../actions/explore';

const mapStateToProps = ({
  authentication: {
    user: { id, zipcode },
  },
  explore: { category, term, distance },
}) => ({
  category,
  term,
  distance,
  isLoggedIn: id && zipcode,
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
