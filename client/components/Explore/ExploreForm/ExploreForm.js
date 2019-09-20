import { connect } from 'react-redux';
import ExploreForm from './ExploreFormDumb';
import { changeTerm } from '../../../actions/explore';

const mapStateToProps = ({ explore: { category, term, distance } }) => ({
  category,
  term,
  distance,
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
